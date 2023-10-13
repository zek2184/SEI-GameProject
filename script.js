// Scrolling speed 
let birdSpeed = 3; 
	
// Gravity value to pull the bird 
let gravity = 0.5; 
	
// bird element 
let bird = document.querySelector('.bird'); 
	
// Getting bird element properties 
let birdObj = bird.getBoundingClientRect(); 
let background = 
	document.querySelector('.background') 
			.getBoundingClientRect(); 
	
// score element 
let scoreValue = 
	document.querySelector('.score-value'); 
let message = 
	document.querySelector('.message'); 
let scoreTitle = 
	document.querySelector('.score-title'); 
	
// Start status
let gameStatus = 'Start'; 
	
// Key press
document.addEventListener('keydown', (e) => { 
	
// Start the game if enter key is pressed 
startGame()

function startGame() {
	if (e.key == 'Enter' && 
		gameStatus != 'Play') { 
		document.querySelectorAll('.pipe-spikes') 
				.forEach((e) => { 
		e.remove(); 
		}); 
		bird.style.top = '40vh'; 
		gameStatus = 'Play'; 
		message.innerHTML = ''; 
		scoreTitle.innerHTML = 'Score : '; 
		scoreValue.innerHTML = '0'; 
		play(); 
	} 
}
}); 


function play() { 
	function move() { 
		
		// Detect if game has ended 
		if (gameStatus != 'Play') return; 
		
		let pipeSpikes = document.querySelectorAll('.pipe-spikes'); 
		pipeSpikes.forEach((element) => { 
			
		let pipeSpikesObj = element.getBoundingClientRect(); 
		birdObj = bird.getBoundingClientRect(); 
			

		if (pipeSpikesObj.right <= 0) { 
			element.remove(); 
		} else { 
			// Checks bird object and pipes 
			if ( 
			birdObj.left < pipeSpikesObj.left + 
			pipeSpikesObj.width && 
			birdObj.left + 
			birdObj.width > pipeSpikesObj.left && 
			birdObj.top < pipeSpikesObj.top + 
			pipeSpikesObj.height && 
			birdObj.top + 
			birdObj.height > pipeSpikesObj.top 
			) { 
				
			// Change game status and end the game 
			gameStatus = 'End'; 
			message.innerHTML = 'Press Enter To Restart'; 
			message.style.left = '25vw';
			setTimeout(() => {
				document.location.reload();
			  }, 2000);
			return;
			
			} else { 
			// Increase the score if player pass each pipes
			if ( pipeSpikesObj.right < birdObj.left && 
				pipeSpikesObj.right + 
				birdSpeed >= birdObj.left && 
				element.increaseScore == '1') { 
				scoreValue.innerHTML = + scoreValue.innerHTML + 1; 
			} 
			element.style.left = pipeSpikesObj.left - birdSpeed + 'px'; 
			} 
		} 
		}); 

		requestAnimationFrame(move); 
	} 
	requestAnimationFrame(move); 

	let birdBody = 0; 
	function pullGravity() { 
		if (gameStatus != 'Play') return; 
		birdBody = birdBody + gravity; 
		document.addEventListener('keydown', (e) => { 
		if (e.key == 'ArrowUp') { 
			birdBody = -7; 
		} 
		}); 

		// Checks the bird object + top and bottom 

		if (birdObj.top <= 0 || 
			birdObj.bottom >= background.bottom) { 
		gameStatus = 'End'; 
		message.innerHTML = 'Press Enter To Restart'; 
		message.style.left = '25vw'; 
		setTimeout(() => {
			document.location.reload();
		  }, 2000);
		return; 
		} 
		bird.style.top = birdObj.top + birdBody + 'px'; 
		birdObj = bird.getBoundingClientRect(); 
		requestAnimationFrame(pullGravity); 
	} 
	requestAnimationFrame(pullGravity); 

	let pipeDistance = 0; 
		
	// Checks the gap between two pipes 
	let pipeGap = 35; 
	function createPipe() { 
		if (gameStatus != 'Play') return; 
		
		if (pipeDistance > 115) { 
		pipeDistance = 0 
			
		// Calculate random position of pipes on y axis 
		let pipe_posi = Math.floor(Math.random() * 43) + 8; 
		let pipeInverted = document.createElement('div'); 
		pipeInverted.className = 'pipe-spikes'; 
		pipeInverted.style.top = pipe_posi - 70 + 'vh'; 
		pipeInverted.style.left = '100vw'; 
			
		// Append the created pipe element in DOM 
		document.body.appendChild(pipeInverted); 
		let pipeSpikes = document.createElement('div'); 
		pipeSpikes.className = 'pipe-spikes'; 
		pipeSpikes.style.top = pipe_posi + pipeGap + 'vh'; 
		pipeSpikes.style.left = '100vw'; 
		pipeSpikes.increaseScore = '1'; 
			
		// Append the created pipe element in DOM 
		document.body.appendChild(pipeSpikes); 
		} 
		pipeDistance++; 
		requestAnimationFrame(createPipe); 
	} 
	requestAnimationFrame(createPipe); 
} 
