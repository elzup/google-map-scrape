const coordinates = require('./coordinates.json');
const stores = require('./kitasenju.json');

for (var i = 0; i < coordinates.length; i++) {
    stores.data[i].coordinates = coordinates[i];
}
console.log(JSON.stringify(stores));
