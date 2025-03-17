import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Routes, useParams, useNavigate } from 'react-router-dom';

function CatalogPage({ questionnaires, onDelete }) {
    const navigate = useNavigate();  // Оголошуємо navigate

    const itemsPerPage = 9; // Кількість елементів на сторінці
    const [currentPage, setCurrentPage] = useState(1); // Поточна сторінка
  
    // Визначаємо індекси елементів для поточної сторінки
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = questionnaires.slice(indexOfFirstItem, indexOfLastItem);
  
    // Функція для переходу на наступну сторінку
    const nextPage = () => {
      if (currentPage < Math.ceil(questionnaires.length / itemsPerPage)) {
        setCurrentPage(currentPage + 1);
      }
    };
  
    // Функція для переходу на попередню сторінку
    const prevPage = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    };
  
    // Генерація унікального ID для кожного елемента з урахуванням сторінки
    const getIdForPageItem = (index) => {
      return (currentPage - 1) * itemsPerPage + index; // Зсув на основі сторінки
    };
  
    return (
      <div>
        <h2>Questionnaires:</h2>
        <ul>
          {currentItems.map((q, index) => {
            const id = getIdForPageItem(index); // Отримуємо ID для елемента
  
            return (
              <li key={id} className="card">
                <h3>{q.name}</h3>
                <p>{q.description}</p>
                <p>Number of Questions: {q.questions.length}</p>
                <div>
                    {/* Кнопка для переходу на сторінку проходження тесту */}
                    <button onClick={() => navigate(`/test/${id}`)} className="button">
                        Start Test
                    </button>
                    {/* Кнопка для переходу на сторінку редагування */}
                    <button onClick={() => navigate(`/edit/${id}`)} className="button">
                        Edit
                    </button>
                    {/* Видалення елемента */}
                    <button onClick={() => onDelete(id)} className="button">
                        Delete
                    </button>
                </div>

              </li>
            );
          })}
        </ul>
  
        {/* Кнопки пагінації */}
        <div className="pagination-container" >
          <button onClick={prevPage} className="page-button" disabled={currentPage === 1}>
            Previous
          </button>
          <button onClick={nextPage} className="page-button" disabled={currentPage === Math.ceil(questionnaires.length / itemsPerPage)}>
            Next
          </button>
        </div>
  
        {/* Відображення поточної сторінки */}
        <p className="pagination-container">Page {currentPage} of {Math.ceil(questionnaires.length / itemsPerPage)}</p>
      </div>
    );
  }

export default CatalogPage;