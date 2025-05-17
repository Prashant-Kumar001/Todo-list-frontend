# 📝 Code Snippet Manager (Front-End)

![Project Banner](https://via.placeholder.com/1200x300.png?text=Code+Snippet+Manager)  
*A sleek, modern, and user-friendly React application for managing code snippets.*

Welcome to the **Code Snippet Manager**, a front-end web application built with React and Tailwind CSS to help developers create, organize, edit, and view code snippets effortlessly. Developed as a college project, this application showcases advanced front-end development skills, including component-based architecture, state management, responsive design, and user-friendly interactions. With a polished dark-themed UI and robust functionality, it’s perfect for students saving code snippets for assignments or developers organizing reusable code. 🚀

---

## 🎯 Project Overview

The **Code Snippet Manager** is a front-end application that provides a CRUD (Create, Read, Update, Delete) interface for managing code snippets. Designed to meet college project requirements, it demonstrates proficiency in React, Tailwind CSS, and modern web development practices. The project emphasizes modularity, clean code, and an intuitive user experience, making it an excellent example of a real-world front-end application.

### Educational Goals
- **Master React**: Build a dynamic UI using components, hooks, and state management.
- **Apply UI/UX Principles**: Create a responsive, accessible interface with Tailwind CSS.
- **Implement Error Handling**: Use validation and toast notifications for user feedback.
- **Practice Modular Design**: Structure the codebase for reusability and maintainability.
- **Demonstrate Collaboration**: Use Git and GitHub for version control and documentation.

---

## ✨ Features

The Code Snippet Manager offers a rich set of features to enhance productivity and user satisfaction:

- **📋 Create Snippets**: Add new snippets with a title and code using an intuitive form.
- **🔍 Search Snippets**: Filter snippets by title with a real-time search bar.
- **✏️ Edit Snippets**: Modify existing snippets seamlessly in edit mode.
- **🗑️ Delete Snippets**: Remove snippets with a single click.
- **👀 View Snippets**: Display snippets in a clean, read-only modal.
- **📎 Copy to Clipboard**: Copy snippet code for easy reuse.
- **🚨 Input Validation**: Prevent empty or invalid submissions with clear error messages.
- **🔔 Toast Notifications**: Provide feedback for actions (e.g., success, error) using `react-toastify`.
- **📱 Responsive Design**: Ensure a consistent experience on mobile, tablet, and desktop.
- **🎨 Modern UI**: Enjoy a dark-themed, developer-friendly interface with Tailwind CSS and smooth animations.
- **🔄 Real-Time Updates**: Reflect changes instantly in the snippet list after actions.

---

## 🛠️ Technologies Used

The front-end is built with a modern tech stack, chosen for learning and industry relevance:

- **React (v18)**: Component-based library for dynamic UIs.
- **Tailwind CSS (v3)**: Utility-first CSS framework for rapid, responsive styling.
- **React Icons**: Lightweight icons for intuitive UI elements.
- **React Toastify**: Elegant toast notifications for user feedback.
- **Axios**: Promise-based HTTP client for API requests.
- **Vite**: Fast build tool for React development.
- **Git & GitHub**: Version control and collaboration.
- **VS Code**: Code editor with React and Tailwind extensions.

---

## 📂 Project Structure

The project is organized into modular folders to enhance maintainability and scalability:



- **components/**: Contains stateless, reusable UI components for specific interface parts (form, list, modal, empty state).
- **pages/**: Holds the `CodePaste` component, the main view managing state and API interactions.
- **App.jsx**: Renders the `CodePaste` page and includes the `ToastContainer`.
- **index.css**: Defines Tailwind CSS directives and custom animations (e.g., `animate-fade-in` for modals).

---

## 🚀 Getting Started

Follow these steps to set up and run the front-end locally.

### Prerequisites
- **Node.js (v16 or higher)**: Install from [nodejs.org](https://nodejs.org/).
- **npm**: Included with Node.js, or use `yarn` if preferred.
- **Git**: For cloning the repository.
- **API Server**: A back-end API at `http://localhost:5000` with endpoints:
  - `GET /api/code`: Returns all snippets.
  - `POST /api/snippet`: Creates a new snippet.
  - `PUT /api/snippet/:id`: Updates a snippet.
  - `DELETE /api/snippet/:id`: Deletes a snippet.

### Installation
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Prashant-Kumar001/Todo-list-frontend

## 📸 Screenshots

![Snippet Form](docs/form.png)
![Snippet List](docs/list.png)
![Modal](docs/modal.png)


## 🌐 Live Demo

Visit [https://your-app.vercel.app](https://your-app.vercel.app).



[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18-blue)](https://reactjs.org/)