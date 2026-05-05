// src/services/inventoryApi.js
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000'; // Зміни порт, якщо backend на іншому

export const inventoryApi = {
  getAll: async () => {
    const res = await fetch(`${API_BASE}/inventory`);
    if (!res.ok) throw new Error('Помилка завантаження інвентарю');
    return res.json();
  },

  getById: async (id) => {
    const res = await fetch(`${API_BASE}/inventory/${id}`);
    if (!res.ok) throw new Error('Помилка завантаження деталів');
    return res.json();
  },

  create: async (formData) => {
    const res = await fetch(`${API_BASE}/register`, {
      method: 'POST',
      body: formData, // браузер автоматично додасть Content-Type: multipart/form-data
    });
    if (!res.ok) throw new Error('Не вдалося створити позицію');
    return res.json();
  },

  updateText: async (id, data) => {
    const res = await fetch(`${API_BASE}/inventory/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Не вдалося оновити дані');
    return res.json();
  },

  updatePhoto: async (id, formData) => {
    const res = await fetch(`${API_BASE}/inventory/${id}/photo`, {
      method: 'PUT',
      body: formData,
    });
    if (!res.ok) throw new Error('Не вдалося оновити фото');
    return res.json();
  },

  delete: async (id) => {
    const res = await fetch(`${API_BASE}/inventory/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Не вдалося видалити позицію');
    return res.json();
  },
};