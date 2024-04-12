document.addEventListener('DOMContentLoaded', function () {
  
    // Fetch Tasks
    fetch("http://localhost:3000/tasks")
      .then((data) => data.json())
      .then((posts) => {
        displayPosts(posts);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        alert("Failed to fetch posts");
      });
  
    let cardsContainer = document.querySelector(".cardsContainer");
  
    function displayPosts(posts) {
      let tasks = '';
      posts.forEach((post) => {
        cardsContainer.innerHTML += `
          <div class="card">
            <div class="card-header d-flex justify-content-between">
            <div class=vital>
              <i onclick="deletePost(${post.id})" class="fa fa-trash-o" style="color: red;"></i>
              <i onclick="editPost(${post.id})" style="color: blue;" class="fa fa-pencil-square-o" data-bs-toggle="modal" data-bs-target="#editModal" aria-hidden="true"></i>
            </div>
            
            
            <i onclick="completeTask('${post.description}')" class="fa fa-check" aria-hidden="true" style="color: green;"></i>
  
  
            </div>
            <div class="card-body mx-4">
              <h5 class="card-title">${post.title}</h5>
              <p class="card-text">${post.description}</p>
            </div>
          </div>
          <br>`;
      });
    }
  
  
    // Add post
    document.getElementById("addPostForm").addEventListener('submit', (e) => {
      e.preventDefault();
    
      const titleValue = document.querySelector('#title').value;
      const descriptionValue = document.querySelector('#description').value;
    
      // Fetch the last ID from the server
      fetch("http://localhost:3000/tasks")
        .then(response => response.json())
        .then(data => {
          // Get the last ID
          const lastId = data[data.length - 1].id;
          // Increment the last ID by one
          const newId = lastId + 1;
    
          // Post the new task with the new ID
          fetch("http://localhost:3000/tasks", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: newId, title: titleValue, description: descriptionValue })
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              alert("Task added successfully");
            })
            .catch((error) => {
              console.error("Error:", error);
              alert("Failed to add task");
            });
        })
        .catch(error => {
          console.error("Error fetching last ID:", error);
          alert("Failed to add task");
        });
    });
    
  
  
  });
  
  
  function completeTask(title) {
    const completeTasks = document.querySelector('.complete');
    completeTasks.innerHTML += `<p>${title}</p>`;
  }
    // Edit post
    function editPost(id) {
      fetch(`http://localhost:3000/tasks/${id}`)
        .then((data) => data.json())
        .then((post) => {
          const update_container = document.getElementById("update_container");
  
          update_container.innerHTML = `
            <div class="Form" id="update_container">
              <div class="mb-3">
                <label for="title_update" class="form-label">Task Title</label>
                <input type="title" class="form-control" value="${post.title}" id="title_update" placeholder="title">
              </div>
              <div class="mb-3">
                <label for="description_update" class="form-label">Description</label>
                <textarea class="form-control" id="description_update" rows="3">${post.description}</textarea>
              </div>
            </div>
  
            <button onClick="update_post(${id})" type="submit" class="bg-primary">Submit</button>`;
        });
    }
  
    // Update
    function update_post(id) {
      const title = document.getElementById("title_update").value;
      const description = document.getElementById("description_update").value;
  
      fetch(`http://localhost:3000/tasks/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title, description: description }),
      })
        .then((data) => data.json())
        .then((response) => {
          alert("Task updated successfully");
        });
    }
  
    // Delete function
    function deletePost(id) {
      fetch(`http://localhost:3000/tasks/${id}`, {
        method: "DELETE",
      })
        .then((data) => data.json())
        .then((posts) => {
          displayPosts(posts);
        });
    }
  