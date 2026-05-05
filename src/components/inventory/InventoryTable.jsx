// src/components/inventory/InventoryTable.jsx
import { useState } from 'react';
import { useInventory } from '../../store/InventoryContext';
import { Link } from 'react-router-dom';
import ConfirmModal from './ConfirmModal';
import './InventoryTable.css';

function InventoryTable() {
  const { items, loading, error, deleteItem } = useInventory();
  const [deleteTarget, setDeleteTarget] = useState(null);

  if (loading) return <div className="status loading">⏳ Завантаження інвентарю...</div>;
  if (error) return <div className="status error">❌ Помилка: {error}</div>;
  if (!items || items.length === 0) return <div className="status empty">📭 Інвентар порожній. Додайте першу позицію.</div>;

  const handleDelete = async () => {
    try {
      await deleteItem(deleteTarget.id);
      setDeleteTarget(null);
    } catch (err) {
      alert(`Не вдалося видалити: ${err.message}`);
    }
  };

  return (
    <>
      <div className="table-wrapper">
        <table className="inventory-table">
          <thead>
            <tr>
              <th>Фото</th>
              <th>Назва</th>
              <th>Опис</th>
              <th>Дії</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>
                  <img
                    src={item.photo_url || item.photo || 'https://via.placeholder.com/60?text=No+Image'}
                    alt={item.inventory_name}
                    className="table-photo"
                  />
                </td>
                <td className="name-cell">{item.inventory_name}</td>
                <td className="desc-cell">{item.description}</td>
                <td className="actions-cell">
                  <Link to={`/admin/${item.id}`} className="btn-action view">👁️ Переглянути</Link>
                  <Link to={`/admin/${item.id}/edit`} className="btn-action edit">️ Редагувати</Link>
                  <button 
                    className="btn-action delete" 
                    onClick={() => setDeleteTarget(item)}
                  >
                    🗑️ Видалити
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ConfirmModal
        isOpen={!!deleteTarget}
        title="Підтвердження видалення"
        message={`Ви впевнені, що хочете видалити "${deleteTarget?.inventory_name}"? Цю дію неможливо скасувати.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </>
  );
}

export default InventoryTable;