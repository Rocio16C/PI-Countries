const { getActivities, createActivities } = require('../controllers/activitiesControllers.js')

const getActivitiesHandler = async (req, res) => {
    try {
        const activities = await getActivities()
        res.status(200).json(activities)
    } catch (error) {
        res.status(404).send(error.message)
    }
};

const createActivitiesHandler = async (req, res) => {
    const {name, difficulty, duration, season, countries} = req.body;
    try {
        await createActivities(name, difficulty, duration, season, countries);
        res.status(200).send('Activity created successfully')
    } catch (error) {
        res.status(404).send(error.message)
        console.log(error)
    }
};

module.exports = {
    getActivitiesHandler,
    createActivitiesHandler
}