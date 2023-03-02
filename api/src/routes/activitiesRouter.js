const {Router} = require('express');
const { getActivitiesHandler, createActivitiesHandler } = require('../handlers/activitiesHandlers.js')
const validation = require('../middlewares/middlewares.js')

const activitiesRouter = Router();

activitiesRouter.get('/', getActivitiesHandler);

activitiesRouter.post('/', validation, createActivitiesHandler);

module.exports = activitiesRouter;