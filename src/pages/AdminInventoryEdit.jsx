// src/pages/AdminInventoryEdit.jsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { inventoryApi } from '../services/inventoryApi';
import './AdminInventoryEdit.css';

function AdminInventoryEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [textData, setTextData] = useState({ inventory_name: '', description: '' });
  const [photoFile, setPhotoFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const data = await inventoryApi.getById(id);
        setTextData({ inventory_name: data.inventory_name, description: data.description || '' });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [id]);

  const handleTextChange = (e) => {
    setTextData({ ...textData, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e) => {
    setPhotoFile(e.target.files[0]);
  };

  const handleTextSubmit = async (e) => {
    e.preventDefault();
    try {
      await inventoryApi.updateText(id, textData);
      setSuccess('✅ Текстові дані оновлено');
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handlePhotoSubmit = async (e) => {
    e.preventDefault();
    if (!photoFile) return;
    const formData = new FormData();
    formData.append('photo', photoFile);
    try {
      await inventoryApi.updatePhoto(id, formData);
      setSuccess('✅ Фото оновлено');
      setError(null);
      setPhotoFile(null); // очищуємо вибір файлу
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="status loading">⏳ Завантаження...</div>;
  if (error) return <div className="status error">❌ Помилка: {error}</div>;

  return (
    <div className="edit-page">
      <h2>✏️ Редагування позиції</h2>
      {success && <div className="status success">{success}</div>}
      
      <div className="edit-grid">
        {/* Форма 1: Текстові дані */}
        <form onSubmit={handleTextSubmit} className="edit-form">
          <h3>📝 Текстові дані</h3>
          <div className="form-group">
            <label>Назва</label>
            <input name="inventory_name" value={textData.inventory_name} onChange={handleTextChange} required />
          </div>
          <div className="form-group">
            <label>Опис</label>
            <textarea name="description" value={textData.description} onChange={handleTextChange} rows="4" />
          </div>
          <button type="submit" className="btn-primary">Зберегти текст</button>
        </form>

        {/* Форма 2: Фото */}
        <form onSubmit={handlePhotoSubmit} className="edit-form">
          <h3> Оновити фото</h3>
          <div className="form-group">
            <label>Вибрати нове зображення</label>
            <input type="file" name="photo" accept="image/*" onChange={handlePhotoChange} />
          </div>
          <button type="submit" disabled={!photoFile} className="btn-secondary">Завантажити фото</button>
        </form>
      </div>
      
      <div className="edit-actions">
        <button onClick={() => navigate('/admin')} className="btn-back">Повернутися до списку</button>
      </div>
    </div>
  );
}

export default AdminInventoryEdit;