const app = require('./app');

const port = process.env.port || 9000;
app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
