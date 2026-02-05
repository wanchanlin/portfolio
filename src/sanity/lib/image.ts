import createImageUrlBuilder from '@sanity/image-url'
// Change this line:
import type { SanityImageSource } from "@sanity/asset-utils";
import { dataset, projectId } from '../env'

const builder = createImageUrlBuilder({ projectId, dataset })

export const urlFor = (source: SanityImageSource) => {
  return builder.image(source)
}