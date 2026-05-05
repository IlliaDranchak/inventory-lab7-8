import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { inventoryApi } from '../services/inventoryApi';
import './AdminInventoryCreate.css';

function AdminInventoryCreate() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    inventory_name: '',
    description: '',
    photo: null
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.inventory_name.trim()) {
      newErrors.inventory_name = 'Назва обов\'язкова';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const data = new FormData();
      data.append('inventory_name', formData.inventory_name);
      if (formData.description) data.append('description', formData.description);
      if (formData.photo) data.append('photo', formData.photo);

      await inventoryApi.create(data);
      navigate('/admin');
    } catch (err) {
      setErrors({ submit: err.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="create-page">
      <h2>➕ Додати нову позицію</h2>
      <form onSubmit={handleSubmit} className="inventory-form">
        <div className="form-group">
          <label>Назва *</label>
          <input
            type="text"
            name="inventory_name"
            value={formData.inventory_name}
            onChange={handleChange}
            className={errors.inventory_name ? 'input-error' : ''}
          />
          {errors.inventory_name && <span className="error-msg">{errors.inventory_name}</span>}
        </div>

        <div className="form-group">
          <label>Опис</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
          />
        </div>

        <div className="form-group">
          <label>Фото</label>
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={handleChange}
          />
        </div>

        {errors.submit && <div className="error-msg global">{errors.submit}</div>}

        <div className="form-actions">
          <button type="button" onClick={() => navigate('/admin')} className="btn-secondary">
            Скасувати
          </button>
          <button type="submit" disabled={isSubmitting} className="btn-primary">
            {isSubmitting ? 'Збереження...' : 'Зберегти'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdminInventoryCreate;