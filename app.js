// DOM Selectors
const body = document.querySelector('body');
const form = document.getElementById('form');
const input = document.getElementById('input');
const tasksUL = document.getElementById('tasks');
const taskLI = document.querySelectorAll('li')
const tasks = JSON.parse(localStorage.getItem('tasks'));
const taskLight = document.querySelector('.tasks-light')
const switchBtn = document.getElementById('switch');
const modeText = document.getElementById('mode-text');
const root = document.querySelector(':root');




if(tasks) {
  tasks.forEach(task => addTask(task))
}

form.addEventListener('submit', (e) => {
  e.preventDefault()

  addTask()
});

// Add Task
function addTask(task) {
  let taskText = input.value;

  if (task) {
    taskText = task.text;
  }

  if(taskText) {
    const taskEl = document.createElement('li')
    taskEl.classList.add('taskItem')

    if(task && task.completed) {
      taskEl.classList.add('completed')
    }

    // taskEl.innerText = taskText
    taskEl.innerHTML = `${taskText}<i id="del-icon"class="fa-solid fa-xmark"></i>`;

    taskEl.addEventListener('click', () => {
      taskEl.classList.toggle('completed')
    
      updateLS()
    })

    taskEl.addEventListener('contextmenu', (e) => {
      e.preventDefault()

      taskEl.remove()

      updateLS()
    })

    tasksUL.appendChild(taskEl)

    input.value = ''

    updateLS()
  }

  const delIcon = document.getElementById('del-icon');
  delIcon.addEventListener('click', (e) => {
    if(e.target && e.target.id== 'del-icon'){
      console.log('called')
      delIcon.parentElement.remove()
    
      updateLS()

    }
  })



}

// Update Local Storage
function updateLS() {
  const taskEl = document.querySelectorAll('li')

  const tasks = []

  taskEl.forEach(taskEl => {
    tasks.push({
      text: taskEl.innerText,
      completed: taskEl.classList.contains('completed')
    })
  })

  localStorage.setItem('tasks', JSON.stringify(tasks))
}

// Change theme 
switchBtn.addEventListener('change', () => {
  toggleRootClass()
})

function toggleRootClass() {
  document.querySelector(':root').classList.toggle('dark')
}



