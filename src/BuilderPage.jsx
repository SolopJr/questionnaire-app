import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Routes, useNavigate } from 'react-router-dom';
import App from "./App";


function BuilderPage({ onAddQuestionnaire }) {
    const [newQuestionnaire, setNewQuestionnaire] = useState({ name: '', description: '', questions: [] });
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setNewQuestionnaire({ ...newQuestionnaire, [name]: value });
    };
  
    const addQuestion = () => {
      const question = { text: '', type: 'text', options: [] };
      setNewQuestionnaire({ ...newQuestionnaire, questions: [...newQuestionnaire.questions, question] });
    };
  
    const handleQuestionChange = (index, value) => {
      const updatedQuestions = [...newQuestionnaire.questions];
      updatedQuestions[index].text = value;
      setNewQuestionnaire({ ...newQuestionnaire, questions: updatedQuestions });
    };
  
    const handleTypeChange = (index, type) => {
      const updatedQuestions = [...newQuestionnaire.questions];
      updatedQuestions[index].type = type;
      setNewQuestionnaire({ ...newQuestionnaire, questions: updatedQuestions });
    };
  
    // Функція для зміни варіанту питання
    const handleOptionChange = (index, optionIndex, value) => {
      const updatedQuestions = [...newQuestionnaire.questions];
      
      // Оновлюємо лише конкретний варіант, що змінився
      updatedQuestions[index].options[optionIndex] = value;
  
      // Оновлюємо стан з новими варіантами
      setNewQuestionnaire({ ...newQuestionnaire, questions: updatedQuestions });
    };
  
    // Видалення варіанту питання
    const deleteOption = (index, optionIndex) => {
      const updatedQuestions = [...newQuestionnaire.questions];
      updatedQuestions[index].options = updatedQuestions[index].options.filter((_, i) => i !== optionIndex); // Видаляємо варіант за індексом
      setNewQuestionnaire({ ...newQuestionnaire, questions: updatedQuestions });
    };
  
    const deleteQuestion = (index) => {
      const updatedQuestions = newQuestionnaire.questions.filter((_, i) => i !== index);
      setNewQuestionnaire({ ...newQuestionnaire, questions: updatedQuestions });
    };
  
    // Додавання нового варіанту питання
    const addOption = (index) => {
      const updatedQuestions = [...newQuestionnaire.questions];
      updatedQuestions[index].options.push(''); // Додаємо новий варіант
      setNewQuestionnaire({ ...newQuestionnaire, questions: updatedQuestions });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onAddQuestionnaire(newQuestionnaire);
      setNewQuestionnaire({ name: '', description: '', questions: [] });
    };
  
    return (
        <form onSubmit={handleSubmit}>
        <input
          className="input name-input"
          type="text"
          name="name"
          placeholder="Questionnaire Name"
          value={newQuestionnaire.name}
          onChange={handleInputChange}
        />
        <textarea
          className="input description-input"
          name="description"
          placeholder="Description"
          value={newQuestionnaire.description}
          onChange={handleInputChange}
        />
        <button type="button" onClick={addQuestion} className="button">Add Question</button>
        
        {newQuestionnaire.questions.map((q, index) => (
          <div key={index}>
            {/* Текст для питання */}
            <p>Question {index + 1}</p> {/* Додаємо текст "Question $номер питання" */}
            
            <input
              className="input"
              type="text"
              placeholder="Question text"
              value={q.text}
              onChange={(e) => handleQuestionChange(index, e.target.value)}
            />
            <select
              className="input"
              value={q.type}
              onChange={(e) => handleTypeChange(index, e.target.value)}
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
                  <div key={oIndex} className="flex items-center mb-2">
                    <input
                      className="input"
                      type="text"
                      value={option}
                      onChange={(e) => handleOptionChange(index, oIndex, e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => deleteOption(index, oIndex)}
                      className="button"
                    >
                      Delete Option
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addOption(index)}
                  className="button"
                >
                  Add Option
                </button>
              </>
            )}
            <button
              type="button"
              onClick={() => deleteQuestion(index)}
              className="button"
            >
              Delete Question
            </button>
          </div>
        ))}
        <button type="submit" className="button">Create Questionnaire</button>
      </form>
    );
  }
export default BuilderPage;
