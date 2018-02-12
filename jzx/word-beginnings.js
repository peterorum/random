const worder = require('../get-word')
const _ = require('lodash')

// load the words array
const words = worder.getWords().filter(w => w.length === 7 || w.length === 8)

for (let len = 2; len <= 5; len += 1) {
  const freqs = {}

  words.forEach(word => {
    // start
    const part = word.substr(0, len)

    // end
    // const part = word.substr(-len)

    if (part in freqs) {
      freqs[part] += 1
    } else {
      freqs[part] = 1
    }
  })

  const best = _.sortBy(Object.keys(freqs), w => freqs[w]).slice(-10)

  best.forEach(b => console.log(b, freqs[b]))
}

/*

ch 1046
ma 1108
de 1176
st 1222
ca 1408
un 1522
co 1794
re 2179

for 300
dis 334
con 347
cha 351
pro 363
mis 396
pre 458

para 76
back 79
comp 80
outs 93
anti 97
fore 112
over 354

inter 29
super 33
under 40
 */
