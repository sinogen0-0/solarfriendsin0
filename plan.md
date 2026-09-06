# Website iteration plan

## Goal

Turn the site into a dark, premium, storefront-first art presence for a small studio practice. The experience should let people understand the work quickly, browse the portfolio, and buy ready-to-ship pieces with a direct and trustworthy checkout flow.

## Final design decisions

### Audience and conversion

- The site is primarily for people I already know and connect with.
- Visitors are there to view the work and purchase ready-to-ship pieces.
- The home page should be storefront-first, but the work itself must still feel central.
- The conversion path is browse first, then buy.

### Brand and tone

- The visual system stays dark, minimal, and premium.
- The mood is wizardly but restrained: magical, hand-crafted, alchemical, and ceremonial rather than loud or occult.
- The current styling direction should remain intact, with a low-noise, handmade-elegance aesthetic.

### Commerce model

- Direct checkout is the default for all ready-to-ship work.
- The site should capture a Stripe/Shopify-ready order structure now so it can be plugged into a real checkout later.
- Local pickup + shipping is supported; shipping is the default option.
- Custom or unusual pieces can remain outside the direct checkout flow unless a separate path is deliberately added.

### Product structure

Every product should carry a future-ready but manageable schema. The minimum recommended structure is:

- id
- title
- price
- short description
- availability
- primary image
- gallery images
- category
- dimensions
- materials
- note

Keep extra fields blank when they are not needed for a given piece. The objective is to keep the data model ready for real commerce without overbuilding the catalog.

### Product browsing and detail experience

- Product cards should feel collectible and editorial rather than generic.
- Each card should show title, price, short description, rarity/availability status, and a direct buy button.
- Multi-image pieces should use a hybrid browsing flow: card preview on the storefront and a dedicated detail view when more context is helpful.
- Product detail pages are especially useful for pieces with multiple views, material notes, or larger presentation requirements.

### Checkout process

- Use a single-page checkout with a clear review block and confirmation state.
- The checkout should collect the minimum order details needed for a real commerce workflow: item, quantity, shipping/contact details, notes, and total.
- The confirmation state should say the order was received and that a follow-up will finalize shipping and payment details.
- The site should be built as a real checkout system now, not only as a mock flow.

### Contact layer

- Email, Instagram, and LinkedIn are the contact surfaces.
- The site should remain mostly about the work, with a quiet bio and contact link rather than heavy personal framing.

## Experience principles

1. Keep the work at the center of the experience.
2. Let the home page communicate trust and clarity before sales pressure.
3. Make the storefront feel premium, not generic.
4. Keep the product schema ready for real commerce without overcomplicating the data layer.
5. Preserve the dark, minimalist, high-trust atmosphere across the site.

## Implementation order

1. Refine the home page around the minimalist hero and direct storefront CTA.
2. Unify the product schema and keep it ready for real checkout integration.
3. Update product cards to emphasize collectible identity and availability.
4. Add hybrid product detail behavior for multi-image pieces.
5. Implement the single-page checkout and confirmation flow.
6. Add the quiet bio and contact layer (email, Instagram, LinkedIn).
7. Validate desktop and mobile layouts, then run build and local QA.

## Validation checklist

- the home page reads clearly as premium and direct
- the storefront feels collectible, not mass-market
- products present sufficient detail for buyer confidence
- the checkout feels trustworthy and low-friction
- the experience stays dark, minimal, and premium
- the product data is ready for real checkout integration
- local build passes with no runtime errors

## Next steps for this repo

- Keep iterating from the live app shell in [src/PortfolioApp.js](src/PortfolioApp.js).
- Use the storefront-first direction to guide homepage and catalog layout work.
- Keep product and checkout decisions tied to the final schema and confirmation behavior.
- Validate every revision against the real local preview and production build.
