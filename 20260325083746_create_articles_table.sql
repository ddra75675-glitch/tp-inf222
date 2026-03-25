/*
  # Création de la table articles pour le blog

  ## Description
  Cette migration crée la table principale `articles` pour stocker tous les articles du blog
  avec leurs métadonnées (titre, contenu, auteur, catégorie, tags, date).

  ## Nouvelles tables
  
  ### `articles`
  Table principale pour stocker les articles du blog
  
  **Colonnes:**
  - `id` (bigint, primary key, auto-généré) - Identifiant unique de l'article
  - `titre` (text, NOT NULL) - Titre de l'article
  - `contenu` (text, NOT NULL) - Contenu complet de l'article
  - `auteur` (text, NOT NULL) - Nom de l'auteur de l'article
  - `date` (timestamptz, DEFAULT now()) - Date et heure de création de l'article
  - `categorie` (text, NOT NULL) - Catégorie de l'article (Tech, Sport, Culture, etc.)
  - `tags` (text[], DEFAULT '{}') - Tableau de tags associés à l'article
  - `created_at` (timestamptz, DEFAULT now()) - Date de création de l'enregistrement
  - `updated_at` (timestamptz, DEFAULT now()) - Date de dernière modification

  ## Sécurité
  
  1. **Row Level Security (RLS)**
     - RLS est activé sur la table `articles`
     - Par défaut, aucun accès n'est autorisé sans politique explicite
  
  2. **Politiques d'accès**
     - **Lecture publique** : Tous les utilisateurs (authentifiés ou non) peuvent lire les articles
     - **Création** : Tous les utilisateurs authentifiés peuvent créer des articles
     - **Mise à jour** : Tous les utilisateurs authentifiés peuvent modifier les articles
     - **Suppression** : Tous les utilisateurs authentifiés peuvent supprimer les articles
  
  ## Index
  - Index sur `categorie` pour optimiser les filtres par catégorie
  - Index sur `auteur` pour optimiser les filtres par auteur
  - Index sur `date` pour optimiser le tri chronologique
  - Index GIN sur `tags` pour optimiser les recherches par tags

  ## Notes importantes
  - Les tags sont stockés dans un tableau PostgreSQL pour faciliter les recherches
  - Le champ `date` représente la date de publication de l'article
  - Le champ `created_at` représente la date de création dans la base de données
  - Le champ `updated_at` est automatiquement mis à jour lors des modifications
*/

CREATE TABLE IF NOT EXISTS articles (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  titre text NOT NULL,
  contenu text NOT NULL,
  auteur text NOT NULL,
  date timestamptz DEFAULT now() NOT NULL,
  categorie text NOT NULL,
  tags text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_articles_categorie ON articles(categorie);
CREATE INDEX IF NOT EXISTS idx_articles_auteur ON articles(auteur);
CREATE INDEX IF NOT EXISTS idx_articles_date ON articles(date DESC);
CREATE INDEX IF NOT EXISTS idx_articles_tags ON articles USING GIN(tags);

ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Tout le monde peut lire les articles"
  ON articles
  FOR SELECT
  USING (true);

CREATE POLICY "Utilisateurs authentifiés peuvent créer des articles"
  ON articles
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Utilisateurs authentifiés peuvent modifier les articles"
  ON articles
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Utilisateurs authentifiés peuvent supprimer les articles"
  ON articles
  FOR DELETE
  TO authenticated
  USING (true);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_articles_updated_at
  BEFORE UPDATE ON articles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
