import {defineField, defineType, defineArrayMember} from 'sanity'
import {BlockContentNormalizingInput} from './BlockContentNormalizingInput'

export const projectType = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'displaydate',
      type: 'date',
      title: 'Display Date',
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Short Description',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'mainImage',
      type: 'image',
      title: 'Project Image',
      options: {
        hotspot: true,
        fields: [
          defineField({
            name: 'alt',
            type: 'string',
            title: 'Alternative text',
            validation: Rule => Rule.required()
          })
        ]
      },
    }),
    {
      name: 'gallery',
      type: 'array',
      title: 'Gallery Images',
      of: [
        defineArrayMember({
          type: 'image',
          options: {
            hotspot: true,
          },
        }),
      ],
    },
    defineField({
      name: 'githubUrl',
      type: 'url',
      title: 'GitHub Repository URL',
    }),
    defineField({
      name: 'liveDemoUrl',
      type: 'url',
      title: 'Live Demo URL',
    }),
    {
      name: 'technologies',
      type: 'array',
      title: 'Technologies Used',
      of: [
        defineArrayMember({
          type: 'string',
        })
      ],
    },
    defineField({
      name: 'content',
      type: 'blockContent',
      title: 'Project Details',
      components: {
        input: BlockContentNormalizingInput,
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
      description: 'description'
    },
    prepare(selection) {
      const {title, media, description} = selection
      return {
        title,
        media,
        subtitle: description
      }
    },
  },
})