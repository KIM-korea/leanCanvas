function getUser(userId) {
  return new Promise((resolve, reject) => {//약속이 이행되면 resolve, 약속이 거절되면 reject
    setTimeout(() => {
      try {
        const user = userId === 1 ? { id: userId, name: "김도현" } : null
        resolve(user)
      } catch (error) {
        reject(error)
      }
    }, 1000)
  })
}

function _runPromise() {
  getUser(1).then(user => {
    if (user) {
      console.log(user)
    } else {
      console.log("사용자 정보를 찾을 수 없습니다.")
    }//여기서 null을 걸러준다.
  }).catch(error => {
    console.log(error)
  })
}

async function runAsyncAwait() {//비동기 작업을 처리하는 함수
  try {
    const user = await getUser(1)//비동기 작업의 결과를 기다리는 역할 일단 getUser는 Promise객체를 반환한다. 여기에 await을 거는 순간 resolve안의 매개변수 값을 불러온다.
    if (user) {
      console.log(user)
    } else {
      console.log("사용자 정보를 찾을 수 없습니다.")
    }
  } catch (error) {
    console.log(error)
  }

}

runAsyncAwait()