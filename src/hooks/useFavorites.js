// src/hooks/useFavorites.js
import { useState, useEffect, useCallback } from 'react';

export function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = useCallback((id) => {
    setFavorites((prev) => {
      const idStr = String(id);
      const exists = prev.some(fid => String(fid) === idStr);
      
      if (exists) {
        return prev.filter(fid => String(fid) !== idStr);
      } else {
        return [...prev, id];
      }
    });
  }, []);

  const isFavorite = useCallback((id) => {
    const idStr = String(id);
    return favorites.some(fid => String(fid) === idStr);
  }, [favorites]);

  return { favorites, toggleFavorite, isFavorite };
}