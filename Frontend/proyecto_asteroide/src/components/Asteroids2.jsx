import { React, useEffect, useState } from "react";

export const Asteroids = ({ startDate, endDate }) => {

    console.log(startDate, endDate)
    const [asteroids, setAsteroids] = useState([]);
    const [isPending, setIsPending] = useState(true);

    const [selectedAsteroid, setSelectedAsteroid] = useState(null);

    useEffect(() => {

        const fetchData = async () => {
            try {
                let response;
                if (startDate === endDate) {
                    response = await fetch(`http://localhost:3000/?date=${startDate}`);
                } else {
                    response = await fetch(`http://localhost:3000/range?start_date=${startDate}&end_date=${endDate}`);
                }
                const data = await response.json();
                setAsteroids(data);
                setIsPending(false);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [startDate, endDate]);

    const handleAsteroidClick = (asteroid) => {
        setSelectedAsteroid(asteroid);
    };

    return (
        <>

            {isPending && <p>Loading...</p>}
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
