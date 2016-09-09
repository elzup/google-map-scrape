const coordinates = require('./coordinates.json');
const stores = require('./kitasenju.json');

for (var i = 0; i < coordinates.length; i++) {
    stores.data[i].location = coordinates[i];
    var dayStr = ['Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Stu', 'Sun'];
    stores.data[i].opens = {};
    dayStr.forEach(d => {
        stores.data[i].name =  new Date();
        if (stores.data[i].workings[d] == '24時間営業') {
            stores.data[i].opens[d] = ['0時00分', '0時00分']
        }
        stores.data[i].opens[d] = stores.data[i].workings[d].split('〜');
    });
}
console.log(JSON.stringify(stores.data));
