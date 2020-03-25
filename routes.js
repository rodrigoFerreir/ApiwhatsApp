const { Router } = require('express')
const routes = Router();
const Methods = require('./methods')

  routes.get('/teste', Methods.test);

  routes.get('/', Methods.openPage);

  routes.post('/teste', Methods.sendMessage);

  routes.get('/message', Methods.getMessages)

module.exports = routes