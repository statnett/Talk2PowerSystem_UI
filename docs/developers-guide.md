# Developer's Guide

Welcome to the `Talk2PowerSystem_UI` project!  
This document provides an overview of the development environment, project structure, and important guidelines for working with the codebase.

## Getting started

Below are the initial steps to set up the project:

1. Clone the this repository.
   
   ```bash
   git clone https://github.com/statnett/Talk2PowerSystem_UI.git
   ```

2. Install all dependencies

   ```bash
   npm install
   ```

3. Build projects

   Run the following command to build all project artefacts:

   ```bash
   npm run build 
   ```

4. Starting a development server

   A development server can be run by executing the ``` npm run start ``` command. This will run a simple web server and
   deploy a sample web page with the `talk-2-power-system` artefacts inside.  
   The server supports a watch mode, and a live reload of the web browser.

---

## Questions Configuration File

During the build process, the file located at:

```
src/assets/data/questions.json
```

is automatically copied to the distribution folder:

```
dist/assets/data/questions.json
```

This file contains the list of questions shown in the left-side panel of the application.

### Modifying the Questions

If you need to change the list of questions, you can do so in one of two ways:

1. **During development** – Edit the source file at `src/assets/data/questions.json`, then rebuild the project using `npm run build`.
2. **After deployment** – Edit the file directly in the deployed location (`dist/assets/data/questions.json`) without rebuilding the entire application.

This allows for easy updates to the guide content even post-deployment.

---

## Framework

This project is built using **AngularJS** (version 1.8.3), a structural framework for dynamic web applications.

---

## Project Structure

The source code is organized under the `src/` directory, alongside several key application-level files:

```
scripts
└── generate-project-info.js # Script that generates project-info
src/
├── assets/                  # Static assets like images, fonts, icons, and data files
│   └── data/
│       └── questions.json   # Contains the questions shown in the left-side panel
├── directives/              # Custom AngularJS directives
├── models/                  # Model definitions used for application data
├── services/                # AngularJS services and factories
├── styles/                  # Global CSS/SCSS styles
├── vendor/                  # Manually included third-party libraries
├── views/                   # View-specific templates and controllers
├── layout.html              # Root HTML layout of the application
├── app.js                   # Main AngularJS module declaration and bootstrap logic
├── main.controller.js       # Main controller for managing root-level app state
└── routes.js                # Application routes and lazy-loaded view configuration
```

---

## Routing and View Loading

Views in the application are **lazy-loaded** via AngularJS routing defined in `src/routes.js`.

Each view must be registered with the following structure:

```js
{
    path: '/chat',
    controller: 'chatCtrl',
    template: './views/chat/chat.html',
    lazyModule: './views/chat/chat.controller.js',
}
```

### 📌 Notes:

- `path` defines the route segment (used in the URL).
- `controller` is the AngularJS controller to be used for this view.
- `template` points to the HTML template file.
- `lazyModule` is the controller or module file that will be dynamically loaded when the view is activated.

This lazy-loading mechanism helps improve initial load time and keeps the application modular.

---

## Left Panel Questions

The left-side panel displays context-sensitive questions that are loaded from:

```
src/assets/data/questions.json
```

This file contains a structured list of questions used within the `chat-questions` component. Make sure the format remains consistent when updating the content.

## Project Info Generation
### Overview
The generate-porject-info.js script generates a project-info.js file that contains project metadata, framework and runtime information, and a list of all dependencies.
The output is structured as an object and is imported and used in the application.

### When to Run
The script must be run whenever project dependencies change — for example:
- After installing a new package;
- After updating an existing dependency
- After removing a dependency

Running the script ensures that project-info.js reflects the exact versions used in the project.

### How to Run
```shell
npm run generate-project-info
```
