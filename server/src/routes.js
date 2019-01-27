const AuthenticationController = require('./controllers/AuthenticationController');
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy');

module.exports = (app) => {
  app.get('/status', (req, res) => {
    res.send({
      message: 'hello there from DOTA 2 drafter! server is online!',
    });
  });

  app.post('/register',
    AuthenticationControllerPolicy.register,
    AuthenticationController.register);
};
