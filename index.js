const debug = require('debug')('order:server');
const app = require('./app');
const { PORT } = require('./config');

const startServer = async () => {
    app.listen(PORT, () => {
        debug(`Server listening on port ${PORT}`);
    }).on('error', (err) => {
        debug(err);
        // eslint-disable-next-line no-undef
        process.exit();
    })
}

startServer();