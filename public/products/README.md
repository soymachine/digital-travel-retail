# Product imagery

Brand packshots, stored locally: the demo never depends on remote image URLs.

    /public/products/million-gold.png        → Million Gold
    /public/products/million-gold-parfum.png → Million Gold Parfum
    /public/products/million-red.png         → Million Red

To replace one, drop the new file in and point `productImage` in
`/data/products.ts` at it. No component references an image file directly, only
the data layer does.

The files do not need to share proportions: every packshot renders inside a
fixed box with `object-contain`, so images of different sizes sit at the same
visual scale and none of them distort. Transparent PNG or WebP works best
against the ivory panels.
