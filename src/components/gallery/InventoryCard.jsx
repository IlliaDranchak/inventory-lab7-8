// src/components/gallery/InventoryCard.jsx
import { useFavorites } from '../../store/FavoritesContext'; // <-- Зміни імпорт
import './InventoryCard.css';

function InventoryCard({ item, onClick }) {
  const { toggleFavorite, isFavorite } = useFavorites(); // <-- Використовуй hook з Context
  const favorite = isFavorite(item.id);

  const photoUrl = item.photo_url 
    ? (item.photo_url.startsWith('http') ? item.photo_url : `http://localhost:3000${item.photo_url}`)
    : 'https://via.placeholder.com/300?text=No+Image';

  return (
    <div className="gallery-card" onClick={() => onClick(item)}>
      <div className="card-image-wrapper">
        <img src={photoUrl} alt={item.inventory_name} className="card-image" />
        <button 
          className={`heart-btn ${favorite ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(item.id); // <-- Тепер це оновить єдиний глобальний стан
          }}
          title={favorite ? 'Видалити з улюблених' : 'Додати до улюблених'}
        >
          {favorite ? '❤️' : '🤍'}
        </button>
      </div>
      <div className="card-info">
        <h3>{item.inventory_name}</h3>
      </div>
    </div>
  );
}

export default InventoryCard;