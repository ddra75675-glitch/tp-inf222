# API Blog - Documentation

API REST complète pour gérer un blog simple avec opérations CRUD sur les articles. Cette API permet de créer, lire, modifier et supprimer des articles, ainsi que de les rechercher et filtrer.

## Technologies utilisées

- **Node.js** avec **Express.js** - Framework web rapide et minimaliste
- **Supabase** - Base de données PostgreSQL hébergée
- **Swagger** - Documentation interactive de l'API
- **CORS** - Gestion des requêtes cross-origin

## Fonctionnalités

- Création d'articles avec titre, contenu, auteur, catégorie et tags
- Récupération de tous les articles avec filtres optionnels
- Récupération d'un article spécifique par ID
- Mise à jour d'articles existants
- Suppression d'articles
- Recherche d'articles par titre ou contenu
- Validation des données entrantes
- Documentation Swagger interactive
- Codes HTTP appropriés (200, 201, 400, 404, 500)

## Installation

### Prérequis

- Node.js (version 18 ou supérieure)
- npm ou yarn
- Un compte Supabase (gratuit)

### Étapes d'installation

1. **Cloner le dépôt**
```bash
git clone <url-du-depot>
cd blog-api
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configurer les variables d'environnement**

Le fichier `.env` contient déjà les configurations nécessaires. Si vous souhaitez utiliser votre propre base de données Supabase :

- Créez un compte sur [Supabase](https://supabase.com)
- Créez un nouveau projet
- Récupérez l'URL et la clé anonyme dans les paramètres du projet
- Mettez à jour le fichier `.env` avec vos propres valeurs

4. **Démarrer le serveur**

En mode développement (avec auto-reload):
```bash
npm run dev
```

En mode production:
```bash
npm start
```

Le serveur démarre par défaut sur le port 3000.

## Structure du projet

```
blog-api/
├── src/
│   ├── config/
│   │   ├── supabase.js      # Configuration Supabase
│   │   └── swagger.js        # Configuration Swagger
│   ├── controllers/
│   │   └── articleController.js  # Logique métier des articles
│   ├── middleware/
│   │   └── validation.js     # Validation des données
│   ├── routes/
│   │   └── articleRoutes.js  # Routes API
│   └── server.js             # Point d'entrée de l'application
├── .env                      # Variables d'environnement
├── package.json              # Dépendances du projet
└── README.md                 # Documentation
```

## Endpoints de l'API

### Base URL
```
http://localhost:3000/api/articles
```

### 1. Créer un article
**POST** `/api/articles`

Crée un nouvel article dans la base de données.

**Corps de la requête (JSON):**
```json
{
  "titre": "Introduction à Node.js",
  "contenu": "Node.js est un environnement d'exécution JavaScript...",
  "auteur": "Jean Dupont",
  "categorie": "Tech",
  "tags": ["nodejs", "javascript", "backend"]
}
```

**Réponse (201):**
```json
{
  "success": true,
  "message": "Article créé avec succès",
  "data": {
    "id": 1,
    "titre": "Introduction à Node.js",
    "contenu": "Node.js est un environnement d'exécution JavaScript...",
    "auteur": "Jean Dupont",
    "date": "2026-03-25T10:30:00.000Z",
    "categorie": "Tech",
    "tags": ["nodejs", "javascript", "backend"]
  }
}
```

**Exemple avec curl:**
```bash
curl -X POST http://localhost:3000/api/articles \
  -H "Content-Type: application/json" \
  -d '{
    "titre": "Mon premier article",
    "contenu": "Contenu de mon article",
    "auteur": "John Doe",
    "categorie": "Tech",
    "tags": ["nodejs", "api"]
  }'
```

### 2. Récupérer tous les articles
**GET** `/api/articles`

Récupère la liste complète des articles, avec possibilité de filtrage.

**Paramètres de requête (optionnels):**
- `categorie` - Filtrer par catégorie
- `auteur` - Filtrer par auteur
- `date` - Filtrer par date (format: YYYY-MM-DD)

**Exemples:**
```bash
# Tous les articles
GET http://localhost:3000/api/articles

# Articles de la catégorie "Tech"
GET http://localhost:3000/api/articles?categorie=Tech

