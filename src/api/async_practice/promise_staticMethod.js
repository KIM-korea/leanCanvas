
function fetchData() {
	return fetch('https://jsonplaceholder.typicode.com/todos/1')
		.then(response => response.json())
		.then(data => {
			if (data.length === 0) {
				return Promise.reject('데이터가 없습니다.')
			}
			return data;
		})
}
fetchData().then(console.log).catch(console.error)


const promise1 = Promise.resolve(123)
const promise2 = Promise(() => {
	setTimeout(() => {
		resolve(456)
	}, 1000)
})
const promise3 = fetch('https://jsonplaceholder.typicode.com/todos/1&_delay=3000')
	.then(response => response.json())

Promise.all([promise1, promise2, promise3]).then(console.log).catch(console.error)

//promise.allSetted는 모든 프로미스가 이행되거나 거절될 때 까지 기다린다.
Promise.allSettled([promise1, promise2, promise3]).then(console.log).catch(console.error)

//promise any 여러개를 동시에 실행하고 하나라도 이행하면 해당 프로미스 값을 반환
//모든 프로미스가 거절되야 전체 프로세스가 거절

const PromiseNew1 = new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve(3000)
	}, 3000)
})
const PromiseNew2 = new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve(500)
	}, 500)
})
const PromiseNew3 = new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve(1000)
	}, 1000)
})

Promise.any([promise1, promise2, promise3]).then(console.log).catch(console.error)