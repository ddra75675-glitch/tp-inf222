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
