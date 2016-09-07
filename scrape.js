
//  Google Map で「混雑する時間帯」を取得
//

function isDiv(e) {
    return e instanceof HTMLDivElement
}

// 配列を日付の時間付きオブジェクトに
function addIndexHour(offset, bars) {
    let i = offset;
    var data = {};
    bars.forEach(function(bar) {
        data[i] = bar;
        i++;
    });
    return data;
}

function getData() {
    var container = document.getElementsByClassName('widget-pane-section-popular-times-container');
    var data = {};
    var dayStr = ['Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Stu', 'Sun'];
    data.name = document.getElementsByTagName('h1')[0].innerHTML;
    data.address = document.querySelector('.widget-pane-section-info span span span span').innerHTML;
    if (container.length == 0) { return; }
    var dayHash = {};
    container[0].childNodes.forEach(function (e) {
        var dayData = [];
        if (!isDiv(e)) { return; }
        let firstHour = undefined;
        let i = 0;
        e.childNodes.forEach(function (e2) {
            if (!isDiv(e2)) { return; }
            if (!(e2.hasAttribute("jsinstance"))) { return; }
            var ps = e2.childNodes[1].getAttribute('aria-label');
            dayData.push(parseInt(ps.replace('%', '')));
            // 時間帯の調整
            if (firstHour == undefined) {
                firstHour = parseInt(e2.childNodes[3].innerHTML) - dayData.length + 1;
            }
        });
        dayHash[dayStr[Object.keys(dayHash).length]] = {
            popular: addIndexHour(firstHour, dayData)
        }
    });
    data.timedata = dayHash;
    return data;
}

