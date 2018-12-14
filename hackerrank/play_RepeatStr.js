function repeatedString(s, n) {
    let fullRepeatCharacters = Math.floor(n / s.length)
    let qtdePerString = (s.match(/a/g) || []).length
    let qtdeLastOne = (s.substring(0, n - (fullRepeatCharacters * s.length)).match(/a/g) || []).length;

    // console.log({
    //     string: s,
    //     length: s.length,
    //     repeat: n,
    //     qtdePerString,
    //     fullRepeatCharacters,
    //     lastString: s.substring(0, n - (fullRepeatCharacters * s.length)),
    //     lastStringLeng: s.substring(0, n - (fullRepeatCharacters * s.length)).length,
    //     qtdeLastOne,
    //     teste: fullRepeatCharacters * s.length,
    //     teste1: (n / s.length) | 0
    // })

    return qtdePerString * fullRepeatCharacters + qtdeLastOne
}


// console.log(repeatedString('aba', 10))
// console.log(repeatedString('a', 1000000000000))
console.log(repeatedString('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 534802106762))
   534802106762
// 534802106762
// 534802106800
// 534802106800