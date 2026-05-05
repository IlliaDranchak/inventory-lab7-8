// src/components/inventory/ConfirmModal.jsx
import './ConfirmModal.css';

export default function ConfirmModal({ isOpen, title, message, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h3>{title}</h3>
        <p>{message}</p>
        <div className="modal-actions">
          <button onClick={onCancel} className="btn-cancel">Скасувати</button>
          <button onClick={onConfirm} className="btn-confirm">Підтвердити</button>
        </div>
      </div>
    </div>
  );
}