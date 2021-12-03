function getAPIInfo() {
    const url = "http://apis.data.go.kr/1262000/NoticeService2/getNoticeList2?";
const key = "AphC66GHAr%2Fsigd0y6R2i5kd0bw6DjE1I86L67QSSX16i4uzVjGh%2FRUINHg54kJIL9ADbF4lS3tCI4MxiRvxVA%3D%3D";
const pageNo = "1";
const numofRows = "1";
// const startCreateDt = `${year}${month}${day}`;
// const endCreateDt = `${year}${month}${day}`;
const requestURL = `${url}serviceKey=${key}&pageNo=${pageNo}&numoFRows=${numofRows}&returnType=XML`;

    let jsonFile;
    return new Promise(function(resolve, reject) {
        console.log(123);
        let xhr = new XMLHttpRequest();
        xhr.open('GET', requestURL);
        xhr.onreadystatechange = function () {
            if (this.readyState == 4) {
                jsonFile = JSON.parse(this.responseText);
                resolve(jsonFile);
            }
        };
        xhr.send('');
    })
}

function JsonToVisibleInfo(jsonfile) {
    const itemlist = jsonfile["response"]["body"]['items']['item'];
    let values = [];
    for (x of obj["response"]["body"]["items"]["item"]) {
        const headline = x["title"]["_text"];
        const headline_dt = x['wrtDt']['_text'];
        values.push(headline + headline_dt);

    }
    return values;
}

getAPIInfo().then((response) => {
    // console.log(response);
    const rollingData = JsonToVisibleInfo(response);
    let timer = 3000 // 롤링되는 주기 (1000 => 1초)

    let first = document.getElementById('first'),
        second = document.getElementById('second'),
        third = document.getElementById('third')
    let move = 2
    let dataCnt = 1
    let listCnt = 1


    first.children[0].innerHTML = rollingData[0]

    setInterval(() => {
        if(move == 2){
            first.classList.remove('card_sliding')
            first.classList.add('card_sliding_after')

            second.classList.remove('card_sliding_after')
            second.classList.add('card_sliding')

            third.classList.remove('card_sliding_after')
            third.classList.remove('card_sliding')

            move = 0
        } else if (move == 1){
            first.classList.remove('card_sliding_after')
            first.classList.add('card_sliding')

            second.classList.remove('card_sliding_after')
            second.classList.remove('card_sliding')

            third.classList.remove('card_sliding')
            third.classList.add('card_sliding_after')

            move = 2
        } else if (move == 0) {
            first.classList.remove('card_sliding_after')
            first.classList.remove('card_sliding')

            second.classList.remove('card_sliding')
            second.classList.add('card_sliding_after')

            third.classList.remove('card_sliding_after')
            third.classList.add('card_sliding')

            move = 1
        }
        
        if(dataCnt < (rollingData.length - 1)) {
            document.getElementById('rolling_box').children[listCnt].children[0].innerHTML = rollingData[dataCnt]
                dataCnt++
        } else if(dataCnt == rollingData.length - 1) {
            document.getElementById('rolling_box').children[listCnt].children[0].innerHTML = rollingData[dataCnt]
            dataCnt = 0
        }

        if(listCnt < 2) {
            listCnt++
        } else if (listCnt == 2) {
            listCnt = 0
        }

        console.log(listCnt)
    }, timer);

}).catch((errorMsg)=> {
    console.log(errorMsg);
});