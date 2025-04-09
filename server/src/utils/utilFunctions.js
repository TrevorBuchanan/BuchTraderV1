
function lerp(a, b, t) {
    return a + t * (b - a)
}

function upTrendForLength(series, length) {
    greaterForLen = length + 1;
    if (series.length < greaterForLen) return false;

    const startIndex = series.length - greaterForLen;
    const endIndex = series.length - 1;
    for (let i = startIndex; i < endIndex; i++) {
        if (series[i] >= series[i + 1]) {
            return false;
        }
    }
    return true;
}

function downTrendForLength(series, length) {
    lesserForLen = length + 1;
    if (series.length < lesserForLen) return false;

    const startIndex = series.length - lesserForLen;
    const endIndex = series.length - 1;
    for (let i = startIndex; i < endIndex; i++) {
        if (series[i] <= series[i + 1]) {
            return false;
        }
    }
    return true;
}

module.exports = {
    lerp,
    upTrendForLength,
    downTrendForLength,
}