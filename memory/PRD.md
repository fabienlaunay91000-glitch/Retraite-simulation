# Retraite Simplifiée - PRD

## Problème original
Landing page pour un service d'analyse de retraite. Site 100% statique React + Tailwind déployable sur Netlify.

## Fonctionnalités
- Hero, Problème, Solution, Comment ça marche, Ce que vous recevez
- Simulateur de retraite gratuit (âge, années cotisation, revenu)
- 13 articles SEO hardcodés
- Formulaire de contact (mailto: hello@solutionstmf.com, email NON affiché sur le site)
- Témoignages
- Navigation responsive (desktop + mobile)

## Ce qui a été SUPPRIMÉ (à la demande de l'utilisateur)
- Backend (FastAPI, MongoDB)
- Section Offres/Pricing (3 liens Stripe à 9€, 29€, 150€)
- Affichage de l'email de contact sur le site
- Shadcn UI, Craco, et toutes les dépendances inutiles

## Architecture
100% frontend statique : React 19 + Tailwind CSS 3 + React Router 7
Aucun backend, aucune base de données.

## Fichiers
- package.json (minimal: react, react-dom, react-router-dom, react-scripts, tailwindcss)
- netlify.toml (build config)
- postcss.config.js / tailwind.config.js
- public/index.html, public/_redirects
- src/index.js, src/index.css, src/App.css, src/App.js

## Statut
- MVP complet et fonctionnel ✅
- Compilé avec succès ✅
- Preview : https://retraite-simple.preview.emergentagent.com
- En attente de déploiement Netlify par l'utilisateur

## Prochaines étapes possibles
- Ajouter les accents dans le contenu des articles SEO
- Réintégrer les liens de paiement Stripe si souhaité
- Ajouter un formulaire de contact avec service tiers (EmailJS, Formspree)
- Optimisation SEO (sitemap, robots.txt, Open Graph)
