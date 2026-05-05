// src/store/InventoryContext.jsx
import { createContext, useState, useContext, useCallback } from 'react';
import { inventoryApi } from '../services/inventoryApi';

const InventoryContext = createContext();

export const InventoryProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await inventoryApi.getAll();
      setItems(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <InventoryContext.Provider value={{ items, loading, error, fetchItems, setItems }}>
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = () => useContext(InventoryContext);