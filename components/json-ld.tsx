import React from 'react';

/**
 * Renders a <script type="application/ld+json"> tag with the given data.
 * Accepts a single object or an array of schema objects (array output becomes multiple tags).
 */
export function JsonLd({ data }: { data: object | object[] }) {
  const items = Array.isArray(data) ? data : [data];
  return (
    <>
      {items.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}
