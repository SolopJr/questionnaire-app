import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes, useParams, useNavigate } from 'react-router-dom';
// Сторінка для редагування анкети
function EditPage({ questionnaires, onUpdate }) {
  const { id } = useParams(); // Отримуємо ID анкети з URL
  const questionnaire = questionnaires[id]; // Отримуємо конкретну анкету за її ID
  const [editedQuestionnaire, setEditedQuestionnaire] = useState(questionnaire); // Створюємо стан для редагованої анкети
  const navigate = useNavigate(); // Хук для навігації після збереження змін

  // Функція для зміни значень полів анкети
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedQuestionnaire({ ...editedQuestionnaire, [name]: value }); // Оновлюємо відповідне поле
  };

  // Функція для зміни тексту питання
  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...editedQuestionnaire.questions];
    updatedQuestions[index].text = value; // Оновлюємо текст питання
    setEditedQuestionnaire({ ...editedQuestionnaire, questions: updatedQuestions });
  };

  // Функція для зміни типу питання
  const handleTypeChange = (index, type) => {
    const updatedQuestions = [...editedQuestionnaire.questions];
    updatedQuestions[index].type = type; // Оновлюємо тип питання
    setEditedQuestionnaire({ ...editedQuestionnaire, questions: updatedQuestions });
  };

  // Функція для зміни варіанту питання
  const handleOptionChange = (qIndex, optionIndex, value) => {
    const updatedQuestions = [...editedQuestionnaire.questions];
    updatedQuestions[qIndex].options[optionIndex] = value; // Оновлюємо варіант питання
    setEditedQuestionnaire({ ...editedQuestionnaire, questions: updatedQuestions });
  };

  // Додавання нового варіанту питання
  const addOption = (qIndex) => {
    const updatedQuestions = [...editedQuestionnaire.questions];
    updatedQuestions[qIndex].options.push(''); // Додаємо новий варіант
    setEditedQuestionnaire({ ...editedQuestionnaire, questions: updatedQuestions });
  };

  // Видалення варіанту питання
  const deleteOption = (qIndex, optionIndex) => {
    const updatedQuestions = [...editedQuestionnaire.questions];
    updatedQuestions[qIndex].options = updatedQuestions[qIndex].options.filter((_, i) => i !== optionIndex); // Видаляємо варіант за індексом
    setEditedQuestionnaire({ ...editedQuestionnaire, questions: updatedQuestions });
  };

  // Обробник відправки форми
  const handleSubmit = (e) => {
    e.preventDefault(); // Попереджаємо перезавантаження сторінки
    onUpdate(editedQuestionnaire, id); // Оновлюємо анкету
    navigate(`/test/${id}`); // Перенаправляємо на сторінку тесту
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Поля для редагування анкети */}
      <input
        className="border p-2 mb-4 w-full rounded-md"
        type="text"
        name="name"
        placeholder="Questionnaire Name"
        value={editedQuestionnaire.name}
        onChange={handleInputChange}
      />
      <textarea
        className="border p-2 mb-4 w-full rounded-md"
        name="description"
        placeholder="Description"
        value={editedQuestionnaire.description}
        onChange={handleInputChange}
      />
      {/* Маппінг питань анкети */}
      {editedQuestionnaire.questions.map((q, qIndex) => (
        <div key={qIndex}>
          <input
            className="border p-2 mb-2 w-full rounded-md"
            type="text"
            placeholder="Question text"
            value={q.text}
            onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
          />
          <select
            className="border p-2 w-full rounded-md"
            value={q.type}
            onChange={(e) => handleTypeChange(qIndex, e.target.value)}
          >
            <option value="text">Text</option>
            <option value="single">Single Choice</option>
            <option value="multiple">Multiple Choice</option>
            <option value="number">Number</option>
          </select>
          {/* Варіанти для питань типу "Single" або "Multiple" */}
          {['single', 'multiple'].includes(q.type) && (
            <>
              {q.options.map((option, oIndex) => (
                <div key={oIndex}>
                  <input
                    className="border p-2 mb-2 w-full rounded-md"
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => deleteOption(qIndex, oIndex)}
                    className="button"
                  >
                    Delete Option
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addOption(qIndex)}
                className="button"
              >
                Add Option
              </button>
            </>
          )}
        </div>
      ))}
      <button type="submit" className="button">
        Save Changes
      </button>
    </form>
  );
}

export default EditPage;