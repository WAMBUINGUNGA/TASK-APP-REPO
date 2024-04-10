let blogPosts = [
    { id: 1, title: "First Blog Post", content: "This is the content of the first blog post." },
    { id: 2, title: "Second Blog Post", content: "This is the content of the second blog post." }
];

// Function to display blog posts in the HTML
const displayBlogPosts = () => {
    const blogPostsContainer = document.getElementById("blogPostsContainer");
    blogPostsContainer.innerHTML = ""; // Clear existing content
    blogPosts.forEach(post => {
        const postElement = document.createElement("div");
        postElement.innerHTML = `
            <h2>${post.title}</h2>
            <p>${post.content}</p>
            <button onclick="deleteBlogPost(${post.id})">Delete</button>
            <button onclick="editBlogPost(${post.id})">Edit</button>
        `;
        blogPostsContainer.appendChild(postElement);
    });
};

// Function to add a new blog post
const addBlogPost = (title, content) => {
    const id = blogPosts.length + 1;
    const newPost = { id, title, content };
    blogPosts.push(newPost);
    displayBlogPosts();
};

// Function to delete a blog post
const deleteBlogPost = (id) => {
    blogPosts = blogPosts.filter(post => post.id !== id);
    displayBlogPosts();
};

// Function to edit a blog post
const editBlogPost = (id) => {
    const post = blogPosts.find(post => post.id === id);
    const newTitle = prompt("Enter new title:", post.title);
    const newContent = prompt("Enter new content:", post.content);
    if (newTitle !== null && newContent !== null) {
        post.title = newTitle;
        post.content = newContent;
        displayBlogPosts();
    }
};

// Display initial blog posts
displayBlogPosts();
