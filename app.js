const express = require('express');

const app = express();

app.use(require('./src/middleware/error_middleware').all);

module.exports = app;