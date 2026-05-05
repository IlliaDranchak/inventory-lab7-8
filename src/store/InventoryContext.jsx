// src/store/InventoryContext.jsx
import { createContext, useState, useContext, useCallback } from 'react';
import { inventoryApi } from '../services/inventoryApi';

const InventoryContext = createContext();

export const InventoryProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchItems = useCallback(async () => {
    setLoading(true); setError(null);
    try {
      const data = await inventoryApi.getAll();
      setItems(data);
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  }, []);

  const deleteItem = async (id) => {
    try {
      await inventoryApi.delete(id);
      // Оновлюємо список без повторного запиту (швидше та плавніше)
      setItems(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      setError(err.message);
      throw err; // пробрасуємо помилку, щоб обробити в UI якщо треба
    }
  };

  return (
    <InventoryContext.Provider value={{ items, loading, error, fetchItems, deleteItem }}>
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = () => useContext(InventoryContext);