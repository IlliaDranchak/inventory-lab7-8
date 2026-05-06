// src/pages/Favorites.jsx
import { useInventory } from '../store/InventoryContext';
import { useFavorites } from '../store/FavoritesContext'; // <-- Імпорт з Context
import InventoryCard from '../components/gallery/InventoryCard';
import { useEffect } from 'react';
import './Gallery.css';

function Favorites() {
  const { items, loading, error, fetchItems } = useInventory();
  const { favorites } = useFavorites(); // <-- Дані з Context

  useEffect(() => { fetchItems(); }, [fetchItems]);

  if (loading) return <div className="status loading">⏳ Завантаження...</div>;
  
  // Фільтруємо товари
  const favoriteItems = items.filter(item => favorites.includes(item.id) || favorites.includes(String(item.id)));

  return (
    <div className="gallery-container">
      <h1 className="gallery-title">❤️ Улюблені товари</h1>
      {favoriteItems.length === 0 ? (
        <div className="status empty">
          У вас поки немає улюблених товарів. Перейдіть до галереї та натисніть ❤️.
        </div>
      ) : (
        <div className="gallery-grid">
          {favoriteItems.map(item => (
            <InventoryCard key={item.id} item={item} onClick={() => {}} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;