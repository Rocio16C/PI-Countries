const { Activity } = require('../db')

const createActivities = async (name, difficulty, duration, season, countries) => {
    const newActivity = await Activity.create({name, difficulty, duration, season})
    await newActivity.addCountry(countries)
    return newActivity;
};

const getActivities = async () => {
    const allActivities = await Activity.findAll()
    return allActivities
};


module.exports = {
    getActivities,
    createActivities,
}