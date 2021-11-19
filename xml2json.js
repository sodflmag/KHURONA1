//chrome에서 실행 시 require is not defined 오류

var convert = require('xml-js');
var request = require('request');

var url = 'http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19SidoInfStateJson';
var queryParams = '?' + encodeURIComponent('serviceKey') + '=AphC66GHAr%2Fsigd0y6R2i5kd0bw6DjE1I86L67QSSX16i4uzVjGh%2FRUINHg54kJIL9ADbF4lS3tCI4MxiRvxVA%3D%3D'; /* Service Key*/
queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* */
queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /* */
queryParams += '&' + encodeURIComponent('startCreateDt') + '=' + encodeURIComponent('20200410'); /* */
queryParams += '&' + encodeURIComponent('endCreateDt') + '=' + encodeURIComponent('20200410'); /* */

url = url + queryParams;

request.get(url, (err,res,body) => {
    if(err){
        console.log(`err =>${err}`)
    }
    else{
        if(res.statusCode == 200){
            var result = body;
            // console.log(`body data => ${result}`);
            var xmlToJson = convert.xml2json(result, {compact: true, spaces: 4});
            console.log(`xml to json => ${xmlToJson}`);
        }
    }
    //console.log('Status', response.statusCode);
    //console.log('Headers', JSON.stringify(response.headers));
    //console.log('Reponse received', body);
    //코드 출처:
    //https://m.blog.naver.com/PostView.nhn?blogId=suin2_91&logNo=221458345420&proxyReferer=https:%2F%2Fwww.google.com%2F
});