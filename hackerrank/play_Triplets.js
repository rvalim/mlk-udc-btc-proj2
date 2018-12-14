function countTriplets(arr, r) {
    let bla = [];
    let blb = [];
    let keys = [];
    let qtde = 0;

    arr.forEach((e, i) => {
        let x = e.toString()
        if (!keys.includes(x)) keys.push(x);
        bla[x] = (bla[x] || 0) + 1
        if(bla[x] > 1) blb
    })

    for(let i = 0; i < keys.length; i++){
        let key = keys[i];
        
        console.log(key, key * r)
        
        if (bla[key] && bla[key*r] && bla[key*r*r])
            qtde++

    }
    // for(let key in bla){
    //     if (!bla[key]) continue;

    //     if (bla  [key] && bla[key] && bla[key])

    //     console.log(key, bla[key])
    // }

    console.log(qtde);
}
let fat = n => {
    if (n == 0) return 1
    return n * fat(n-1)
}
// console.log(fat(4) / (fat(3)*(fat(4-3))))
console.log(countTriplets('1 2 2 4'.split(' '), 2))
