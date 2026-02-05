import { defineType, defineField } from 'sanity'

// Example schema - replace with your actual schemas
export const schemaTypes = [
  defineType({
    name: 'post',
    title: 'Post',
    type: 'document',
    fields: [
      defineField({
        name: 'title',
        title: 'Title',
        type: 'string',
      }),
      defineField({
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
          source: 'title',
          maxLength: 96,
        },
      }),
      defineField({
        name: 'body',
        title: 'Body',
        type: 'blockContent',
      }),
    ],
  }),
]
