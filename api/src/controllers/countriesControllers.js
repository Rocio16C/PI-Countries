const { Op, Country, Activity } = require('../db');
const axios = require('axios');
const clearApi = require('../helpers/helpers.js')

async function getCountries(){
    const countriesApi = clearApi((await axios.get('https://restcountries.com/v3/all')).data)
    
    const dataBase = await Country.findAll()
    
    if(dataBase.length === 0) {
        await Country.bulkCreate(countriesApi);
        return Country.findAll()
    } else {
        return Country.findAll({
            include: {
                model: Activity,
                through: {
                    attributes: []
                }
            }
        })
    }
    
};

const searchById = async (idPais) => {
    const countriesId = await Country.findByPk(idPais, {
        include: {
            model: Activity,
            through: {
                attributes: []
            }
        }
    })
    return countriesId
};

const searchByName = async (name) => {
    const countriesName = await Country.findAll({
        where: {name: {[Op.iLike]: `%${name}%`}}
    })
    if(countriesName.length) return countriesName
        throw Error ('The country was not found')
};

module.exports = {
    getCountries,
    searchById,
    searchByName,
}