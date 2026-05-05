// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { InventoryProvider } from './store/InventoryContext';
import AdminInventory from './pages/AdminInventory';
import Gallery from './pages/Gallery';
import Favorites from './pages/Favorites';
import AdminInventoryCreate from './pages/AdminInventoryCreate';
import AdminInventoryDetails from './pages/AdminInventoryDetails';
import AdminInventoryEdit from './pages/AdminInventoryEdit';

function App() {
  return (
    <InventoryProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/admin" element={<AdminInventory />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="*" element={<Navigate to="/gallery" replace />} />
          <Route path="/admin/create" element={<AdminInventoryCreate />} />
          <Route path="/admin/:id" element={<AdminInventoryDetails />} />
          <Route path="/admin/:id/edit" element={<AdminInventoryEdit />} />
        </Routes>
      </BrowserRouter>
    </InventoryProvider>
  );
}

export default App;