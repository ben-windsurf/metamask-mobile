type NFTImage = string | string[] | undefined | null;

/**
 * Extracts a single image URL from various NFT image formats
 * Handles string URLs, arrays of URLs, and null/undefined values
 * @param {NFTImage} image - The NFT image data (string, array, or null/undefined)
 * @returns {string | undefined} The first available image URL, or undefined if none found
 */
export const getNftImage = (image: NFTImage): string | undefined => {
  if (typeof image === 'string') {
    return image;
  }

  if (Array.isArray(image)) {
    return image[0];
  }

  return undefined;
};