# Articles d'un auteur spécifique
GET http://localhost:3000/api/articles?auteur=Jean%20Dupont

# Articles d'une date spécifique
GET http://localhost:3000/api/articles?date=2026-03-25

# Combinaison de filtres
GET http://localhost:3000/api/articles?categorie=Tech&auteur=Jean%20Dupont
```

**Réponse (200):**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": 1,
      "titre": "Introduction à Node.js",
      "contenu": "...",
      "auteur": "Jean Dupont",
      "date": "2026-03-25T10:30:00.000Z",
      "categorie": "Tech",
      "tags": ["nodejs", "javascript"]
    }
  ]
}
```

### 3. Récupérer un article par ID
**GET** `/api/articles/{id}`

Récupère un article spécifique via son identifiant.

**Exemple:**
```bash
GET http://localhost:3000/api/articles/1
```

**Réponse (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "titre": "Introduction à Node.js",
    "contenu": "...",
    "auteur": "Jean Dupont",
    "date": "2026-03-25T10:30:00.000Z",
    "categorie": "Tech",
    "tags": ["nodejs", "javascript"]
  }
}
```

**Réponse (404) si non trouvé:**
```json
{
  "success": false,
  "message": "Article non trouvé"
}
```

### 4. Mettre à jour un article
**PUT** `/api/articles/{id}`

Met à jour un article existant. Seuls les champs fournis sont modifiés.

**Corps de la requête (JSON):**
```json
{
  "titre": "Nouveau titre",
  "contenu": "Nouveau contenu mis à jour",
  "categorie": "Tech",
  "tags": ["nodejs", "express", "api"]
}
```

**Exemple avec curl:**
```bash
curl -X PUT http://localhost:3000/api/articles/1 \
  -H "Content-Type: application/json" \
  -d '{
    "titre": "Titre mis à jour",
    "contenu": "Contenu mis à jour"
  }'
```

**Réponse (200):**
```json
{
  "success": true,
  "message": "Article mis à jour avec succès",
  "data": {
    "id": 1,
    "titre": "Nouveau titre",
    "contenu": "Nouveau contenu mis à jour",
    "auteur": "Jean Dupont",
    "date": "2026-03-25T10:30:00.000Z",
    "categorie": "Tech",
    "tags": ["nodejs", "express", "api"]
  }
}
```

### 5. Supprimer un article
**DELETE** `/api/articles/{id}`

Supprime un article de la base de données.

**Exemple:**
```bash
curl -X DELETE http://localhost:3000/api/articles/1
```

**Réponse (200):**
```json
{
  "success": true,
  "message": "Article supprimé avec succès",
  "data": {
    "id": 1,
    "titre": "Introduction à Node.js",
    "auteur": "Jean Dupont",
    "categorie": "Tech"
  }
}
```

### 6. Rechercher des articles
**GET** `/api/articles/search?query={texte}`

Recherche des articles dont le titre ou le contenu contient le texte spécifié.

**Paramètres:**
- `query` (requis) - Texte à rechercher

**Exemples:**
```bash
# Rechercher "nodejs"
GET http://localhost:3000/api/articles/search?query=nodejs

# Rechercher "javascript"
GET http://localhost:3000/api/articles/search?query=javascript
```

**Réponse (200):**
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "id": 1,
      "titre": "Introduction à Node.js",
      "contenu": "Node.js est un environnement...",
      "auteur": "Jean Dupont",
      "date": "2026-03-25T10:30:00.000Z",
      "categorie": "Tech",
      "tags": ["nodejs"]
    }
  ]
}
```

## Documentation Swagger

Une documentation interactive complète est disponible via Swagger UI :

```
http://localhost:3000/api-docs
```

Cette interface permet de :
- Visualiser tous les endpoints disponibles
- Consulter les schémas de données
- Tester directement les endpoints depuis le navigateur
- Voir les exemples de requêtes et réponses

## Codes HTTP utilisés

- **200 OK** - Requête réussie
- **201 Created** - Ressource créée avec succès
- **400 Bad Request** - Requête mal formée (validation échouée)
- **404 Not Found** - Ressource non trouvée
- **500 Internal Server Error** - Erreur serveur

## Validation des données

