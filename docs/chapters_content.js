// Assembles all chapter parts into one HTML string
const { getTOC } = require('./ch_toc.js');
const { getCh1to3 } = require('./ch1_3.js');
const { getCh4 } = require('./ch4.js');
const { getCh5 } = require('./ch5.js');
const { getCh6 } = require('./ch6.js');
const { getCh7 } = require('./ch7.js');
const { getCh8to9 } = require('./ch8_9.js');

function getChaptersHTML() {
  return getTOC() + getCh1to3() + getCh4() + getCh5() + getCh6() + getCh7() + getCh8to9();
}

module.exports = { getChaptersHTML };
