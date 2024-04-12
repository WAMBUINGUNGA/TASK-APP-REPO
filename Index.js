// Add task function
function addTask(taskText) {
    const task = {
      text: taskText,
      completed: false
    };
    
    return fetch('http://localhost:3000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    })
    .then(response => response.json())
    .then(data => {
      // Add task to the list
      addTaskToList(data);
      return data; // Return the added task
    })
    .catch(error => console.error('Error adding task:', error));
  }
  
  // Function to add task to the task list
  function addTaskToList(task) {
    const taskView = document.querySelector('.taskView');
    const card = document.createElement('div');
    card.classList.add('card', 'border-success', 'mx-3', 'mt-3', 'mb-3');
    card.style.maxWidth = '18rem';
    
    const cardHeader = document.createElement('div');
    cardHeader.classList.add('card-header', 'bg-transparent', 'border-success');
    const checkIcon = document.createElement('i');
    checkIcon.classList.add('fa', 'fa-check-circle', 'mr-2', 'text-success');
    cardHeader.appendChild(checkIcon);
    const timesIcon = document.createElement('i');
    timesIcon.classList.add('fa', 'fa-times-circle', 'mr-2', 'text-danger');
    cardHeader.appendChild(timesIcon);
    card.appendChild(cardHeader);
    
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body', 'text-success');
    const title = document.createElement('h5');
    title.classList.add('card-title');
    title.textContent = task.text;
    cardBody.appendChild(title);
    const description = document.createElement('p');
    description.classList.add('card-text');
    description.textContent = 'Some quick example text to build on the card title and make up the bulk of the card\'s content.';
    cardBody.appendChild(description);
    card.appendChild(cardBody);
    
    const cardFooter = document.createElement('div');
    cardFooter.classList.add('card-footer', 'bg-transparent', 'border-success');
    const trashIcon = document.createElement('i');
    trashIcon.classList.add('fa', 'fa-trash-o', 'mr-2', 'text-danger');
    cardFooter.appendChild(trashIcon);
    const editIcon = document.createElement('i');
    editIcon.classList.add('fa', 'fa-pencil-square-o', 'mr-2', 'text-primary');
    cardFooter.appendChild(editIcon);
    card.appendChild(cardFooter);
    
    taskView.appendChild(card);
  }
  
  // Toggle task completion function
  function toggleTaskCompleted(taskId) {
    const taskCard = document.getElementById(taskId);
    const isCompleted = taskCard.classList.toggle('completed');
    
    return fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ completed: isCompleted })
    })
    .then(response => response.json())
    .then(data => {
      // Update task in the local tasks array if needed
      return data; // Return the updated task
    })
    .catch(error => console.error('Error updating task:', error));
  }
  
  // Filter tasks function
  function filterTasks(filterType) {
    const filterMap = {
      all: '',
      completed: '?completed=true',
      uncompleted: '?completed=false'
    };
  
    return fetch(`http://localhost:3000/tasks${filterMap[filterType]}`)
      .then(response => response.json())
      .then(data => {
        // Clear existing tasks
        const taskView = document.querySelector('.taskView');
        taskView.innerHTML = '';
  
        // Add filtered tasks to the list
        data.forEach(task => {
          addTaskToList(task);
        });
  
        return data;
      })
      .catch(error => console.error('Error fetching tasks:', error));
  }
  