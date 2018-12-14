function validAnagram(a, b) {
    if (a.length !== b.length) return false
    let bla = [];

    a.split('').forEach(e => bla[e] = (bla[e] || 0) + 1);
    
    for (let i = 0; i < b.length; i++) {
        let key = b[i];
        if (!bla[key]) return false;
        bla[key] -= 1;
    }

    return true;
}

var x = false
x = validAnagram('aaz', 'zza');
console.log(x);
x = validAnagram('anagram', 'nagaram');
console.log(x);
x = validAnagram('rat', 'car');
console.log(x);
x = validAnagram('awesome', 'awesom');
console.log(x);
x = validAnagram('amanaplanacanalpanama', 'acanalmanplanpamana');
console.log(x);
x = validAnagram('qwerty', 'qeywrt');
console.log(x);
x = validAnagram('texttwisttime', 'timetwisttext');
console.log(x);

