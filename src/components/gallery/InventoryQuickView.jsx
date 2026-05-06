import './InventoryQuickView.css';

export default function InventoryQuickView({ item, onClose }) {
  if (!item) return null;

  const photoUrl = item.photo_url 
    ? (item.photo_url.startsWith('http') ? item.photo_url : `http://localhost:3000${item.photo_url}`)
    : 'https://via.placeholder.com/600?text=No+Image';

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <div className="modal-body">
          <div className="modal-image">
            <img src={photoUrl} alt={item.inventory_name} />
          </div>
          <div className="modal-details">
            <h2>{item.inventory_name}</h2>
            <p className="modal-description">{item.description || 'Опис відсутній'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}