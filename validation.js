export const validateArticle = (req, res, next) => {
  const { titre, contenu, auteur, categorie } = req.body;
  const errors = [];

  if (!titre || titre.trim() === '') {
    errors.push('Le titre est obligatoire et ne peut pas être vide');
  }

  if (!contenu || contenu.trim() === '') {
    errors.push('Le contenu est obligatoire et ne peut pas être vide');
  }

  if (!auteur || auteur.trim() === '') {
    errors.push('L\'auteur est obligatoire et ne peut pas être vide');
  }

  if (!categorie || categorie.trim() === '') {
    errors.push('La catégorie est obligatoire et ne peut pas être vide');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation échouée',
      errors
    });
  }

  next();
};

export const validateArticleUpdate = (req, res, next) => {
  const { titre, contenu, categorie } = req.body;
  const errors = [];

  if (titre !== undefined && titre.trim() === '') {
    errors.push('Le titre ne peut pas être vide');
  }

  if (contenu !== undefined && contenu.trim() === '') {
    errors.push('Le contenu ne peut pas être vide');
  }

  if (categorie !== undefined && categorie.trim() === '') {
    errors.push('La catégorie ne peut pas être vide');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation échouée',
      errors
    });
  }

  next();
};
