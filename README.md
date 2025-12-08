# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Managing Website Images

The Next.js `<Image>` component is already set up to work with images stored in the public directory. You don't need to change any configuration files.

Here is the simple, two-step process to use your own local images:

### Step 1: Place Your Images in the `public` Folder

First, you need to add your image files to the `public` folder in your project. A clean way to organize this is to create an `images` folder inside `public`.

For example, you could structure it like this:

```
public/
└── images/
    ├── hero/
    │   └── hero-banner.jpg
    └── gallery/
        ├── flex-banner-on-shop.jpg
        ├── window-graphic-cafe.png
        └── sav-wall-branding.jpg
```

### Step 2: Update the Image URLs in `src/lib/placeholder-images.json`

Once your images are in the `public` folder, you just need to update the `imageUrl` paths in your central image database: `src/lib/placeholder-images.json`.

Change the URLs to point to the local paths. The paths should start with a `/`, which Next.js understands as the `public` folder.

Here’s an example of how you would modify `src/lib/placeholder-images.json`:

```json
{
  "placeholderImages": [
    {
      "id": "hero-main",
      "description": "A collection of high-quality large format prints...",
      // --- BEFORE (external URL) ---
      // "imageUrl": "https://images.unsplash.com/photo-1630327722923-5ebd594ddda9?...",
      // --- AFTER (local URL) ---
      "imageUrl": "/images/hero/hero-banner.jpg",
      "imageHint": "printing samples"
    },
    {
      "id": "gallery-1",
      "description": "Large vinyl banner on a building",
      // --- BEFORE (external URL) ---
      // "imageUrl": "https://images.unsplash.com/photo-1562809683-67b524a5ce11?...",
      // --- AFTER (local URL) ---
      "imageUrl": "/images/gallery/flex-banner-on-shop.jpg",
      "imageHint": "vinyl banner"
    }
  ]
}
```

That’s it! The website will automatically use your local images. There are no code changes needed in the components themselves.
