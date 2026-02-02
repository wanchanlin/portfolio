import { client } from './client'

export async function sanityFetch<T>({
  query,
  params = {},
}: {
  query: string
  params?: Record<string, unknown>
}): Promise<T> {
  return client.fetch<T>(query, params, {
    // This mimics the 'old' way of handling Next.js caching
    next: { revalidate: 60 }, 
  })
}

