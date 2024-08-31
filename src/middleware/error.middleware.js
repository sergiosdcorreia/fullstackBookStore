/* eslint-disable no-unused-vars */
const {
    BAD_REQUEST,
    CONFLICT,
    FORBIDDEN,
    GENERAL_ERROR,
    NOT_FOUND,
    UNAUTHORIZED,
    UNPROCESSABLE
} = require('../helpers/error.helper');

const unauthorized = (err, req, res, next) => {
    if (err.status !== UNAUTHORIZED) return next(err);

    res.status(UNAUTHORIZED).send({
        ok: false,
        message: err.message || 'Unauthorized',
        errors: [err]
    });
};

const forbidden = (err, req, res, next) => {
    if (err.status !== FORBIDDEN) return next(err);

    res.status(FORBIDDEN).send({
        ok: false,
        message: err.message || 'Forbidden',
        errors: [err]
    });
};

const conflict = (err, req, res, next) => {
    if (err.status !== CONFLICT) return next(err);

    res.status(CONFLICT).send({
        ok: false,
        message: err.message || 'Conflict',
        errors: [err]
    });
};

const badRequest = (err, req, res, next) => {
    if (err.status !== BAD_REQUEST) return next(err);

    res.status(BAD_REQUEST).send({
        ok: false,
        message: err.message || 'Bad Request',
        errors: [err]
    });
};

const unprocessable = (err, req, res, next) => {
    if (err.status !== UNPROCESSABLE) return next(err);

    res.status(UNPROCESSABLE).send({
        ok: false,
        message: err.message || 'Unprocessable Entity',
        errors: [err]
    });
};

const notFound = (err, req, res, next) => {
    if (err.status !== NOT_FOUND) return next(err);

    res.status(NOT_FOUND).send({
        ok: false,
        message: err.message || 'The requested resource could not be found',
    });
};

const genericError = (err, req, res, next) => {
    if (err.status !== GENERAL_ERROR) return next(err);

    res.status(GENERAL_ERROR).send({
        ok: false,
        message: err.message || 'Internal Server Error',
        errors: [err]
    });
};

const catchAll = (err, req, res, next) => {
    res.status(NOT_FOUND).send({
        ok: false,
        message: err.message || 'The requested resource could not be found',
    });
};

const exportable = {
    unauthorized,
    forbidden,
    conflict,
    badRequest,
    unprocessable,
    notFound,
    genericError,
    catchAll
};

// All exportable stored as an array so that we can include in express middleware by app.use()
const all = Object.keys(exportable).map((key) => exportable[key]);

module.exports = {
    ...exportable,
    all,
};