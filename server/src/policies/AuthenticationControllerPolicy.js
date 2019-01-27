const Joi = require('joi');

module.exports = {
  register(req, res, next) {
    const schema = {
      email: Joi.string().email(),
      password: Joi.string().regex(
        new RegExp('^[a-zA-Z0-9]{7,30}$'),
      ),
      username: Joi.string().regex(
        new RegExp('^[a-zA-Z0-9]{4,15}$'),
      ),
    };

    const { error, value } = Joi.validate(req.body, schema);

    if (error) {
      switch (error.details[0].context.key) {
        case 'email':
          res.status(400).send({
            error: 'Please provide a valid email address',
          });
          break;
        case 'password':
          res.status(400).send({
            error: 'Password must be 7 to 30 alphanumeric characters.',
          });
          break;
        case 'username':
          res.status(400).send({
            error: 'Username must be 4 to 15 alphanumeric characters.',
          });
          break;
        default:
          res.status(400).send({
            error: 'Invalid Registration Information',
          });
      }
    } else {
      next();
    }
  },
};
