function clearApi (arr){
    const attributes = arr.map(e => {
        return {
            id: e.cca3,
            name: e.name.common,
            flag_image: e.flags[1],
            continent: e.continents[0],
            capital: e.capital ? e.capital[0] : '',
            subregion: e.subregion,
            area: e.area,
            population: e.population
        }
    })
    return attributes
};

module.exports = clearApi;