const myPromise = new Promise((resolve, reject) => {//선언과 동시에 비동기 작업 실행
    //비동기 작업 처리
    setTimeout(() => {
        const text = prompt("hello를 입력해줘 그러면 선물을 줄게")
        if (text === "hello") {
            resolve('===')//비동기 작업이 정상적일 때 결과 반환 콜백 함수
            //약속 이행
        } else {
            reject('ㅠㅠ')//비동기 작업이 실패할 때 결과 반환 콜백 함수
            //약속 거절
        }
    }, 2000)
})//이 친구는 Promse객체이다. resolve와 reject는 콜백함수이다.


/*
 *상태
 -대기(pending): 비동기 작업을 처리하는 중...
 -이행(fulfilled): 비동기 작업이 정상적으로 처리가 된 경우
 -거부(rejected): 비동기 작업이 정상적으로 처리되지 않은 경우

 메소드
 -then(): 이행되었을 때
 -catch(): 거부되었을 때
 -finally(): 이행되거나 거부되더라도 실행

*/
myPromise.then((result) => {//비동기 작업이 정상적으로 처리 되었을 때
    console.log(result)//이 때 result는 resolve에 넣은 값이다.

}).catch((error) => {//비동기 작업이 실패할 때, catch메서드로 결과를 받을 수 있다.
    console.log('err:', error)//이 때 error는 reject에 넣은 값이다.
})//resolve에 넣은 값이 then의 parameter로 전달된다.
    .finally(() => {
        console.log('finally')
    })//결과를 정상적으로 받든 안받든 항상 실행되는 콜백함수이다.

//Promise객체는 상태를 가지고 있는데
//비동기 작업이 처리중일 때는 pending
//비동기 작업이 처리되었을 때는 fulfilled
//비동기 작업이 실패할 때는 rejected