/**
 * Represents the possible types for NFT image data
 */
type NFTImage = string | string[] | undefined | null;

/**
 * Extracts a single image URL from NFT image data
 *
 * @param image - The NFT image data which can be a string, array of strings, undefined, or null
 * @returns The first available image URL as a string, or undefined if no valid image is found
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
