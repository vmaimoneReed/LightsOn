const NUM_ROWS = 5;
const NUM_COLS = 5;
const LIGHTS_OFF_COLOR = 'gray';
const LIGHTS_ON_COLOR = 'orange';
const grid = []

const gameTableEl = document.getElementById('game-table');

/**
 * Setup and start game. Each cell in the table has an id attribute from
 * 0 to (cells - 1). Use the id attribute of each cell (td element) to
 * determine which adjacent cells to turn on!
 * 
 * A solution to this game is here: https://dencee.github.io/lights-out/
 * Completed source code: https://github.com/dencee/lights-out
 */
function initializeGameTable() {
//make a blank row, , append to table
    for (let row = 0; row < NUM_ROWS; row++) {
        const tableRowEl = document.createElement('tr');

        for (let col = 0; col < NUM_COLS; col++) {

            const lightNumber = (row * NUM_ROWS) + col;

            const tableDataEl = document.createElement('td');
            tableDataEl.style.backgroundColor = LIGHTS_OFF_COLOR;
            tableDataEl.setAttribute('id', lightNumber.toFixed());
            tableRowEl.appendChild(tableDataEl);
            
            grid.push(tableDataEl);
        }

        gameTableEl.appendChild(tableRowEl);
    }
}

function randomizeLights(){
    for(eachLight of grid){
        if(Math.random()< 0.5){
            toggleSingleLight(eachLight);
        }
    }
}

/**
 * Toggle all lights and check if you won!
 * @param {object} event 
 */
function toggleLights(event) {
    const clickedLightCellEl = event.target;
    const lightNumber = parseInt(clickedLightCellEl.getAttribute('id'));

    // TODO: For debugging. REMOVE when done coding.
  //  alert(`clicked cell ${lightNumber}`);

    // Toggle color for selected td element
    toggleSingleLight(grid[lightNumber]);

    // NOT first row, toggle color for TOP td element
        if(lightNumber => NUM_COLS){
            toggleSingleLight(grid[lightNumber - NUM_COLS]);
        }
    // NOT right edge, toggle color for RIGHT td element
    if(lightNumber % NUM_COLS !== (NUM_COLS - 1) ){
        toggleSingleLight(grid[lightNumber + 1]);
    }
    // NOT on left edge, toggle color for LEFT td element
    if(lightNumber % 5 !== 0){
        toggleSingleLight(grid[lightNumber - 1]);
    }
    // NOT last row, toggle color for BOTTOM td element
        const totalCells = NUM_COLS * NUM_ROWS; //25
        if(lightNumber < totalCells - NUM_COLS){
            toggleSingleLight (grid[lightNumber + NUM_COLS]);
        }
    // Check if all the lights are ON!
    checkWin();
}

/**
 * Toggle a single light on/off
 * @param {element object} lightCellEl 
 */
function toggleSingleLight(lightCellEl) {

    // Get the current background color of the td element
    const bgColor = lightCellEl.style.backgroundColor

    // If the light is on, turn it off,
    
    if(bgColor === LIGHTS_ON_COLOR){
        lightCellEl.style.backgroundColor = LIGHTS_OFF_COLOR;

    }
        
    // If the light is off, turn it on,
    if(bgColor === LIGHTS_OFF_COLOR){
        lightCellEl.style.backgroundColor = LIGHTS_ON_COLOR;
    }
   

}

/**
 * Check if all lights are ON!
 */
 function checkWin() {

     // Check if all lights are on, i.e. backgroundColor === LIGHTS_ON_COLOR

    //
  for(let i = 0; i< grid.length; i++){
      const bgColor = grid[i].style.backgroundColor;

      if(bgColor === LIGHTS_ON_COLOR){
          lightsOn += 1;
      }
  }
     // Display the user won
     if (lightsOn === grid.length){
        alert('YOU WIN!');
     }
    //
}



/*
 * Listeners for mouse click events
 */
document.addEventListener('DOMContentLoaded', () => {

    initializeGameTable();
    const lightElements = document.querySelectorAll('td');

    for (let i = 0; i < lightElements.length; i++) {
        lightElements[i].addEventListener('click', toggleLights);
    }

    const button = document.querySelector('button');
    button.addEventListener('click', randomizeLights);
});

