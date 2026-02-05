import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_READ_TOKEN,
})

// A simple helper for your server components
export async function sanityFetch<const QueryString extends string>({
  query,
  params = {},
  revalidate = 3600, // default cache 1 hour
}: {
  query: QueryString
  params?: Record<string, unknown>
  revalidate?: number | false
}) {
  return client.fetch(query, params, {
    next: {
      revalidate,
    },
  })
}