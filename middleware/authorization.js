const jwtt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors');

module.exports.authorization =
    (allowedRoles = []) =>
    async (req, _res, next) => {
        try {
            //check header
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith('Bearer')) {
                throw new UnauthenticatedError('Authentication invalid');
            }
            const token = authHeader.split(' ')[1];
            const decoded = await jwtt.verify(token, process.env.JWT_SECRET);
            if (allowedRoles.includes(decoded.role)) {
                req.user = decoded;
                next();
            } else {
                throw new UnauthenticatedError('Access denied');
            }
        } catch (error) {
            next(error);
        }
    };
