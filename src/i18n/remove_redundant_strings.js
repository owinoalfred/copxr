const fs = require('fs')
const en = require(`${__dirname}/en.json`)
const de = require(`${__dirname}/de.json`)
const es = require(`${__dirname}/es.json`)
const fr = require(`${__dirname}/fr.json`)
const pl = require(`${__dirname}/pl.json`)
const pt = require(`${__dirname}/pt.json`)
const ru = require(`${__dirname}/ru.json`)
const sv = require(`${__dirname}/sv.json`)
const zh = require(`${__dirname}/zh.json`)
const nl = require(`${__dirname}/nl.json`)
const el = require(`${__dirname}/el.json`)
const cs = require(`${__dirname}/cs.json`)
const sw = require(`${__dirname}/sw.json`)
const hu = require(`${__dirname}/hu.json`)
const xh = require(`${__dirname}/xh.json`)
const languages = [
  { id: 'en', strings: en },
  { id: 'de', strings: de },
  { id: 'es', strings: es },
  { id: 'fr', strings: fr },
  { id: 'pl', strings: pl },
  { id: 'pt', strings: pt },
  { id: 'ru', strings: ru },
  { id: 'sv', strings: sv },
  { id: 'zh', strings: zh },
  { id: 'nl', strings: nl },
  { id: 'el', strings: el },
  { id: 'cs', strings: cs },
  { id: 'sw', strings: sw },
  { id: 'hu', strings: hu },
  { id: 'xh', strings: xh },
]

for (var i = 0; i < languages.length; i++) {
  const new_ = {}
  const id = languages[i].id
  const strings = languages[i].strings

  if (id === 'en') {
    continue
  }

  for (let key in strings) {
    if (!en[key]) {
      // key does not exist in English, remove it
      continue
    }
    new_[key] = strings[key]
  }

  fs.writeFileSync(`${__dirname}/${id}.json`, JSON.stringify(new_, null, 2))
}