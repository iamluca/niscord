module.exports = {
    version: require('../package.json').version
};

const fs = require('fs');
fs.readdir('./structures', function (files) {
    console.log(files)
})
