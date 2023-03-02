const {Router} = require('express');
const { getCountriesHandler, getCountrieHandler } = require('../handlers/countriesHandlers')

const countriesRouter = Router();

countriesRouter.get('/', getCountriesHandler);

countriesRouter.get('/:idPais', getCountrieHandler);


module.exports = countriesRouter;