L'API valide automatiquement les données entrantes :

### Pour la création d'articles :
- `titre` : obligatoire, non vide
- `contenu` : obligatoire, non vide
- `auteur` : obligatoire, non vide
- `categorie` : obligatoire, non vide
- `tags` : optionnel, tableau de chaînes

### Pour la mise à jour :
- Tous les champs sont optionnels
- Les champs fournis ne peuvent pas être vides

## Exemples d'utilisation

### Avec JavaScript (fetch)

```javascript
// Créer un article
const createArticle = async () => {
  const response = await fetch('http://localhost:3000/api/articles', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      titre: 'Mon article',
      contenu: 'Contenu de mon article',
      auteur: 'John Doe',
      categorie: 'Tech',
      tags: ['nodejs', 'api']
    })
  });

  const data = await response.json();
  console.log(data);
};

// Récupérer tous les articles
const getArticles = async () => {
  const response = await fetch('http://localhost:3000/api/articles');
  const data = await response.json();
  console.log(data);
};

// Rechercher des articles
const searchArticles = async (query) => {
  const response = await fetch(
    `http://localhost:3000/api/articles/search?query=${encodeURIComponent(query)}`
  );
  const data = await response.json();
  console.log(data);
};
```

### Avec Postman

1. Importez la collection en utilisant l'URL de la documentation Swagger
2. Ou créez manuellement les requêtes en suivant les exemples ci-dessus
3. Testez chaque endpoint avec différents paramètres

## Bonnes pratiques implémentées

- Séparation claire entre routes, contrôleurs et configuration
- Validation des entrées utilisateur
- Gestion appropriée des erreurs
- Utilisation des codes HTTP standards
- Documentation complète avec Swagger
- Architecture modulaire et maintenable
- Middleware de validation réutilisable
- Gestion CORS pour les applications frontend

## Déploiement (optionnel)

### Sur Railway

1. Créez un compte sur [Railway](https://railway.app)
2. Connectez votre dépôt GitHub
3. Railway détectera automatiquement l'application Node.js
4. Ajoutez les variables d'environnement dans les paramètres
5. Déployez l'application

### Sur Render

1. Créez un compte sur [Render](https://render.com)
2. Créez un nouveau "Web Service"
3. Connectez votre dépôt GitHub
4. Configurez les variables d'environnement
5. Déployez l'application

## Support

Pour toute question ou problème, veuillez créer une issue sur le dépôt GitHub.

## Licence

ISC
Ce qui a été créé

Une API REST complète gestionnaire pour un blog avec les toutes les demandes fonctionnalités. L'API perm de creation, lire, modifier, supprimer et chercher des articles avec validation des données et documentation interactive.
Structure réalisée

Backend (Node.js + Express):

    Routes API pour toutes les opérations CRUD
    Contrôleurs avec métier logique séparé
    Middleware de validation des données entrées
    Gestion appropriée des codes HTTP (200, 201, 400, 404, 500)
    Configuration CORS pour les applications frontend

Base de données (Base de données Bolt - PostgreSQL):

    Tableau articlesavec tous les champs requis (titre, contenu, auteur, date, catégorie, tags)
    Indexs optimisés pour les recherches par catégorie, auteur et date
    Sécurité de niveau de ligne (RLS) mal à l'aise
    Déclencheur automatique pour met à jour la date de modification

Documentation:

    Documentation Swagger interactif accessible sur /api-docs
    README complet avec exemples d'utilisation
    Tous les endpoints documentés avec schémas et exemples

Points de terminaison disponibles

    POST /api/articles - Créer un article
    GET /api/articles - Récupérer tous les articles (avec filtres optionnels)
    GET /api/articles/:id - Récupérer un article spécifique
    PUT /api/articles/:id - Modifier un article
    SUPPRIMER /api/articles/:id - Supprimer un article
    GET /api/articles/search? query=texte - Rechercher des articles

Pour une astronome

npm start

L'API sera accessible sur  http://localhost:3000et la documentation Swagger sur http://localhost:3000/api-docs.

Le fichier README.md pour des instructions détaillées, des exemples d'utilisation avec curl et JavaScript, et des informations sur le déploiement sur le optionnel sur Chemin de fer ou Render.
