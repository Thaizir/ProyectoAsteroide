
export const timeDiff = (date1, date2) => {

    const number1 = new Date(date1);
    const number2 = new Date(date2);
    const diffDays = Math.abs((number2 - number1)) / (1000 * 60 * 60 * 24);

    return diffDays;
}



