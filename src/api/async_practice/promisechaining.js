fetch('https://jsonplaceholder.typicode.com/todos/1')//fetch api는 비동기로 작동 http통신을 사용할 때 쓰는 api 
	//promise객체를 반환한다. 서버로 부터 자원을 줘... 하고 약속 그리고 약속을 반환
	.then(response => {
		return response.json();
	}).then(data => {
		console.log(data);
	})
	.then(result => {
		console.log(result);
	})