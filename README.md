# Test_site

[![Netlify Status](https://api.netlify.com/api/v1/badges/094f09bf-1aec-4d06-8ced-9e83936a9c3a/deploy-status)](https://app.netlify.com/sites/mj-789/deploys)

## AdMob app-ads.txt

- The authorized seller list lives at `/app-ads.txt` and is bundled from `public/app-ads.txt` during builds.
- Current entry: `google.com, pub-3397901139666794, DIRECT, f08c47fec0942fa0`.
- After each deployment, confirm the file resolves at `https://<deploy-domain>/app-ads.txt` before requesting verification in AdMob.
