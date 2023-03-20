# TodoList App

This is a simple todo list application built with React and Ruby/Sinatra/ActiveRecord. The frontend was built with React and Semantic UI React, while the backend was built with Ruby, Sinatra, and ActiveRecord.

## Prerequisites
To run this application, you will need to have the following installed on your system:

Node.js
Ruby
PostgreSQL

## Installation

### Frontend

Clone the repository to your local machine.
Navigate to the frontend directory.
Run npm install to install the dependencies.
Run npm start to start the development server.

### Backend

The backend directory for this project can be found here: ([Backend](https://github.com/foghill/phase3backendproject)).

Navigate to the backend directory.
Run bundle install to install the dependencies.
Set up the database by running rake db:create and rake db:migrate.
Run ruby app.rb to start the server.

## Usage

Once you have the application running, you can access it in your web browser at http://localhost:3000.

You can add a new task by typing in the input field at the bottom of the page and selecting a category from the dropdown. Once you've entered a task and selected a category, click the "Add" button to add it to the list.

To edit a task, click the "Edit" button next to it. This will enable you to change the task title and category. Once you've made your changes, click the "Save" button to save them, or click the "Cancel" button to discard them.

To delete a task, click the "Delete" button next to it.

## API Endpoints

The following API endpoints are available:

### Todos

* GET /todos: Returns a list of all todos.
* POST /todos: Creates a new todo.
* PUT /todos/:id: Updates a todo with the specified ID.
* DELETE /todos/:id: Deletes a todo with the specified ID.

### Categories

* GET /categories: Returns a list of all categories.
* POST /categories: Creates a new category.
* PUT /categories/:id: Updates a category with the specified ID.
* DELETE /categories/:id: Deletes a category with the specified ID.
