
async function getApiInfoByDate(date) {


    let allAsteroids = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${date}&end_date=${date}&api_key=DEMO_KEY`)
        .then(res => res.json())
        .then(data => data.near_earth_objects);
    return allAsteroids;
}

function differenceInDays(date1, date2) {
    let startDate = new Date(date1);
    let endDate = new Date(date2)
    const msInDay = 1000 * 60 * 60 * 24;
    let diffInDays = Math.abs((startDate - endDate) / msInDay);
    return diffInDays;
}

async function getApiInfoByDates(date1, date2) {

    let diffDays = differenceInDays(date1, date2);
    if (diffDays <= 7) {

        let allAsteroids = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${date1}&end_date=${date2}&api_key=DEMO_KEY`)
            .then(res => res.json())
            .then(data => data.near_earth_objects);
        return allAsteroids;
    } else {
        throw new Error('Date range exceeds 7 days')
    }

}

function asteroidsNames(allAsteroids) {


    //   const newEarthObjects = Object.keys(allAsteroids);
    const values = Object.values(allAsteroids);

    let names = [];
    let estimatedDiameter = [];
    let isHazardous = [];
    for (let i = 0; i < values.length; i++) {
        for (let j = 0; j < values[i].length; j++) {
            names.push(values[i][j].name)
        }
    }
    return names;
}

function asteroidsDiameter(allAsteroids) {

    //   const newEarthObjects = Object.keys(allAsteroids);
    const values = Object.values(allAsteroids);


    let estimatedDiameter = [];
    for (let i = 0; i < values.length; i++) {
        for (let j = 0; j < values[i].length; j++) {
            estimatedDiameter.push(values[i][j].estimated_diameter.kilometers)
        }
    }
    return estimatedDiameter;
}

function asteroidsHazardous(allAsteroids) {

    //   const newEarthObjects = Object.keys(allAsteroids);
    const values = Object.values(allAsteroids);

    let isHazardous = [];
    for (let i = 0; i < values.length; i++) {
        for (let j = 0; j < values[i].length; j++) {
            isHazardous.push(values[i][j].is_potentially_hazardous_asteroid)
        }
    }
    return isHazardous;
}

// funcion mas generar para traer info 
// TODO: VER COMO APLICARLA

// function asteroidsInfo(allAsteroids, info) {
//     //   const newEarthObjects = Object.keys(allAsteroids);
//     console.log(typeof info);

//     const values = Object.values(allAsteroids);

//     let infoRequested = [];
//     for (let i = 0; i < values.length; i++) {
//         for (let j = 0; j < values[i].length; j++) {
//             infoRequested.push(values[i][j].info)
//         }
//     }
//     return infoRequested;
// }

function asteroidsInfo(data) {

    const allInfo = [];
    for (let i = 0; i < data[0].length; i++) {
        allInfo.push({
            name: data[0][i],
            diameter: data[1][i],
            hazardous: data[2][i]
        });
    }
    return allInfo;
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


module.exports = { differenceInDays, getApiInfoByDate, getApiInfoByDates, asteroidsNames, asteroidsDiameter, asteroidsHazardous, asteroidsInfo, sortAsteroids }
