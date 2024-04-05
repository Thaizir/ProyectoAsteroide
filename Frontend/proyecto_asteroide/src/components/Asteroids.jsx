import { React, useEffect, useState } from "react";

export const Asteroids = ({ startDate, endDate }) => {

    console.log(startDate, endDate)
    const [asteroids, setAsteroids] = useState([]);
    const [selectedAsteroid, setSelectedAsteroid] = useState(null);

    useEffect(() => {

        if (startDate === endDate) {
            fetch(`http://localhost:3000/?date=${startDate}`)
                .then(response => response.json())
                .then(data => setAsteroids(data))
                .catch(err => console.log(err))

        } else {

            fetch(`http://localhost:3000/range?start_date=${startDate}&end_date=${endDate}`)
                .then(response => response.json())
                .then(data => setAsteroids(data))
                .catch(err => console.log(err))

        }

    }, [startDate, endDate])

    const handleAsteroidClick = (asteroid) => {
        setSelectedAsteroid(asteroid);
    };

    console.log(asteroids)
    return (
        <>
            {asteroids.map((asteroid, index) => (

                <div key={asteroid.name}>
                    <div className="asteroid">
                        <button onClick={() => handleAsteroidClick(asteroid)}>Name: {asteroid.name}</button>
                        {selectedAsteroid === asteroid && (
                            <div>
                                <p>{asteroid.hazardous ? "Hazardous" : "Not Hazardous"}</p>
                                <p>Min diameter: {asteroid.diameter.estimated_diameter_min}</p>
                                <p>Max diameter: {asteroid.diameter.estimated_diameter_max}</p>
                            </div>
                        )}
                    </div>
                </div>
            ))
            }

        </>
    )
};
