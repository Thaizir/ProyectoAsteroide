import React from "react";
import { useState } from "react";

import { timeDiff } from "../helpers.js/timeDiff";
import { DatesForm } from "./DatesForm";
import { Asteroids } from "./Asteroids";


export const DatePicker = () => {


    const [startDate, setStartDate] = useState("2020-12-12");
    const [endDate, setEndDate] = useState("2020-12-12");
    const [error, setError] = useState(false);


    const handleFormDates = (event) => {
        event.preventDefault()
        let date1 = event.target[0].value;
        let date2 = event.target[1].value;

        let diffDays = timeDiff(date1, date2);
        if (diffDays > 7 || diffDays < 0) {
            setError(true);
        } else {
            setStartDate(date1)
            setEndDate(date2)
            setError(false);
        }
    }

    return (
        <>

            <h1>Proyecto Asteroides</h1>
            <h2>Seleccione las fechas de búsqueda</h2>
            <h5>{startDate} - {endDate}</h5>
            <DatesForm handleFormDates={handleFormDates} />
            {error && <p>Las fechas no son validas</p>}

            <Asteroids startDate={startDate} endDate={endDate} />
        </>

    )
};
