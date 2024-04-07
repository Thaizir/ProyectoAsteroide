export const DatesForm = ({ handleFormDates }) => {

    return (

        <>
            <form onSubmit={handleFormDates}>
                <label >Start date:</label>
                <input required type="date" id="start" defaultValue="2015-09-07" name="start" min="2010-01-01" max={new Date()} />
                <label >End date:</label>
                <input required type="date" id="end" defaultValue="2015-09-08" name="end" min="2010-01-01" max={new Date()} />
                <button type="submit">Submit</button>

            </form >
        </>
    )

};
