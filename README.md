<div align="center">

<img src="images/todo-logo.svg" alt="Todo App logo" width="100">

# Todo App

**Stay organized, one task at a time.**

A small to-do app with light and dark themes, progress tracking, and a little room for a fresh start.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=222222)
![No dependencies](https://img.shields.io/badge/Dependencies-None-3B82F6?style=flat-square)

</div>

## About

Todo App is a practice project built with HTML, CSS, and vanilla JavaScript. It combines a soft blue interface with everyday task management, while keeping the code simple and readable.

There are no frameworks, package installations, or build steps.

## Features

| Feature | What it does |
| --- | --- |
| Task management | Add tasks, mark them complete, or delete them individually. |
| Filters | Switch between **All**, **Active**, and **Completed** without losing the selected filter when the list changes. |
| Progress | See how many tasks are left and track completion with a progress bar. |
| Dark mode | Use a labeled sun-and-moon switch; your choice is remembered. |
| Undo | Restore the most recent deletion or bulk clear within eight seconds. |
| Browser storage | Keep tasks and their completion status after refreshing the page. |
| Responsive layout | Use the app on desktop or smaller screens. |

The interface also includes empty-state messages, keyboard focus indicators, accessible control labels, and reduced-motion support.

## Run Locally

1. Download the repository as a ZIP and extract it, or clone it:
   ```bash
   git clone https://github.com/Hutnikevich/todo-app.git
   cd todo-app
   ```
2. Open `index.html` in a modern browser.
3. Add your first task.

For local development, you can also open the folder in Visual Studio Code and use **Live Server**. Keep the `images` folder beside the HTML, CSS, and JavaScript files.

## Using the App

- **Add a task:** type in the input and press **Enter** or click **Add Task**. Blank input is ignored.
- **Complete a task:** select its checkbox; clear the checkbox to make it active again.
- **Filter the list:** choose **All**, **Active**, or **Completed**.
- **Delete tasks:** use a task's trash button or **Clear completed**.
- **Restore a deletion:** click **Undo** in the notification within eight seconds.
- **Change themes:** turn **Dark mode** on or off using the switch in the top-right corner.

The app starts with an empty list. The counter and progress bar always reflect the entire list, including tasks hidden by a filter.

Undo applies only to the latest deletion or bulk clear. Its history expires after eight seconds and is not kept after a page reload.

## Project Structure

```text
todo-app/
|-- images/          # SVG logo, theme icons, and illustrations
|-- index.html       # Page structure and accessible controls
|-- style.css        # Layout, themes, and responsive styles
|-- script.js        # Task management, rendering, and browser storage
|-- .gitattributes   # Consistent text line endings
|-- .gitignore       # Local files excluded from Git
`-- README.md        # Project documentation
```

## Data and Storage

Each task contains two properties:

```javascript
{
  text: 'Read a chapter',
  completed: false
}
```

The app uses `localStorage` with these keys:

| Key | Stored data |
| --- | --- |
| `tasks` | Task text and completion status |
| `todo-theme` | The selected light or dark theme |

Data stays in the current browser. There is no backend, account system, or device synchronization. Clearing browser data removes saved tasks.

Use the same browser and address to return to your saved list. Storage behavior for directly opened HTML files can vary between browsers; a local server gives a consistent address during development.

## What I Practiced

- Creating and updating DOM elements.
- Handling form submissions, clicks, and checkbox changes.
- Working with arrays using `filter`, `forEach`, and `splice`.
- Separating task data from the displayed list.
- Saving and loading JSON with `localStorage`.
- Building light and dark themes with CSS.
- Adding a timed undo action.

---

Built as part of my JavaScript learning journey.
