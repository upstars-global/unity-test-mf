# R2 Vite Widget

Minimal Vue 3 + Vite (TypeScript) project that builds a single versioned JS file and uploads it to Cloudflare R2 on every push to `main`.

## Local development

Requires Node.js 20+.

```bash
npm install
npm run dev
```

Open the dev server URL and you should see the widget mounted and a console message.

## Build

```bash
npm run build
```

Output: `dist/widget-<version>.js` (exactly one file).

## Versioning

On every push/merge to `main`, GitHub Actions:
- runs `npm version patch` (1.0.X),
- commits the bump with `[skip ci]`,
- creates a `v1.0.X` tag and pushes both commit + tag,
- builds and uploads the single JS file to R2.

The `[skip ci]` guard prevents infinite loops.

## GitHub Secrets

Set the following secrets in your repository:
- `R2_ACCOUNT_ID`
- `R2_ACCESS_KEY_ID`
- `R2_SECRET_ACCESS_KEY`
- `R2_BUCKET`
- `R2_PREFIX` (optional, e.g. `assets/`)

## R2 URL pattern

R2 is S3-compatible; access is typically through a custom domain or a Worker. Your file path will be:

```
/<optional-prefix>/widget-<version>.js
```

Configure your domain/Worker to serve that key from your R2 bucket.
