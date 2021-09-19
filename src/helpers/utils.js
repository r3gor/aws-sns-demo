
export function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

export function isEmpty(obj) {
    return (
    // because Object.keys(new Date()).length === 0;
    // we have to do some additional check
    obj // 👈 null and undefined check
    && Object.keys(obj).length === 0 && obj.constructor === Object
    )
}

