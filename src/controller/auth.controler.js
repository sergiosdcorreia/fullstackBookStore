const { User } = require('../models');
const {
    createError,
    BAD_REQUEST,
    UNAUTHORIZED,
    NOT_FOUND,
    CONFLICT
} = require('../helpers/error.helper');

const postRegister = async (req, res, next) => {
    const props = req.body.user;

    try {
        let user = await User.findOne({ email: props.email });
        if (user) {
            return next(createError({
                status: CONFLICT,
                message: 'Username already exist'
            }));
        };
        user = await User.create(props);
        res.json({
            ok: true,
            message: 'Registration Successful',
            user
        });
    } catch (e) {
        next(e)
    };
};

const postLogin = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(createError({
            status: BAD_REQUEST,
            message: 'email and password required field'
        }));
    };

    try {
        const user = await User.verify(email.trim(), password);
        if (!user) {
            return next(createError({
                status: NOT_FOUND,
                message: 'User Not Found'
            }));
        };
        return res.json({
            ok: true,
            message: 'Login Successful',
            token: user.token
        });
    } catch (e) {
        return next(createError({
            status: UNAUTHORIZED,
            message: e
        }));
    };
};

module.exports = {
    postRegister,
    postLogin
}
