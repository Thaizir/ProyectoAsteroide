const express = require('express');

const { differenceInDays, getApiInfoByDate, getApiInfoByDates, asteroidsNames, asteroidsDiameter, asteroidsHazardous, asteroidsInfo, sortAsteroids, dataToDomain } = require('../handler/handlerApi');


const router = express.Router();

router.get('/', async (req, res) => {
    try {
        let result = await getApiInfoByDate(req.query.date);
        const unOrderedInfo = await dataToDomain(result);
        let orderedInfo = sortAsteroids(unOrderedInfo)
        res.send(orderedInfo);
    } catch (err) {
        console.log(err);
        res.status(500).send({ error: 'An internal server error occurred.' });
    }
})

router.get('/range', async (req, res) => {

    try {
        let result = await getApiInfoByDates(req.query.start_date, req.query.end_date);
        const unOrderedInfo = await dataToDomain(result);
        let orderedInfo = sortAsteroids(unOrderedInfo)
        res.send(orderedInfo);
    } catch (err) {

        console.log(err);
        res.status(500).send({ error: 'An internal server error occurred.' });
    }
})

module.exports = router