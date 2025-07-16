import React, { useState, useEffect } from 'react';
import './TaskModal.css';
import type { Props } from '../types/TaskModalProps';

const TaskModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState<string>('');
  const [dueDate, setDueDate] = useState('');
  const [isPriority, setIsPriority] = useState(false);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setDescription(initialData.description || '');
      setQuantity(initialData.quantity?.toString() || '');
      setDueDate(initialData.dueDate?.slice(0, 10) || '');
      setIsPriority(initialData.isPriority || false);
    } else {
      setTitle('');
      setDescription('');
      setQuantity('');
      setDueDate('');
      setIsPriority(false);
    }
  }, [initialData, isOpen]);

  const handleSubmit = () => {
    if (!title.trim()) return;
    onSubmit({
      title,
      description,
      quantity: quantity ? parseInt(quantity) : undefined,
      dueDate,
      isPriority
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <form className="modal"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <h2>{initialData ? 'Редагувати завдання' : 'Створити завдання'}</h2>
        <div className="input-group">
          <label htmlFor="">
            Заголовок завдання
          </label>
          <input
            name="title"
            type="text"
            placeholder="Введіть заголовок"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            minLength={5}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="">
            Кількість
          </label>
          <input
            name="quantity"
            type="number"
            placeholder="Введіть кількість"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="">Опис завдання</label>
          <textarea
            name="description"
            placeholder="Напишіть опис завдання"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="">Кінцева дата (не обовязково)</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <div className="priority-group">
          <label>
            Пріорітетне завдання
          </label>
          <input
            type="checkbox"
            checked={isPriority}
            onChange={(e) => setIsPriority(e.target.checked)}
          />{' '}
        </div>
        <div className="modal-actions">
          <button type="submit">{initialData ? 'Зберегти' : 'Створити'}</button>
          <button onClick={onClose}>Скасувати</button>
        </div>
      </form>
    </div>
  );
};

export default TaskModal;
