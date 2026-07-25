import imageData from "./salon-images.json";

export type SalonImageKey = keyof typeof imageData;

/**
 * Returns the array of photo URLs for the given category.
 * All URLs are clean, watermark-free images from Unsplash.
 */
export function getImages(key: SalonImageKey): string[] {
  const arr = imageData[key];
  return Array.isArray(arr) ? (arr as string[]) : [];
}

/** Returns the first image for a category (safe default). */
export function getImage(key: SalonImageKey, index = 0): string {
  const arr = getImages(key);
  return arr[index] ?? "";
}

export const allSalonImages = imageData as Record<SalonImageKey, string[]>;
