import { React, useEffect, useState } from "react";

export const Asteroids = ({ startDate, endDate }) => {

    const [asteroids, setAsteroids] = useState([]);
    const [isPending, setIsPending] = useState(true);

    const [selectedAsteroid, setSelectedAsteroid] = useState(null);


    const handleAsteroidClick = (asteroid) => {
        setSelectedAsteroid(asteroid);
    };



    useEffect(() => {

        async function fetchAsteroids(value_1, value_2) {
            console.log(value_1, value_2)
            try {
                let response;
                if (value_1 === value_2) {
                    response = await fetch(`http://localhost:3000/?date=${startDate}`);
                } else {
                    response = await fetch(`http://localhost:3000/range?start_date=${startDate}&end_date=${endDate}`);
                }
                const data = await response.json();
                setAsteroids(data);
                setIsPending(false);
            } catch (err) {
                console.log(err)
            }
        }

        fetchAsteroids(startDate, endDate);

    }, [startDate, endDate]);



    return (
        <>
            {isPending && <p>Loading...</p>}
            {asteroids.map((ast) => (
                <div key={ast.name} className="asteroids-container">

                    <div className="asteroid" onClick={() => handleAsteroidClick(ast)}>Name: {ast.name}</div>
                    {selectedAsteroid === ast && (
                        <div className="asteroid" >
                            <p>{ast.name}</p>
                            <p>{ast.hazardous ? "Hazardous" : "Not Hazardous"}</p>
                            <p>Min diameter: {ast.diameter.estimated_diameter_min}</p>
                            <p>Max diameter: {ast.diameter.estimated_diameter_max}</p>
                        </div>
                    )}

                </div>
            ))}
        </>
    );
};
