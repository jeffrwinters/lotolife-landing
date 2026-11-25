# LOTO Life landing page

Static coming-soon page for https://lotolife.us/. No build, packages, trackers, forms, or checkout.

Published with GitHub Pages from the root of the `main` branch. Edit `index.html` and push to redeploy. The `CNAME` file preserves the custom domain.

## Domain

Registrar: Squarespace Domains II LLC. Before the landing-page migration, the domain delegated to ns1/ns2/ns3.bigcommerce.com; those servers refused queries for this domain. Squarespace held an inactive forwarding rule to http://midwestboatparty-shop.mybigcommerce.com/loto-life/ and no custom DNS records.

Target DNS: Squarespace default nameservers, four GitHub Pages apex A records (185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153), and www CNAME to jeffrwinters.github.io. Do not add a CNAME at the apex.

HTTPS must be enabled after GitHub finishes issuing the domain certificate. Current deployment and DNS status should be checked in GitHub Pages and Squarespace before further changes.

The lake illustration and favicon are original inline/vector artwork. All visual assets are self-contained; no remote fonts or imagery are required.
