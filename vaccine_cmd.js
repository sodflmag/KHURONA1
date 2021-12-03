//cmd 명령어를 실행해서 curl -o를 통해 test_vaccine.json으로 

let exec = require('child_process').exec
const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1 > 10 ? date.getMonth() + 1 : '0' + date.getMonth();
const day = date.getDate() > 10 ? date.getDate() : '0' + date.getDate(); 
// month, date의 경우 10보다 작아지는 경우 앞에 0을 붙여줘야 정상적인 URL 생성이 가능함.

//testor 변수에 담긴 cmd 명령어를 수행
var testor = `curl -o test_vaccine.json "http://api.odcloud.kr/api/15077756/v1/vaccine-stat?serviceKey=AphC66GHAr%2Fsigd0y6R2i5kd0bw6DjE1I86L67QSSX16i4uzVjGh%2FRUINHg54kJIL9ADbF4lS3tCI4MxiRvxVA%3D%3D&page=1&perPage=10&cond[baseDate::GTE]=${year}-${month}-${day}&cond[sido::EQ]=%EC%A0%84%EA%B5%AD"`

exec(testor, (err,out,stderr) => { 
	console.log(out)
});