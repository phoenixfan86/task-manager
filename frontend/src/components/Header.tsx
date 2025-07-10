import './Header.css';
import type React from 'react';
import type { HeaderProps } from '../types/HeaderProps';



const Header: React.FC<HeaderProps> = ({ onOpenModal, totalCount, activeCount }) => {
  return (
    <header>
      <div className="logo-wrapper">
        <i className="fa-solid fa-clipboard-list fa-xl"></i>
        <a href="#">
          <div className="logo">
            <h1 >Task </h1>
            <span>Manager</span>
          </div>
        </a>
      </div>
      <button
        onClick={onOpenModal}
        className="new-task-btn"
      >Нове завдання</button>
      <div className="count-wrapper">
        <h5 className="count-item">Усього завдань:<span>{totalCount}</span> </h5>
        <h5 className="count-item">Невиконано:<span>{activeCount}</span></h5>
      </div>
    </header>
  );
}
export default Header;