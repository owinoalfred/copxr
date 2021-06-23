const en = require('./en.json');

// This generates a copy of en.json with all the values replaced by X's It is useful for finding which strings are hardcoded.
// Usage eg `node makeFakeTranslations.js > ru.json` (then change the locale in the overwritten file)

const crap = {};
Object.keys(en).forEach(k=> {
    if (k === 'locale'){
        crap[k] = en[k]
    } else {
        crap[k] = ''; 
        en[k].split('').forEach(c => crap[k]+= c === ' '?c:'X') 
    }
})

console.log(JSON.stringify(crap, null, 2))