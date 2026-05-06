// src/store/FavoritesContext.jsx
import { createContext, useState, useEffect, useContext } from 'react';

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  // 1. Ініціалізація (читаємо один раз при запуску)
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem('favorites');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // 2. Збереження (працює автоматично при зміні favorites)
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // 3. Додавання / Видалення
  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      // Перетворюємо все в рядки, щоб уникнути помилок "1" !== 1
      const idStr = String(id);
      const exists = prev.some((fid) => String(fid) === idStr);

      if (exists) {
        // Видаляємо, якщо вже є
        return prev.filter((fid) => String(fid) !== idStr);
      } else {
        // Додаємо, якщо немає
        return [...prev, id];
      }
    });
  };

  // 4. Перевірка
  const isFavorite = (id) => {
    return favorites.some((fid) => String(fid) === String(id));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export const useFavorites = () => useContext(FavoritesContext);