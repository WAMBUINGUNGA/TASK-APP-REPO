const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./database.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);

// Define a custom route handler to redirect from root path to /tasks
server.get('/', (req, res) => {
  res.redirect('/tasks');
});

server.use(router);

server.listen(5000, () => {
  console.log('JSON Server is running');
});
