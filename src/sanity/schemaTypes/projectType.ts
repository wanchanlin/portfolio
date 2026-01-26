import {TagIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const projectType = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  icon: TagIcon,
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
      name: 'completionDate',
      type: 'Completion Date',
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
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          validation: Rule => Rule.required()
        })
      ]
    }),
   defineField({
  name: 'gallery',
  type: 'array',
  title: 'Gallery Images',
  of: [
    {
      type: 'image',
      options: {
        hotspot: true, // Enables the focal point selector
      },
    },
  ],
}),
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
    defineField({
      name: 'technologies',
      type: 'array',
      title: 'Technologies Used',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'content',
      type: 'blockContent',
      title: 'Project Details',
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