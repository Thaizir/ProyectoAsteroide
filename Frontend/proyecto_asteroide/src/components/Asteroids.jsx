import { React, useEffect, useState } from "react";

export const Asteroids = ({ startDate, endDate }) => {

    const [asteroids, setAsteroids] = useState([]);
    const [isPending, setIsPending] = useState(true);

    const [selectedAsteroid, setSelectedAsteroid] = useState(null);


    const handleAsteroidClick = (asteroid) => {
        setSelectedAsteroid(asteroid);
    };

    const fetchAsteroids = async (value_1, value_2) => {
        try {
            let response;
            if (value_1 === value_2) {
                response = await fetch(`http://localhost:3000/?date=${startDate}`);
                console.log(response.json())
            } else {
                response = await fetch(`http://localhost:3000/range?start_date=${startDate}&end_date=${endDate}`);
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {

        fetchAsteroids(startDate, endDate)
            .then(response => response.json())
            .then(data => console.log(data))
            .then(asteroid => setAsteroids(asteroid))
            .then(() => setIsPending(false))
            .catch(err => console.log(err));
    }, [startDate, endDate]);

    console.log(asteroids);

    return (
        <>

            {isPending && <p>Loading...</p>}
            {
                asteroids.map(ast => (
                    <div key={asteroid.name}>
                        <button onClick={() => handleAsteroidClick(ast)}>Name: {ast.name}</button>
                        {selectedAsteroid === ast && (
                            <div>
                                <p>{ast.hazardous ? "Hazardous" : "Not Hazardous"}</p>
                                <p>Min diameter: {ast.diameter.estimated_diameter_min}</p>
                                <p>Max diameter: {ast.diameter.estimated_diameter_max}</p>
                            </div>
                        )}
                    </div>
                ))
            }

        </>
    )
};
