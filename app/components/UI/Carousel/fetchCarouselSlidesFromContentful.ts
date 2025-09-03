import { createClient, type EntrySkeletonType } from 'contentful';
import { isProduction } from '../../../util/environment';
import { CarouselSlide } from './types';
import { ACCESS_TOKEN, SPACE_ID } from './constants';

export interface ContentfulCarouselSlideFields {
  headline: string;
  teaser: string;
  image: string;
  linkUrl: string;
  undismissable: boolean;
  startDate?: string;
  endDate?: string;
  priorityPlacement?: boolean;
}

export type ContentfulSlideSkeleton =
  EntrySkeletonType<ContentfulCarouselSlideFields>;

const ENVIRONMENT = isProduction() ? 'master' : 'dev';
const CONTENT_TYPE = 'promotionalBanner';
const DEFAULT_DOMAIN = isProduction()
  ? 'cdn.contentful.com'
  : 'preview.contentful.com';

interface ContentfulSysField {
  sys: { id: string };
}

/**
 * Fetches carousel slides from Contentful CMS
 * Retrieves promotional banners marked for mobile display and separates them into priority and regular slides
 * Falls back to direct fetch if Contentful SDK fails
 * @returns {Promise<Object>} Promise resolving to object with prioritySlides and regularSlides arrays
 */
export async function fetchCarouselSlidesFromContentful(): Promise<{
  prioritySlides: CarouselSlide[];
  regularSlides: CarouselSlide[];
}> {
  const spaceId = SPACE_ID();
  const accessToken = ACCESS_TOKEN();

  if (!spaceId || !accessToken) {
    console.warn(
      'Missing Contentful env variables: FEATURES_ANNOUNCEMENTS_SPACE_ID, FEATURES_ANNOUNCEMENTS_ACCESS_TOKEN.',
    );
    return { prioritySlides: [], regularSlides: [] };
  }

  const host = `https://${DEFAULT_DOMAIN}/spaces/${spaceId}/environments/${ENVIRONMENT}/entries`;

  // First try through the Contentful Client
  try {
    const contentfulClient = createClient({
      space: spaceId,
      accessToken,
      environment: ENVIRONMENT,
      host,
    });

    const entries = await contentfulClient.getEntries({
      content_type: CONTENT_TYPE,
      'fields.showInMobile': true, // Only banners marked for mobile
    });
    const { prioritySlides, regularSlides } = mapContentfulEntriesToSlides(
      entries.items,
      entries.includes?.Asset ?? [],
    );
    return { prioritySlides, regularSlides };
  } catch (err) {
    // If the Contentful SDK fails, fall back to a direct fetch
    console.warn('Contentful SDK failed, falling back to direct fetch', err);
  }

  // Otherwise fallback to URL fetch
  try {
    const url = new URL(`${host}`);
    url.searchParams.set('access_token', accessToken);
    url.searchParams.set('content_type', CONTENT_TYPE);
    url.searchParams.set('fields.showInMobile', 'true');

    const response = await fetch(url.toString());
    const json = await response.json();
    const { prioritySlides, regularSlides } = mapContentfulEntriesToSlides(
      json.items,
      json.includes?.Asset ?? [],
    );
    return { prioritySlides, regularSlides };
  } catch (fallbackError) {
    console.warn(
      '[fetchCarouselSlidesFromContentful] Fallback fetch failed, gracefully failing.',
      fallbackError,
    );
    return { prioritySlides: [], regularSlides: [] };
  }
}

/**
 * Maps Contentful entries to carousel slide objects
 * Processes raw Contentful data and separates slides into priority and regular categories
 * @param {any[]} items - Array of Contentful entry items
 * @param {any[]} assets - Array of Contentful asset items for image resolution
 * @returns {Object} Object containing prioritySlides and regularSlides arrays
 */
function mapContentfulEntriesToSlides(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  items: any[],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  assets: any[],
): { prioritySlides: CarouselSlide[]; regularSlides: CarouselSlide[] } {
  if (!items || !Array.isArray(items)) {
    console.warn('[mapContentfulEntriesToSlides] Invalid items format:', items);
    return { prioritySlides: [], regularSlides: [] };
  }

  const resolveImage = (imageRef: ContentfulSysField) => {
    const asset = assets.find((a) => a.sys.id === imageRef?.sys?.id);
    const rawUrl = asset?.fields?.file?.url || '';
    return rawUrl.startsWith('//') ? `https:${rawUrl}` : rawUrl;
  };

  const prioritySlides: CarouselSlide[] = [];
  const regularSlides: CarouselSlide[] = [];

  for (const entry of items) {
    const {
      headline,
      teaser,
      image,
      linkUrl,
      undismissable,
      startDate,
      endDate,
      priorityPlacement,
    } = entry.fields;

    const slide: CarouselSlide = {
      id: `contentful-${entry.sys.id}`,
      title: headline,
      description: teaser,
      navigation: {
        type: 'url',
        href: linkUrl,
      },
      image: resolveImage(image as unknown as ContentfulSysField),
      undismissable: undismissable ?? false,
      testID: `carousel_slide_${entry.sys.id}`,
      testIDTitle: `carousel_slide_title_${entry.sys.id}`,
      testIDCloseButton: `carousel_slide_close_${entry.sys.id}`,
      startDate,
      endDate,
    };

    if (priorityPlacement) {
      prioritySlides.push(slide);
    } else {
      regularSlides.push(slide);
    }
  }

  return { prioritySlides, regularSlides };
}

/**
 * Determines if a carousel slide is currently active based on its date range
 * @param {Object} slide - The slide object to check
 * @param {string} slide.startDate - Optional start date for the slide
 * @param {string} slide.endDate - Optional end date for the slide
 * @param {Date} now - Current date to compare against (defaults to new Date())
 * @returns {boolean} True if the slide is currently active, false otherwise
 */
export function isActive(
  slide: { startDate?: string; endDate?: string },
  now = new Date(),
): boolean {
  const start = slide.startDate ? new Date(slide.startDate) : null;
  const end = slide.endDate ? new Date(slide.endDate) : null;
  if (start && now < start) return false;
  if (end && now > end) return false;
  return true;
}
