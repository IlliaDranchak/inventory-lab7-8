// src/pages/AdminInventoryDetails.jsx
import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { inventoryApi } from '../services/inventoryApi';
import './AdminInventoryDetails.css';

function AdminInventoryDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await inventoryApi.getById(id);
        setItem(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  // 🔥 Функція для отримання правильного URL фото
  const getImageUrl = () => {
    if (!item) return 'https://via.placeholder.com/600x400?text=Loading...';
    
    // Перевіряємо photo_url
    if (item.photo_url) {
      if (item.photo_url.startsWith('http')) {
        return item.photo_url;
      }
      return `http://localhost:3000${item.photo_url}`;
    }
    
    // Перевіряємо photo
    if (item.photo) {
      if (item.photo.startsWith('http')) {
        return item.photo;
      }
      return `http://localhost:3000${item.photo}`;
    }
    
    // Placeholder якщо фото немає
    return 'https://via.placeholder.com/600x400?text=No+Image';
  };

  const imageUrl = getImageUrl();

  if (loading) return <div className="status loading">⏳ Завантаження...</div>;
  if (error) return <div className="status error">❌ Помилка: {error}</div>;
  if (!item) return <div className="status empty">📭 Позицію не знайдено</div>;

  return (
    <div className="details-page">
      <Link to="/admin" className="btn-back">️ Назад до списку</Link>
      <div className="details-card">
        <div className="details-image">
          <img 
            src={imageUrl} 
            alt={item.inventory_name}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/600x400?text=Image+Not+Found';
            }}
          />
        </div>
        <div className="details-info">
          <h1>{item.inventory_name}</h1>
          <p className="description">{item.description || 'Опис відсутній'}</p>
          <div className="details-actions">
            <Link to={`/admin/${id}/edit`} className="btn-primary">✏️ Редагувати</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminInventoryDetails;