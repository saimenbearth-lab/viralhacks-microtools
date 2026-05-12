# BEARTH Website

Operator-grade master site for BEARTH and BEARTH SIGNAL.

## Live preview (Manus)
The site is currently served via Manus WebDev:
- https://3000-i1vkzjgzsn9nd2vuphymh-cb463939.us2.manus.computer/

## Stack
- React 19 + TypeScript + Vite
- Tailwind 4 + shadcn/ui (Operator Terminal theme)
- Wouter routing
- Static frontend (no backend yet)

## Local dev
```bash
pnpm install
pnpm dev
```

## Production build
```bash
pnpm build
# Output: dist/public/  (deploy this folder)
```

## Deploy options
1. **Manus deploy** (fastest): use `Publish` in Manus → returns `*.manus.space` URL → CNAME `bearth.io` to it on Hostinger.
2. **Cloudflare Pages**: connect this repo, set build cmd `pnpm build`, output dir `dist/public`.
3. **Netlify**: same as above.
4. **Hostinger static**: upload `dist/public/` via FTP / file manager.

## Hostinger DNS pointing
- A-record `@` → host IP (Cloudflare/Netlify-provided) **or** CNAME `@`/`www` → deployment URL.
- Add an HTTPS-redirect.

## Email capture
- Form action in `client/src/components/SiteShell.tsx` (`FooterEmail`) and `EmailCapture.tsx`.
- Replace placeholder MailerLite action URL once Saimen creates the form.

## Brand colors
- Navy `#1A1A2E`
- Gold `#F5A623`
- Signal Red `#E94560`
- White `#FFFFFF`
