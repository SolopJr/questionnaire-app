import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function TestPage({ questionnaires }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const questionnaire = questionnaires[id];

  const [responses, setResponses] = useState(() => {
    // Отримуємо попередні відповіді з localStorage при першому рендері
    const savedResponses = localStorage.getItem(`test-${id}-progress`);
    return savedResponses ? JSON.parse(savedResponses) : {};
  });

  const [startTime] = useState(Date.now());

  // Збереження відповідей в локальний сторедж при зміні стейту
  useEffect(() => {
    localStorage.setItem(`test-${id}-progress`, JSON.stringify(responses));
  }, [responses]);

  // Обробник відповіді
  const handleResponse = (qIndex, value) => {
    setResponses({ ...responses, [qIndex]: value });
  };

  // Сабміт форми
  const handleSubmit = () => {
    const duration = Math.floor((Date.now() - startTime) / 1000);

    // Отримуємо попередні результати з localStorage
    const previousResults = JSON.parse(localStorage.getItem(`test-${id}-results`)) || [];

    // Форматуємо відповіді з текстом питань
    const formattedResponses = Object.keys(responses).map(qIndex => ({
      question: questionnaire.questions[qIndex].text,
      answer: responses[qIndex]
    }));

    // Новий результат
    const newResult = {
      responses: formattedResponses,
      duration,
      timestamp: new Date().toISOString(),
    };

    // Оновлений масив результатів
    const updatedResults = [...previousResults, newResult];

    // Збереження в localStorage
    localStorage.setItem(`test-${id}-results`, JSON.stringify(updatedResults));

    // Очищення проміжного стану
    localStorage.removeItem(`test-${id}-progress`);

    // Виведення результатів в alert
    const resultsText = formattedResponses
      .map(({ question, answer }) => `${question}: ${Array.isArray(answer) ? answer.join(", ") : answer}`)
      .join("\n");

    alert(`Test duration: ${duration} seconds\n\nYour answers:\n${resultsText}`);

    // Перехід до каталогу
    navigate("/catalog");
  };

  return (
    <div>
      <h1>{questionnaire?.name}</h1>
      <p>{questionnaire?.description}</p>

      {questionnaire?.questions.map((q, index) => (
        <div key={index}>
          <p>{q.text}</p>

          {/* Питання з одинарним вибором */}
          {q.type === 'single' && (
            q.options.map((option, oIndex) => (
              <div key={oIndex}>
                <label>
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={option}
                    checked={responses[index] === option}
                    onChange={() => handleResponse(index, option)}
                  />
                  {option}
                </label>
              </div>
            ))
          )}

          {/* Питання з множинним вибором */}
          {q.type === 'multiple' && (
            q.options.map((option, oIndex) => (
              <div key={oIndex}>
                <label>
                  <input
                    type="checkbox"
                    value={option}
                    checked={(responses[index] || []).includes(option)}
                    onChange={(e) => {
                      const isChecked = e.target.checked;
                      const updatedResponses = isChecked
                        ? [...(responses[index] || []), option]
                        : (responses[index] || []).filter((val) => val !== option);

                      handleResponse(index, updatedResponses);
                    }}
                  />
                  {option}
                </label>
              </div>
            ))
          )}

          {/* Текстова відповідь */}
          {q.type === 'text' && (
            <input
              type="text"
              placeholder="Your answer"
              value={responses[index] || ''}
              onChange={(e) => handleResponse(index, e.target.value)}
              className="input"
            />
          )}

          {/* Числова відповідь */}
          {q.type === 'number' && (
            <input
              type="number"
              placeholder="Your number"
              value={responses[index] || ''}
              onChange={(e) => handleResponse(index, parseFloat(e.target.value))}
              className="input"
            />
          )}
        </div>
      ))}

      <button onClick={handleSubmit} className="button">
        Submit Results
      </button>
    </div>
  );
}

export default TestPage;
