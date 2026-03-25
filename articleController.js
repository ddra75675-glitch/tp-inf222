import { supabase } from '../config/supabase.js';

export const createArticle = async (req, res) => {
  try {
    const { titre, contenu, auteur, categorie, tags } = req.body;

    const articleData = {
      titre,
      contenu,
      auteur,
      categorie,
      tags: tags || [],
      date: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('articles')
      .insert([articleData])
      .select()
      .maybeSingle();

    if (error) {
      throw error;
    }

    res.status(201).json({
      success: true,
      message: 'Article créé avec succès',
      data
    });
  } catch (error) {
    console.error('Erreur lors de la création de l\'article:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la création de l\'article',
      error: error.message
    });
  }
};

export const getAllArticles = async (req, res) => {
  try {
    const { categorie, auteur, date } = req.query;

    let query = supabase.from('articles').select('*');

    if (categorie) {
      query = query.eq('categorie', categorie);
    }

    if (auteur) {
      query = query.eq('auteur', auteur);
    }

    if (date) {
      query = query.gte('date', date).lt('date', new Date(new Date(date).getTime() + 86400000).toISOString());
    }

    query = query.order('date', { ascending: false });

    const { data, error } = await query;

    if (error) {
      throw error;
    }

    res.status(200).json({
      success: true,
      count: data.length,
      data
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des articles:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la récupération des articles',
      error: error.message
    });
  }
};

export const getArticleById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) {
      throw error;
    }

    if (!data) {
      return res.status(404).json({
        success: false,
        message: 'Article non trouvé'
      });
    }

    res.status(200).json({
      success: true,
      data
    });
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'article:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la récupération de l\'article',
      error: error.message
    });
  }
};

export const updateArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const { titre, contenu, categorie, tags } = req.body;

    const updateData = {};
    if (titre !== undefined) updateData.titre = titre;
    if (contenu !== undefined) updateData.contenu = contenu;
    if (categorie !== undefined) updateData.categorie = categorie;
    if (tags !== undefined) updateData.tags = tags;

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Aucune donnée à mettre à jour'
      });
    }

    const { data, error } = await supabase
      .from('articles')
      .update(updateData)
      .eq('id', id)
      .select()
      .maybeSingle();

    if (error) {
      throw error;
    }

    if (!data) {
      return res.status(404).json({
        success: false,
        message: 'Article non trouvé'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Article mis à jour avec succès',
      data
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'article:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la mise à jour de l\'article',
      error: error.message
    });
  }
};

export const deleteArticle = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('articles')
      .delete()
      .eq('id', id)
      .select()
      .maybeSingle();

    if (error) {
      throw error;
    }

    if (!data) {
      return res.status(404).json({
        success: false,
        message: 'Article non trouvé'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Article supprimé avec succès',
      data
    });
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'article:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la suppression de l\'article',
      error: error.message
    });
  }
};

export const searchArticles = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || query.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Le paramètre de recherche "query" est requis'
      });
    }

    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .or(`titre.ilike.%${query}%,contenu.ilike.%${query}%`)
      .order('date', { ascending: false });

    if (error) {
      throw error;
    }

    res.status(200).json({
      success: true,
      count: data.length,
      data
    });
  } catch (error) {
    console.error('Erreur lors de la recherche des articles:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la recherche des articles',
      error: error.message
    });
  }
};
