let blogPosts = [];
let likeCount = 4; // Initial count
const url = "http://localhost:3000/blogPosts";

// Function to display blog posts in the HTML
const displayBlogPosts = () => {
  const blogPostsContainer = document.getElementById("blogPostsContainer");
  blogPostsContainer.innerHTML = ""; // Clear existing content
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      blogPosts = data;
      blogPosts.forEach((post) => {
        const postElement = document.createElement("div");
        postElement.innerHTML = `
            <h2>${post.title}</h2>
            <p>${post.content}</p>
            <p>Author: ${post.author}</p>
            <button onclick="deleteBlogPost(${post.id})">Delete</button>
            <button onclick="editBlogPost(${post.id})">Edit</button>
        `;
        blogPostsContainer.appendChild(postElement);
      });
    })
    .catch(error => console.error("Error fetching blog posts:", error));
};

// Function to add a new blog post
const addBlogPost = (title, content, author) => {
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title, content, author })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to add blog post');
    }
    return response.json();
  })
  .then(() => {
    displayBlogPosts();
  })
  .catch(error => console.error("Error adding blog post:", error));
};

// Function to delete a blog post
const deleteBlogPost = (id) => {
  fetch(`${url}/${id}`, {
    method: 'DELETE'
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to delete blog post');
    }
    return response.json();
  })
  .then(() => {
    displayBlogPosts();
  })
  .catch(error => console.error("Error deleting blog post:", error));
};

// Function to edit a blog post
const editBlogPost = (id) => {
  const post = blogPosts.find((post) => post.id === id);
  const newTitle = prompt("Enter new title:", post.title);
  const newContent = prompt("Enter new content:", post.content);
  const newAuthor = prompt("Enter new author:", post.author);
  if (newTitle !== null && newContent !== null && newAuthor !== null) {
    fetch(`${url}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title: newTitle, content: newContent, author: newAuthor })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to edit blog post');
      }
      return response.json();
    })
    .then(() => {
      displayBlogPosts();
    })
    .catch(error => console.error("Error editing blog post:", error));
  }
};

// Display initial blog posts
displayBlogPosts();

const handleLikeButton = () => {
  likeCount++;
  document.getElementById("like-count").textContent = `${likeCount} likes`;
};

const likeButton = document.getElementById("like-button");
likeButton.addEventListener("click", handleLikeButton);
