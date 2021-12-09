
function m() {
    return new Promise(function(resolve, reject) {
var fs = require('fs');
const request = require("request");
const convert = require('xml-js');
const service_key = 'ENTER YOUR API KEY'
const requestURL = `http://apis.data.go.kr/1262000/CountryNoticeService/getCountryNoticeList?serviceKey=${service_key}&numOfRows=10&pageNo=1`;


// 외교부 국가별 최신 공지사항API 받아오는 구간
function getData() {
    return new Promise(function(resolve, reject) {
        request(requestURL, (err, response, body) => {
            if(response) {
                const xmlToJson = convert.xml2json(body, {compact: true, spaces: 4});
                resolve(xmlToJson);
            }
            reject(new Error("Request is failed"));
        });
    });
}

// json 형식의 파일 받아옴.
getData().then(function(data1) {
    return new Promise(function(resolve, reject) {
        let values = [];
        const obj = JSON.parse(data1);
    for (x of obj["response"]["body"]["items"]["item"]) {
        const headline = x["title"]["_text"];
        const headline_dt = x['wrtDt']['_text'];
        values.push({
            'headline' : headline,
            'headline_dt' : headline_dt
    })
    }
    resolve(values); // values에는 객체 형태로 날짜별 정보 저장.
    }
    )}).then((result) => {
        // result = result.reverse();
        // console.log(result);

        var rollingData = [                         
            result[0]['headline'],
            result[1]['headline'],
            result[2]['headline'],
            result[3]['headline'],
            result[4]['headline'],
            result[5]['headline'],
            result[6]['headline'],
            result[7]['headline'],
            result[8]['headline'],
            result[9]['headline']];
        
        // headline_info.json 
        var jsonData = JSON.stringify(rollingData);

        fs.writeFile("./public/headline_info.json", 'rollingData = ' + jsonData, function(err) {
            if (err) {
                console.log(err);
            }
        });
        // 1번 ~ 10번까지 외교부 최신 공지사항 헤드라인 저장  
    })
    resolve();
    reject();
})
}

module.exports = m;