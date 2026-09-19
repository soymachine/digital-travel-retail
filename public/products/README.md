# Product imagery

These SVG files are **temporary placeholders** generated for the demo. They are
local assets by design: the demo never depends on remote image URLs.

To use approved artwork, replace each file and point `productImage` in
`/data/products.ts` at the new asset (transparent PNG/WebP, product centred,
consistent crop and scale across the three bottles):

    /public/products/million-gold.svg        → Million Gold packshot
    /public/products/million-gold-parfum.svg → Million Gold Parfum packshot
    /public/products/million-red.svg         → Million Red packshot

No component references image files directly; only the data layer does.
