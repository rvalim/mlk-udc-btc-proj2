// Complete the countingValleys function below.
function countingValleys(n, s) {
    let valleys = 0;
    let steps = 0;

    s.split('').forEach(e => {
        steps += (e == 'D'? -1 : 1)
        valleys += (e == 'U' && steps == 0? 1 : 0)
    });

    return valleys;
}


console.log(countingValleys(8, 'UDDDUDUU'));