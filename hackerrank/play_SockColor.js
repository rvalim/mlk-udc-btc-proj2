function sockMerchant(n, ar) {
    let bla = [];
    let x = 0;

    ar.forEach((e, i) => {
        let x = e.toString()

        bla[x] = (bla[x] || 0) + 1
    });

    bla.map(e => x += (e / 2 | 0))

    return x;
}

let result = sockMerchant(9, [10, 20, 20, 10, 10, 30, 50, 10, 20]);

console.log(result);