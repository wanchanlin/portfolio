# Portfolio Website

A modern portfolio website built with Next.js, TypeScript, and Tailwind CSS.

## Features

- Responsive design
- Modern UI with smooth animations
- Project showcase
- Contact form
- About page
- Legal pages (Privacy, Terms, Security)

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- React
- Sanity

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── about/
│   ├── contact/
│   ├── privacy/
│   ├── projects/
│   ├── security/
│   ├── terms/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ContactForm.tsx
│   ├── Footer.tsx
│   ├── Navigation.tsx
│   └── ProjectCard.tsx
└── public/
    └── images/
```

## Customization

1. Update the content in the respective page components
2. Modify the styles in `globals.css`
3. Add your own images to the `public/images` directory
4. Update the project data in `src/app/page.tsx`

## Deployment

The site can be deployed to Vercel:

```bash
npm run build
vercel
```

## Contact

For any questions or suggestions, please contact [ohanalin@gmail.com](mailto:ohanalin@gmail.com)