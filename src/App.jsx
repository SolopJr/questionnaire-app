import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import TestPage from './TestPage';
import BuilderPage from './BuilderPage';
import CatalogPage from './CatalogPage';
import EditPage from './EditPage';

function App() {
  const [questionnaires, setQuestionnaires] = useState(() => {
    const saved = localStorage.getItem("questionnaires");
    return saved ? JSON.parse(saved) : [];
  });

  // Функція для збереження опитувань у localStorage
  const saveQuestionnairesToLocalStorage = (updatedQuestionnaires) => {
    localStorage.setItem("questionnaires", JSON.stringify(updatedQuestionnaires));
  };

  const handleAddQuestionnaire = (newQuestionnaire) => {
    if (newQuestionnaire.questions.length === 0) {
      alert("A questionnaire must have at least one question.");
      return;
    }
    const updatedQuestionnaires = [...questionnaires, newQuestionnaire];
    setQuestionnaires(updatedQuestionnaires);
    saveQuestionnairesToLocalStorage(updatedQuestionnaires); // Збереження після оновлення
  };

  const handleDeleteQuestionnaire = (index) => {
    const updated = questionnaires.filter((_, i) => i !== index);
    setQuestionnaires(updated);
    saveQuestionnairesToLocalStorage(updated); // Збереження після видалення
  };

  const handleUpdateQuestionnaire = (updatedQuestionnaire, index) => {
    const updated = [...questionnaires];
    updated[index] = updatedQuestionnaire;
    setQuestionnaires(updated);
    saveQuestionnairesToLocalStorage(updated); // Збереження після оновлення
  };

  return (
    <Router>
      <div>
        <nav className='fixed-top-left'>
          <h1>Questionnaire App</h1>
          <Link to="/catalog" className="link-header">Questionnaire Catalog</Link>
          <Link to="/builder" className="link-header">Questionnaire Builder</Link>
        </nav>

        <Routes>
          <Route
            path="/catalog"
            element={<CatalogPage questionnaires={questionnaires} onDelete={handleDeleteQuestionnaire} />}
          />
          <Route
            path="/builder"
            element={<BuilderPage onAddQuestionnaire={handleAddQuestionnaire} />}
          />
          <Route
            path="/edit/:id"
            element={<EditPage questionnaires={questionnaires} onUpdate={handleUpdateQuestionnaire} />}
          />
          <Route
            path="/test/:id"
            element={<TestPage questionnaires={questionnaires} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
