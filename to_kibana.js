const stores = require('./stores.json');
stores.data.forEach(e => {
    e.location = {
        lat: e.coordinates[0],
        lon: e.coordinates[1]
    }
});
console.log(JSON.stringify(stores));
