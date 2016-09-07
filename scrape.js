
//  Google Map で「混雑する時間帯」を取得
//

function isDiv(e) {
    return e instanceof HTMLElement
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
    var dayStrJa = ['月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日', '日曜日'];
    data.name = document.getElementsByTagName('h1')[0].innerHTML;
    data.address = document.querySelector('.widget-pane-section-info span span span span').innerHTML;
    if (container.length == 0) { return; }

    // 営業時間
    var libs = {}
    document.querySelector('table>tbody').childNodes.forEach(function (e) {
        if (!isDiv(e)) { return; }
        var label = e.childNodes[1].childNodes[1].innerHTML;
        libs[dayStrJa.indexOf(label)] = e.querySelector('li').innerHTML;
    });

    // 混雑度
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
        var id = Object.keys(dayHash).length;
        dayHash[dayStr[id]] = {
            popular: addIndexHour(firstHour, dayData),
            working: libs[id]
        }
    });
    data.timedata = dayHash;
    return data;
}

