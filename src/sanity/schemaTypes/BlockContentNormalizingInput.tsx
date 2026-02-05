'use client'

import React, { useLayoutEffect, useRef } from 'react'
import { 
  PatchEvent, 
  set, 
  type ArrayOfPrimitivesInputProps,
  type ArraySchemaType,
  type InputProps
} from 'sanity'
import { BLOCK_CONTENT_INITIAL } from './blockContentInitial'

/**
 * Wraps the default block content input and ensures the value is never [].
 * When value is empty, we patch the field to BLOCK_CONTENT_INITIAL before
 * mounting the PT editor, avoiding "Cannot resolve a DOM node from Slate node".
 * Patches in useLayoutEffect so we never call renderDefault with [].
 */
export function BlockContentNormalizingInput(
  props: ArrayOfPrimitivesInputProps<string | number | boolean, ArraySchemaType<unknown>>
) {
  const { value, path, onChange, renderDefault } = props
  const isEmpty =
    value == null || (Array.isArray(value) && value.length === 0)
  const hasPatched = useRef(false)

  useLayoutEffect(() => {
    if (isEmpty && !hasPatched.current) {
      hasPatched.current = true
      onChange(PatchEvent.from(set(BLOCK_CONTENT_INITIAL, path)))
    }
  }, [isEmpty, onChange, path])

  if (isEmpty) {
    return (
      <div style={{ padding: 12, color: 'var(--card-muted-fg-color)' }}>
        Loading…
      </div>
    )
  }

  return <>{renderDefault(props as any)}</>
}
