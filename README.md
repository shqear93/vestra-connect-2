# Vestra Connect

Interactive Jordan venture network: live opportunity map, Opportunity Journey Engine, deal rooms and dashboards.

Live site: https://shqear93.github.io/vestra-connect-2/

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build in dist/
```

## Design system

- **Surfaces, not outlines**: there are no card borders. Depth comes from tonal surface levels (`bg-bg`, `bg-bg2`, `bg-panel`, `bg-panel2`) plus the elevation shadows `shadow-s1/s2/s3`. Do not add `border` classes: Tailwind v4 draws them in `currentColor`.
- **Theme tokens** live in `src/index.css` (`:root` for dark, `:root[data-theme="light"]` for light). Components use semantic Tailwind colours (`bg-panel`, `text-ink`, `border-line`, `text-accent`), never raw hex. Change a token to re-brand the whole site.
- **Languages**: English and Arabic. `src/lib/prefs.tsx` holds language and theme state, sets `<html lang dir data-theme>` and persists the choice. Wrap any UI string in `t("English text")`; Arabic lives in `src/i18n/ar.ts` and missing keys fall back to English.
- **RTL**: layouts use logical Tailwind utilities (`ms-`, `pe-`, `text-start`, `start-`), and direction icons carry `rtl:-scale-x-100`.
- **Type scale**: nothing below 13px. Latin uses Plus Jakarta Sans; Arabic uses IBM Plex Sans Arabic with looser leading and no letter-spacing.
- Deep links for review: `?lang=ar&theme=light`.

## Deployment

Pushes to `main` build and publish to GitHub Pages through `.github/workflows/deploy.yml`.
