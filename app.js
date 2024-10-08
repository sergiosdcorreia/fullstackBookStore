const express = require('express');

const app = express();

app.use(express.json);
app.use('/', require('./src/routes/auth.route'));
app.use(require('./src/middleware/error.middleware').all);

module.exports = app;