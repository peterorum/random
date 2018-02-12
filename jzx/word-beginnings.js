const worder = require('../get-word')
const _ = require('lodash')

// load the words array
const words = worder.getWords().filter(w => w.length === 7 || w.length === 8)

for (let len = 3; len <= 5; len += 1) {
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

non 1536
sub 1575
out 1715
int 1719
mis 1725
pro 2183
pre 2429
con 2711
dis 2795

mono 546
cont 562
comp 605
para 659
anti 892
over 2234

trans 543
under 744
super 839
inter 1108

 */
