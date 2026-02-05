/**
 * One empty block so Slate never has empty children.
 * Shared by blockContentType (initialValue) and BlockContentNormalizingInput (patch).
 */
export const BLOCK_CONTENT_INITIAL: {
  _type: 'block'
  _key: string
  children: { _type: 'span'; _key: string; marks: string[]; text: string }[]
  markDefs: unknown[]
  style: string
}[] = [
  {
    _type: 'block',
    _key: 'initial-block',
    children: [{ _type: 'span', _key: 'initial-span', marks: [], text: '' }],
    markDefs: [],
    style: 'normal',
  },
]
