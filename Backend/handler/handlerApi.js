const Asteroid = require("../models/asteroid");


async function getApiInfoByDate(date) {
    let allAsteroids = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${date}&end_date=${date}&api_key=DEMO_KEY`)
        .then(res => res.json())
        .then(data => data.near_earth_objects);
    return allAsteroids;
}

function differenceInDays(date1, date2) {
    let startDate = new Date(date1);
    let endDate = new Date(date2)

    if (startDate > endDate) {
        throw new Error('Las fechas inicial no puede ser mayor a la final');
    } else {
        const msInDay = 1000 * 60 * 60 * 24;
        let diffInDays = Math.abs((startDate - endDate) / msInDay);
        return diffInDays;
    }
}

async function getApiInfoByDates(date1, date2) {

    let diffDays = differenceInDays(date1, date2);
    if (diffDays <= 7) {

        let allAsteroids = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${date1}&end_date=${date2}&api_key=DEMO_KEY`)
            .then(res => res.json())
            .then(data => data.near_earth_objects);
        return allAsteroids;
    } else {
        console.log('Error');
        throw new Error('Date range cannot be greater than 7 days');
    }

}

function dataToDomain(allAsteroids) {
    const values = Object.values(allAsteroids);
    const asteroids = [];

    for (let i = 0; i < values.length; i++) {
        for (let j = 0; j < values[i].length; j++) {
            const asteroid = new Asteroid(
                values[i][j].name,
                values[i][j].estimated_diameter.kilometers,
                values[i][j].is_potentially_hazardous_asteroid);
            asteroids.push(asteroid);
        }
    }
    return asteroids;
}


function sortAsteroids(unOrderedInfo) {
    orderedInfo = unOrderedInfo.sort((a, b) => {
        if (a.name < b.name) {
            return -1;
        }
        if (a.name > b.name) {
            return 1;
        }
        return 0
    })
    return orderedInfo;
}

module.exports = { differenceInDays, getApiInfoByDate, getApiInfoByDates, sortAsteroids, dataToDomain }
