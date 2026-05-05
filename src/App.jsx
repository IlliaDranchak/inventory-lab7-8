// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { InventoryProvider } from './store/InventoryContext';

// Заглушки сторінок (тимчасово, щоб роутинг не падав)
const AdminInventory = () => <h1>️ Адмін-панель (ЛР7)</h1>;
const Gallery = () => <h1>🖼️ Галерея (ЛР8)</h1>;
const Favorites = () => <h1>❤️ Улюблені</h1>;

function App() {
  return (
    <InventoryProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/admin" element={<AdminInventory />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="*" element={<Navigate to="/gallery" replace />} />
        </Routes>
      </BrowserRouter>
    </InventoryProvider>
  );
}

export default App;