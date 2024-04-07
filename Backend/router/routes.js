const express = require('express');

const { differenceInDays, getApiInfoByDate, getApiInfoByDates, asteroidsNames, asteroidsDiameter, asteroidsHazardous, asteroidsInfo, sortAsteroids } = require('../handler/handlerApi');


const router = express.Router();

// La api de la nasa solo guarda 7 dias de datos


router.get('/', async (req, res) => {

    try {

        let result = await getApiInfoByDate(req.query.date);
        const [names, diameter, hazardous] = await Promise.all([
            asteroidsNames(result),
            asteroidsDiameter(result),
            asteroidsHazardous(result)
        ]);

        let data = [names, diameter, hazardous];
        let unOrderedInfo = asteroidsInfo(data)
        let orderedInfo = sortAsteroids(unOrderedInfo)

        res.send(orderedInfo)
    } catch (err) {
        console.log(err);
    }
})


router.get('/range', async (req, res) => {
    try {
        let result = await getApiInfoByDates(req.query.start_date, req.query.end_date);

        const [names, diameter, hazardous] = await Promise.all([
            asteroidsNames(result),
            asteroidsDiameter(result),
            asteroidsHazardous(result)
        ]);

        let data = [names, diameter, hazardous];
        let unOrderedInfo = asteroidsInfo(data)
        let orderedInfo = sortAsteroids(unOrderedInfo)
        res.send(orderedInfo)
    } catch (err) {
        console.log(err);
    }
})



module.exports = router