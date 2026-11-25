# LOTO Life storefront preview

Static storefront preview for https://lotolife.us/. No build, packages, third-party trackers, accounts, email collection, or checkout.

Iteration 2 includes original LOTO Life graphics, a generated lake hero, six labeled apparel/accessory concepts, category filtering, search and empty states, color/size previews in an accessible native dialog, and browser-local saved favorites. AO Coolers and Softlines have separate dealer-category introductions. Products, prices, garment specifications, fulfillment, and store policies still need confirmation before commerce launches.

The dealer catalog now previews three AO Coolers offerings and all seven Soft Lines marine product families in `gear-catalog.js`. Brand filters and native expandable product details work without collecting customer information. Illustrations are placeholders, pricing is pending, and no product is orderable. Soft Lines pet and horse ranges are outside this marine assortment. See `research/catalog-stub-plan.md` for scope and `research/catalog-sources.md` for public sources.

Published with GitHub Pages from the root of the `main` branch. Edit `index.html`, `styles.css`, or `app.js` and push to redeploy. The `CNAME` file preserves the custom domain. To preview from the parent workspace, run `node preview.mjs` and open http://127.0.0.1:4173/.

## Domain

Registrar: Squarespace Domains II LLC. Before the landing-page migration, the domain delegated to ns1/ns2/ns3.bigcommerce.com; those servers refused queries for this domain. Squarespace held an inactive forwarding rule to http://midwestboatparty-shop.mybigcommerce.com/loto-life/ and no custom DNS records.

Target DNS: Squarespace default nameservers, four GitHub Pages apex A records (185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153), and www CNAME to jeffrwinters.github.io. Do not add a CNAME at the apex.

HTTPS must be enabled after GitHub finishes issuing the domain certificate. Current deployment and DNS status should be checked in GitHub Pages and Squarespace before further changes.

The product/category illustrations, story illustration, and favicon are original SVG artwork. The hero is original AI-generated illustrative brand imagery, not a photograph of a verified location. See ASSETS.md for provenance and the final prompt. All displayed assets are self-hosted; no remote fonts or imagery are required.

## Verification

Run `node --check app.js`. Desktop and narrow-width Chrome browser checks cover filtering, search reset, empty favorites, favorite persistence after reload, product color/size controls, dialog close with Escape and focus return, mobile menu closing on navigation, loaded imagery, and no document/dialog horizontal overflow at 390 and 320 pixel widths. These checks do not establish physical iPhone/Safari compatibility or checkout behavior (checkout is not implemented).

For the dealer catalog, also run `node --check gear-catalog.js`. Verify ten listing cards, brand filter counts of three and seven, expanded product details, and mobile layout. Dealer catalog verification on November 25, 2026 passed these checks at desktop and 390px Chrome viewport, with no console errors; no physical mobile device or payment flow was tested.
