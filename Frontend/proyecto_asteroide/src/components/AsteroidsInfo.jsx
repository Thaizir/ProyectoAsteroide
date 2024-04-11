import { useState } from "react";

import { useFetchAsteroids } from "../hooks/useFetchAsteroids";

export const AsteroidsInfo = ({ startDate, endDate }) => {

    const { asteroids, isPending } = useFetchAsteroids(startDate, endDate);
    const [selectedAsteroid, setSelectedAsteroid] = useState(null);

    const handleAsteroidClick = (asteroid) => {
        if (selectedAsteroid === asteroid) {
            setSelectedAsteroid(null);
            return
        } else {

            setSelectedAsteroid(asteroid);
        }
    };

    return (
        <>
            {isPending && <p>Loading...</p>}
            <div className="asteroids-container">
                {asteroids.map((ast) => (
                    <div key={ast.name}>

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
            </div>
        </>
    );
};
