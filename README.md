
# Questionnaire App

This project is a web application for creating, editing, and testing questionnaires. Users can create questionnaires, add questions and answer options, and test questionnaires after they are created.



## Component Descriptions

### 1. **App**
The main component of the application that handles routing with React Router. It defines routes for different pages of the app:
- **/catalog** — page displaying a list of all created questionnaires.
- **/builder** — page for creating new questionnaires.
- **/edit/:id** — page for editing a specific questionnaire by its ID.
- **/test/:id** — page for testing a questionnaire.

### 2. **BuilderPage**
The component where users can create new questionnaires. Here, users can add questions to the questionnaire, change the question type (text, single choice, multiple choice), and add options for the question.

### 3. **CatalogPage**
A page where all created questionnaires are displayed. Users can delete questionnaires or navigate to edit them.

### 4. **EditPage**
A page for editing a specific questionnaire. It allows users to change the name, description, and also edit questions and answer options.

### 5. **TestPage**
A page for testing a questionnaire, where users can fill out the questions and view the results.



## How to Run the Project Locally

1. **Clone the repository**

   First, clone the repository to your local machine:

   ```bash
   git clone https://github.com/yourusername/questionnaire-app.git
   ```

2. **Install dependencies**

   Navigate to the project directory and install all necessary dependencies using `npm`:

   ```bash
   cd questionnaire-app
   npm install
   ```

3. **Run the app**

   Once the dependencies are installed, start the project on a local server:

   ```bash
   npm run dev
   ```


## Project Structure

- **src/**
  - **components/**
    - `App.js` — the main component that handles routing.
    - `BuilderPage.js` — page for creating new questionnaires.
    - `CatalogPage.js` — page for displaying a list of questionnaires.
    - `EditPage.js` — page for editing a questionnaire.
    - `TestPage.js` — page for testing a questionnaire.
  - **styles/**
    - `App.css` — styles for the main components of the app.
    - `BuilderPage.css` — styles for the questionnaire creation page.
    - `CatalogPage.css` — styles for the questionnaire catalog page.
    - `EditPage.css` — styles for the questionnaire edit page.
    - `TestPage.css` — styles for the questionnaire test page.

- **public/**
  - `index.html` — main HTML template for the app.

- **package.json** — project configuration file containing dependencies and setup for running the app.

## Technologies Used in the Project

- **React** — a library for building user interfaces.
- **React Router** — a library for handling routing.
- **useState, useEffect** — React hooks for managing state and side effects.
- **localStorage** — used for storing questionnaires in the browser.
  
## Key Features

- **Local Storage:** Questionnaires are saved in the user's browser using `localStorage`.
- **Adding and Editing Questions:** Users can add, edit, and delete questions for each questionnaire.
- **Question Types:** Different types of questions are supported: text, single choice, and multiple choice.
- **Testing Questionnaires:** After creating a questionnaire, users can test it by filling it out.

## Potential Improvements

- Adding the ability to store questionnaires on a server.
- Adding functionality to check answers after completing the test.
- Improving the UI with additional design libraries.




__________________________________________________________________________________________________________________________________________________________________________________________________


Ось оновлений варіант `README.md` з урахуванням ваших зауважень:

---

# Questionnaire App

Цей проект — це веб-додаток для створення, редагування і тестування анкети. Користувачі можуть створювати анкети, додавати питання та варіанти відповідей, а також тестувати анкети після їх створення.

## Опис компонентів

### 1. **App**
Основний компонент додатку, який містить роутінг за допомогою React Router. Він визначає маршрути для різних сторінок додатку:
- **/catalog** — сторінка зі списком всіх створених анкет.
- **/builder** — сторінка для створення нових анкет.
- **/edit/:id** — сторінка для редагування конкретної анкети за її ідентифікатором.
- **/test/:id** — сторінка для тестування анкети.

### 2. **BuilderPage**
Компонент, де користувач може створювати нові анкети. Тут можна додавати питання до анкети, змінювати тип питання (текстове, одиночний вибір, множинний вибір) і додавати варіанти для питання. 

### 3. **CatalogPage**
Сторінка, на якій відображаються всі створені анкети. Користувач може видаляти анкети або переходити до їх редагування.

### 4. **EditPage**
Сторінка для редагування конкретної анкети. Вона дозволяє змінювати назву, опис анкети, а також редагувати питання та варіанти відповідей.

### 5. **TestPage**
Сторінка для тестування анкети, де користувач може заповнювати питання анкети і переглядати результати.

## Як запустити проект локально

1. **Клонувати репозиторій**

   Спочатку клонуйте репозиторій на свій локальний комп'ютер:

   ```bash
   git clone https://github.com/yourusername/questionnaire-app.git
   ```

2. **Встановити залежності**

   Перейдіть до директорії проекту та встановіть усі необхідні залежності за допомогою `npm`:

   ```bash
   cd questionnaire-app
   npm install
   ```

3. **Запустити додаток**

   Після того як всі залежності будуть встановлені, запустіть проект на локальному сервері:

   ```bash
   npm run dev
   ```

## Структура проекту

- **src/**
  - **components/**
    - `App.js` — основний компонент додатку, що містить маршрути.
    - `BuilderPage.js` — сторінка для створення нових анкет.
    - `CatalogPage.js` — сторінка для відображення списку анкет.
    - `EditPage.js` — сторінка для редагування анкети.
    - `TestPage.js` — сторінка для тестування анкети.
  - **styles/**
    - `App.css` — стилі для основних компонентів додатку.
    - `BuilderPage.css` — стилі для сторінки створення анкети.
    - `CatalogPage.css` — стилі для сторінки з каталогом анкет.
    - `EditPage.css` — стилі для сторінки редагування анкети.
    - `TestPage.css` — стилі для сторінки тестування анкети.

- **public/**
  - `index.html` — основний HTML шаблон для вашого додатку.

- **package.json** — файл конфігурації проекту, який містить залежності та налаштування для запуску.

## Технології, які використовуються в проекті

- **React** — бібліотека для побудови інтерфейсу користувача.
- **React Router** — бібліотека для реалізації маршрутизації.
- **useState, useEffect** — React хуки для роботи зі станом і ефектами.
- **localStorage** — для збереження анкет в браузері.
  
## Важливі функціональності

- **Локальне збереження:** Анкети зберігаються в браузері користувача за допомогою `localStorage`.
- **Додавання та редагування питань:** Користувач може додавати, редагувати і видаляти питання у кожній анкеті.
- **Типи питань:** Підтримуються різні типи питань: текст, одиночний вибір і множинний вибір.
- **Тестування анкет:** Після створення анкети користувач може пройти тестування та заповнити її.

## Потенційні покращення

- Додавання можливості збереження анкет на сервері.
- Додавання функціональності для перевірки відповідей після проходження тесту.
- Покращення інтерфейсу за допомогою додаткових бібліотек для дизайну.






