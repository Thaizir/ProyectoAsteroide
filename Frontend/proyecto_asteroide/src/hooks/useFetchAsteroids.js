import { useEffect, useState } from "react";

export const useFetchAsteroids = (startDate, endDate) => {


    const [asteroids, setAsteroids] = useState([]);
    const [isPending, setIsPending] = useState(false);

    useEffect(() => {

        async function fetchAsteroids() {
            try {
                setIsPending(true);
                let response;
                if (startDate === endDate) {
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


    return {
        asteroids,
        isPending
    };
};
