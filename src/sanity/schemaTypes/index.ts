import {defineArrayMember, defineField, defineType} from 'sanity'

/**
 * Project schema for managing portfolio projects
 */
const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'number',
      title: 'Project Number',
      type: 'string',
      description: 'Project number/order (e.g., "01", "02")',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL-friendly identifier (auto-generated from title)',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'string',
      description: 'Project date (e.g., "December 2025")',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{type: 'block'}],
      description: 'Short description of the project',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'technologies',
      title: 'Technologies',
      type: 'array',
      of: [{type: 'string'}],
      description: 'List of technologies used',
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
            },
          ],
        }),
      ],
      description: 'Project images',
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{type: 'string'}],
      description: 'List of project features',
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'demo',
      title: 'Demo URL',
      type: 'url',
      description: 'Link to live demo',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'github',
      title: 'GitHub URL',
      type: 'url',
      description: 'Link to GitHub repository',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      description: 'Optional video URL (YouTube, Vimeo, etc.)',
    }),
    defineField({
      name: 'members',
      title: 'Team Members',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            {
              name: 'name',
              type: 'string',
              title: 'Name',
              validation: (rule) => rule.required(),
            },
            {
              name: 'url',
              type: 'url',
              title: 'URL',
              description: 'Link to member profile',
            },
          ],
        }),
      ],
      description: 'Optional team members',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      number: 'number',
      media: 'images.0',
    },
    prepare({title, number, media}) {
      return {
        title: `${number || ''} ${title || 'Untitled'}`.trim(),
        media,
      }
    },
  },
})

export const schemaTypes = [project]

export const schema = {types: schemaTypes}
