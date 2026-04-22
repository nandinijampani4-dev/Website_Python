# Nandini Jampani — Portfolio

> Personal portfolio built with **React + Vite**. Pastel design, smooth scroll animations, fully responsive.

🌐 **Live site:** [nandini-jampani.github.io/nandini-portfolio](https://nandini-jampani.github.io/nandini-portfolio)

## Stack

- React 18 + Vite
- Pure CSS-in-JS (no external UI library)
- Google Fonts: Playfair Display + DM Sans
- GitHub Actions for CI/CD deploy

## Run Locally

```bash
npm install
npm run dev
```

## Deploy to GitHub Pages

1. Push this repo to GitHub
2. Go to **Settings → Pages → Source → GitHub Actions**
3. The workflow in `.github/workflows/deploy.yml` handles the rest automatically on every push to `main`

> **Note:** Update `base` in `vite.config.js` to match your repo name, or set it to `"/"` if using a user page (`username.github.io`).
