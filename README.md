# Unity Test MF (Remote)

Minimal Vue 3 + Vite Module Federation **remote**.

## Build

```bash
npm install
npm run build
```

## Output

Build produces:
- `dist/remoteEntry.js`
- `dist/assets/*`

## Host reference

Example URL (served from your Worker/R2 prefix):

```
http://localhost:8787/unity-test-mf/remoteEntry.js
```

The remote exposes `./Widget` from `src/Widget.vue`.
