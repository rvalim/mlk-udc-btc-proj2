function jumpingOnClouds(c) {
    let result = -1;
    let i = 0;

    do {
        result++;
        i += (c[i+2] == 0? 2 : 1)
    } while (i < c.length)

    return result;
}

console.log(jumpingOnClouds('0 0 1 0 0 1 0'.split(' ')))
console.log(jumpingOnClouds('0 0 0 0 1 0'.split(' ')))
console.log(jumpingOnClouds('0 0 1 0 0 1 0'.split(' ')))
console.log(jumpingOnClouds('0 0 0 1 0 0'.split(' ')))