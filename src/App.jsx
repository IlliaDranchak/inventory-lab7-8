// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { InventoryProvider } from './store/InventoryContext';
import { FavoritesProvider } from './store/FavoritesContext'; // <-- Імпортуй це
import AdminInventory from './pages/AdminInventory';
import AdminInventoryCreate from './pages/AdminInventoryCreate';
import AdminInventoryDetails from './pages/AdminInventoryDetails';
import AdminInventoryEdit from './pages/AdminInventoryEdit';
import Gallery from './pages/Gallery';
import Favorites from './pages/Favorites';

function App() {
  return (
    <InventoryProvider>
      <FavoritesProvider> {/* <-- Обгорни тут */}
        <BrowserRouter>
          <Routes>
            <Route path="/admin" element={<AdminInventory />} />
            <Route path="/admin/create" element={<AdminInventoryCreate />} />
            <Route path="/admin/:id" element={<AdminInventoryDetails />} />
            <Route path="/admin/:id/edit" element={<AdminInventoryEdit />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="*" element={<Navigate to="/gallery" replace />} />
          </Routes>
        </BrowserRouter>
      </FavoritesProvider>
    </InventoryProvider>
  );
}

export default App;