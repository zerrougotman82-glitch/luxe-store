# 🛍️ LUXŌ — Boutique

## Démarrer le projet

### Étape 1 — Prérequis
Assure-toi d'avoir **Node.js** installé sur ton PC.
Vérifie en ouvrant un terminal et en tapant :
```
node --version
```
Si tu n'as pas Node.js → télécharge-le sur https://nodejs.org (prends la version LTS)

---

### Étape 2 — Installer les dépendances
Dans le terminal, navigue dans le dossier du projet :
```bash
cd luxe-store
npm install
```
*(Cette commande télécharge React, Vite, lucide-react...)*

---

### Étape 3 — Lancer le serveur de développement
```bash
npm run dev
```

Tu verras quelque chose comme :
```
  VITE v5.x.x  ready in 300ms

  ➜  Local:   http://localhost:5173/
```

---

### Étape 4 — Ouvrir dans le navigateur
Ouvre ton navigateur et va sur :
**http://localhost:5173**

🎉 Ta boutique LUXŌ tourne !

---

## Structure des fichiers
```
luxe-store/
├── src/
│   ├── App.jsx       ← Toute la boutique est ici
│   ├── main.jsx      ← Point d'entrée React
│   └── index.css     ← Styles globaux
├── public/
│   └── favicon.svg
├── index.html
├── package.json
└── vite.config.js
```

## Pour modifier les produits
Ouvre `src/App.jsx` et cherche `const PRODUCTS = [...]` en haut du fichier.
Modifie les noms, prix, descriptions selon tes besoins !
