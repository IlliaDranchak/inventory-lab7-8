import { useInventory } from '../store/InventoryContext';
import InventoryCard from '../components/gallery/InventoryCard';
import InventoryQuickView from '../components/gallery/InventoryQuickView';
import { useEffect, useState } from 'react';
import './Gallery.css';

function Gallery() {
  const { items, loading, error, fetchItems } = useInventory();
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  if (loading) return <div className="status loading">⏳ Завантаження галереї...</div>;
  if (error) return <div className="status error">❌ {error}</div>;

  return (
    <div className="gallery-container">
      <h1 className="gallery-title">️ Галерея інвентарю</h1>
      <div className="gallery-grid">
        {items.map(item => (
          <InventoryCard key={item.id} item={item} onClick={setSelectedItem} />
        ))}
      </div>
      {selectedItem && (
        <InventoryQuickView item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </div>
  );
}

export default Gallery;