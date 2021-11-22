 //x라는 XMLHttpRequest 객체 생성.
// fetch("http://ncov.mohw.go.kr/bdBoardList_Real.do?brdId=1&brdGubun=13&ncvContSeq=&contSeq=&board_id=&gubun=").then(res=> console.log(res));

// function test(){

//     if(x.readyState == '4'){ //x의 데이터로드가 완료 되었을 때.
//     console.log('complete road'); //데이터 로드 완료 출력.

//     let i; //반복문돌리기용 변수 선언
//     var el = document.createElement('yoso')  //el이라는 엘리먼트 선언.
//     el.innerHTML = x.responseText; // el 엘리먼트 안에 아까 x가 받아온 respontext삽입.


//     for(i=0;i<el.querySelectorAll('.card-title').length;i++) {
//     //card-title클래스가 발견된 개수만큼 반복

//     document.writeln(el.querySelectorAll('.card-title')[i].innerText+'<br>');
//     // 화면에 card-title클래스에 있는 Text를 출력후 줄바꿈.
//     }
//     clearInterval(timer); //타이머 초기화
// }
// else{
//     console.log('loading'); //데이터 로드 미완료시 로딩표시

// }
// }
// let timer = setInterval(test,100); //0.1초마다 test함수 실행.