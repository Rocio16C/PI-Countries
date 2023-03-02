const { getCountries, searchById, searchByName } = require('../controllers/countriesControllers.js')


const getCountriesHandler = async (req, res) => {
    const {name} = req.query;
    try {
        const countries = name ? await searchByName(name) : await getCountries()
        res.status(200).json(countries)
    } catch (error) {
        res.status(404).send(error.message)
    }
};

const getCountrieHandler = async (req, res) => {
    const {idPais} = req.params;
    try {
        const countryById = await searchById(idPais)
        res.status(200).json(countryById)
    } catch (error) {
        res.status(404).send(error.message)
    }
};



module.exports = {
    getCountriesHandler,
    getCountrieHandler
}