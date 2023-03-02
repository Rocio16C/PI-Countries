
const validation = (req, res, next) => {
    const {name, difficulty, season, countries} = req.body
    if(!name) return res.send('Name missing')
    if(!difficulty) return res.send('Difficulty missing')
    if(!season) return res.send('Season missing: Summer, Autumn, Winter, Spring')
    if(!countries) return res.send('Country missing')

    next();
};

module.exports = validation