import { SchemaTypeDefinition } from 'sanity'
import { blockContentType } from './blockContentType'
import { projectType } from './projectType'
import author from './authorType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, projectType, author],
}