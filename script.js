const todoForm = document.querySelector('.todo-form')
const todoInput = document.querySelector('.todo-input')
const todoList = document.querySelector('.todo-list')
const taskCount = document.querySelector('.task-count')
const clearButton = document.querySelector('.clear-btn')
const filterButtons = document.querySelectorAll('.todo-filters button')
const emptyState = document.querySelector('.empty-state')
const emptyMessage = document.querySelector('.empty-message')
const emptyHint = document.querySelector('.empty-hint')
const progressText = document.querySelector('.progress-text')
const progressFill = document.querySelector('.progress-fill')
const progressBar = document.querySelector('.progress-track')
const themeButton = document.querySelector('.theme-btn')
const toast = document.querySelector('.toast')
const toastMessage = document.querySelector('.toast-message')
const undoButton = document.querySelector('.undo-btn')

let tasks = JSON.parse(localStorage.getItem('tasks')) || []
let currentFilter = 'all'
let deletedTasks = []
let toastTimer

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

function updateTaskCount() {
  const activeTasks = tasks.filter(function (task) {
    return task.completed === false
  })

  if (activeTasks.length === 1) {
    taskCount.textContent = '1 task left'
  } else {
    taskCount.textContent = `${activeTasks.length} tasks left`
  }

  const completedCount = tasks.length - activeTasks.length
  let progress = 0

  if (tasks.length > 0) {
    progress = Math.round(completedCount / tasks.length * 100)
  }

  progressText.textContent = `${completedCount} of ${tasks.length} completed`
  progressFill.style.width = `${progress}%`
  progressBar.setAttribute('aria-valuenow', progress)
  progressBar.setAttribute('aria-valuetext', progressText.textContent)

  clearButton.disabled = completedCount === 0

  if (tasks.length > 0 && completedCount === tasks.length) {
    progressText.textContent = 'All done. Enjoy your free time!'
  }
}

function getFilteredTasks() {
  if (currentFilter === 'active') {
    return tasks.filter(function (task) {
      return task.completed === false
    })
  }

  if (currentFilter === 'completed') {
    return tasks.filter(function (task) {
      return task.completed === true
    })
  }

  return tasks
}

function showUndo(message) {
  clearTimeout(toastTimer)

  toastMessage.textContent = message
  toast.hidden = false

  toastTimer = setTimeout(function () {
    toast.hidden = true
    deletedTasks = []
  }, 8000)
}

function renderTasks() {
  const filteredTasks = getFilteredTasks()

  todoList.innerHTML = ''

  filteredTasks.forEach(function (task) {
    const todoItem = document.createElement('div')
    todoItem.classList.add('todo-item')

    if (task.completed) {
      todoItem.classList.add('completed')
    }

    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.checked = task.completed
    checkbox.setAttribute('aria-label', `Complete task: ${task.text}`)

    const taskSpan = document.createElement('span')
    taskSpan.textContent = task.text

    const deleteButton = document.createElement('button')
    deleteButton.type = 'button'
    deleteButton.classList.add('delete-btn')
    deleteButton.setAttribute('aria-label', `Delete ${task.text}`)

    const deleteIcon = document.createElement('img')
    deleteIcon.src = 'images/trash-icon.svg'
    deleteIcon.alt = ''

    checkbox.addEventListener('change', function () {
      const taskIndex = filteredTasks.indexOf(task)

      task.completed = checkbox.checked

      saveTasks()
      renderTasks()

      const checkboxes = todoList.querySelectorAll('input[type="checkbox"]')
      const nextCheckbox = checkboxes[Math.min(taskIndex, checkboxes.length - 1)]

      if (nextCheckbox) {
        nextCheckbox.focus()
      } else {
        todoInput.focus()
      }
    })

    deleteButton.addEventListener('click', function () {
      const taskIndex = tasks.indexOf(task)

      deletedTasks = [
        { task: task, index: taskIndex }
      ]

      tasks.splice(taskIndex, 1)

      saveTasks()
      renderTasks()
      showUndo('Task deleted')
      undoButton.focus()
    })

    deleteButton.append(deleteIcon)

    todoItem.append(
      checkbox,
      taskSpan,
      deleteButton
    )

    todoList.append(todoItem)
  })

  emptyState.hidden = filteredTasks.length > 0

  if (currentFilter === 'active') {
    emptyMessage.textContent = 'Nothing left to do'
    emptyHint.textContent = 'Take a breath. You are all caught up.'
  } else if (currentFilter === 'completed') {
    emptyMessage.textContent = 'Small steps count'
    emptyHint.textContent = 'Your completed tasks will appear here.'
  } else {
    emptyMessage.textContent = 'A little space for a fresh start'
    emptyHint.textContent = 'Add your first task above. One thing at a time.'
  }

  updateTaskCount()
}

todoForm.addEventListener('submit', function (event) {
  event.preventDefault()

  const taskText = todoInput.value.trim()

  if (taskText === '') {
    return
  }

  const newTask = {
    text: taskText,
    completed: false
  }

  tasks.push(newTask)

  saveTasks()
  renderTasks()

  todoInput.value = ''
  todoInput.focus()
})

clearButton.addEventListener('click', function () {
  deletedTasks = []

  tasks.forEach(function (task, index) {
    if (task.completed) {
      deletedTasks.push({ task: task, index: index })
    }
  })

  if (deletedTasks.length === 0) {
    return
  }

  tasks = tasks.filter(function (task) {
    return task.completed === false
  })

  saveTasks()
  renderTasks()
  showUndo('Completed tasks cleared')
  undoButton.focus()
})

undoButton.addEventListener('click', function () {
  deletedTasks.forEach(function (item) {
    tasks.splice(item.index, 0, item.task)
  })

  clearTimeout(toastTimer)

  deletedTasks = []
  toast.hidden = true

  saveTasks()
  renderTasks()
  todoInput.focus()
})

filterButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    currentFilter = button.dataset.filter

    filterButtons.forEach(function (filterButton) {
      filterButton.classList.remove('active')
      filterButton.setAttribute('aria-pressed', 'false')
    })

    button.classList.add('active')
    button.setAttribute('aria-pressed', 'true')

    renderTasks()
  })
})

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme

  if (theme === 'dark') {
    themeButton.setAttribute('aria-checked', 'true')
    themeButton.title = 'Switch to light theme'
  } else {
    themeButton.setAttribute('aria-checked', 'false')
    themeButton.title = 'Switch to dark theme'
  }
}

themeButton.addEventListener('click', function () {
  let theme = 'dark'

  if (document.documentElement.dataset.theme === 'dark') {
    theme = 'light'
  }

  localStorage.setItem('todo-theme', theme)
  applyTheme(theme)
})

applyTheme(localStorage.getItem('todo-theme') || 'light')
renderTasks()
