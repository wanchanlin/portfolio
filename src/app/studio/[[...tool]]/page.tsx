import { Studio } from './studio'
export const dynamic = 'force-static'
export const metadata = {
  title: 'Sanity Studio',
  robots: { index: false, follow: false },
}
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}
export default function StudioPage() {
  return <Studio />
}
// import { Studio } from './studio' 

// export const dynamic = 'force-static'

// export const metadata = {
//   title: 'Sanity Studio',
// }

// export default function StudioPage() {
//   return <Studio />
// }