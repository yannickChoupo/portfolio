export const getCurrentTimestamp = async () => {
    let newDate = new Date(), unixValue, utcValue;
    utcValue = newDate.toUTCString();
    unixValue = newDate.valueOf();
    return { unix: unixValue, utc: utcValue };
}

export const getTimestampByDate = async ( date: string) => {
    let newDate, unixValue, utcValue;
    if (!isNaN(Number(date))) {
        newDate = new Date(Number(date));
    } else {
        newDate = new Date(date);
    }

    if (newDate.toUTCString() === "Invalid Date") {
        throw new Error("Invalid Date");
    } else {
        utcValue = newDate.toUTCString();
        unixValue = newDate.valueOf();
    }
    return {
        "unix": unixValue,
        "utc": utcValue
    }
}