// app/head.tsx
export default function Head() {
  return (
    <>
      <title>Idea2Site – Build and Launch Your Website Fast</title>
      <meta name="description" content="Idea2Site helps you turn ideas into websites quickly, with stunning design and fast deployment." />
      <meta name="keywords" content="Idea2Site, website builder, launch website, web design, startup tools" />
      <meta name="author" content="Idea2Site Team" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="robots" content="index, follow" />

      {/* Structured Data - JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Idea2Site",
            "url": "https://idea2site.in",
            "sameAs": [
              "https://instagram.com/idea2site",
              "https://twitter.com/idea2site"
            ]
          }),
        }}
      />
    </>
  );
}
