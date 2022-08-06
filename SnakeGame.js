const foodSound = new Audio('Sounds/food.mp3');
const gameOverSound = new Audio('Sounds/gameover.mp3');
const moveSound = new Audio('Sounds/move.mp3');
let snakeVel = { x: 0, y: 0 };
let score = 0;
let lastPaintTime = 0;
let speed = 5;
let snakeArr = [{ x: 8, y: 10 }];
let food = { x: 5, y: 6 }
const main = (ctime) => {
	window.requestAnimationFrame(main);
	if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
		return;
	}
	lastPaintTime = ctime;
	gameEngine();
}
const isCollide = (snake) => {
	for (let i = 1; i < snakeArr.length; i++) {
		if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
			return true;
		}
	}
	if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
		return true;
	}
	return false;
}
const gameEngine = () => {
	if (isCollide(snakeArr)) {
		gameOverSound.play();
		snakeVel = { x: 0, y: 0 };
		let alerting = document.getElementById('alerting');
		let html = `<div class="alertBox">
		<p><strong>GAME OVER!</strong></p>
	</div>`
		alerting.innerHTML = html;
		setTimeout(function () {
			alerting.innerHTML = '';
		}, 1890);
		snakeArr = [{ x: 8, y: 10 }];
		score = 0;
	}
	if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
		foodSound.play();
		score += 1;
		if(score>hiscoreval){
			hiscoreval=score;
			localStorage.setItem('hiscore',JSON.stringify(hiscoreval));
			hiscoreBox.innerHTML='Hiscore: '+hiscoreval;
		}
		scoreBox.innerHTML='Score: '+score;
		snakeArr.unshift({ x: snakeArr[0].x + snakeVel.x, y: snakeArr[0].y + snakeVel.y });
		let a = 2, b = 17;
		food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
	}
	for (let i=snakeArr.length-2;i>=0;i--) {
		snakeArr[i+1]={...snakeArr[i]};
	}
	snakeArr[0].x+=snakeVel.x;
	snakeArr[0].y+=snakeVel.y;
	//display
	board.innerHTML = '';
	snakeArr.forEach((e, i)=>{
		snakeEle = document.createElement('div');
        snakeEle.style.gridRowStart = e.y;
        snakeEle.style.gridColumnStart = e.x;
		if(i===0){
            snakeEle.classList.add('head');
		}
		else{
            snakeEle.classList.add('snake');

		}
        board.appendChild(snakeEle);

	});
	foodEle=document.createElement('div');
	foodEle.style.gridRowStart=food.y;
	foodEle.style.gridColumnStart=food.x;
	foodEle.classList.add('food');
	board.appendChild(foodEle);
}
let hiscore = localStorage.getItem('hiscore');
if (hiscore === null) {
	hiscoreval = 0;
	localStorage.setItem('hiscore', JSON.stringify(hiscoreval));
}
else {
	hiscoreval = JSON.parse(hiscore);
	hiscoreBox.innerHTML = 'Hiscore: ' + hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', (e) => {
	snakeVel = { x: 0, y: 1 };
	switch (e.key) {
		case "ArrowUp":
			snakeVel.x = 0;
			snakeVel.y = -1;
			break;
		case "ArrowDown":
			snakeVel.x = 0;
			snakeVel.y = 1;
			break;
		case "ArrowLeft":
			snakeVel.x = -1;
			snakeVel.y = 0;
			break;
		case "ArrowRight":
			snakeVel.x = 1;
			snakeVel.y = 0;
			break;
		default:
			break;
	}
});