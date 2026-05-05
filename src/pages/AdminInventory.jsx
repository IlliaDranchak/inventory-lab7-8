// src/pages/AdminInventory.jsx
import { useEffect } from 'react';
import { useInventory } from '../store/InventoryContext';
import InventoryTable from '../components/inventory/InventoryTable';
import { Link } from 'react-router-dom';
import './AdminInventory.css';

function AdminInventory() {
  const { fetchItems } = useInventory();

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return (
    <div className="admin-page">
      <header className="admin-header">
        <h1>📦 Адмін-панель: Управління інвентарем</h1>
        <Link to="/admin/create" className="btn-primary">➕ Додати позицію</Link>
      </header>
      <InventoryTable />
    </div>
  );
}

export default AdminInventory;