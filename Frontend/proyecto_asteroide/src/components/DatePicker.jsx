import React, { useState, useRef } from "react";
import { Asteroids } from "./Asteroids";

export const DatePicker = () => {
    const startDateRef = useRef("2015-09-07");
    const endDateRef = useRef("2015-09-07");


    const [startValue, setStartValue] = useState();
    const [endValue, setEndValue] = useState();
    const [error, setError] = useState("");

    const setDates = (e) => {
        e.preventDefault();
        const start = startDateRef.current.value;
        const end = endDateRef.current.value;

        let date1 = new Date(start);
        let date2 = new Date(end);

        const diffDays = (date2 - date1) / (1000 * 60 * 60 * 24);

        if (!start || !end || diffDays > 7) {
            setError("Error con la fecha");
        } else {
            setError("");
            setStartValue(start);
            setEndValue(end);
        }
    };

    return (
        <>
            <h1>Proyecto Asteroides</h1>
            <h2>Seleccione las fechas de búsqueda</h2>
            <div>
                <form onSubmit={setDates}>
                    <label htmlFor="start">Start date:</label>
                    <input required type="date" ref={startDateRef} id="start" defaultValue="2015-09-07" name="start" min="2010-01-01" max={new Date().toISOString().split('T')[0]} />
                    <label htmlFor="end">End date:</label>
                    <input required type="date" ref={endDateRef} id="end" defaultValue="2015-09-08" name="end" min="2010-01-01" max={new Date().toISOString().split('T')[0]} />
                    <button type="submit">Submit</button>
                </form>

                {error && <p style={{ color: "red" }}>{error}</p>}
            </div>

            <Asteroids startDate={startValue} endDate={endValue} />
        </>
    );
};