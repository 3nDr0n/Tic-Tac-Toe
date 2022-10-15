//this variable keeps track of whos turn it is
let activePlayer="X";
//this array stores an array of moves. we use this to determine win conditions
let selectedSquares=[];

//this function is for placing an x or o in a square
function placeXOrO(squareNumber) {
    //this condition ensures a square hasnt been selected already
    //the .some() method is used to check each element of selectedSquare array to
    //see if it contains a square number clicked on
    if (!selectedSquares.some(element=>element.includes(squareNumber))) {
        //this varable retrieves the html element id that was clicked.
        let select=document.getElementById(squareNumber);
        //this condition checks whos turn it is
        if (activePlayer==="X") {
            //if active player is equal "X", the x.png is placed in html
            select.style.backgroundImage='url("images/x.png")';
        //active player may only be x or o so, if not x it must be o    
        } else {
            //if activeplayer is equal to o, the o.png is placed in html
            select.style.backgroundImage='url("images/o.png)';
        }
        //squareNumber and activePlayer are concatenated together and added to array
        selectedSquares.push(squareNumber+activePlayer);
        //thiss calls a function to check for any win conditions.
        checkWinConditioons();
        //This condition is for changing the active player
        if (activePlayer==="X") {
            //if active player is x, change it to o
            activePlayer="O";
        //if active player is anything other than x
        } else {
            //change active player to x
            activePlayer="X";
        }

        //this function plays placement sound
        Audio('./media/place.mp3');
        //this condition checks to see if it is computers turn
        if(activePlayer==="O") {
            //this function disables clicking for computer choice
            disableClick();
            //this function waits 1 second before placing the image
            //and enabling click.
            setTimeout(function() {computersTurn(); }, 1000);
        }
        //returning true is needed for out computersturn function to work
        return true;
    }

    //this function results in a random square being selected
    function computersTurn() {
        //this boolean is needed for out while loop
        let success=false;
        //this var stores a random number 0-8
        let pickASquare;
        //this condition allows out while loop to keep
        //trying if a square is selected already
        while(!success) {
            //a random number between 0 and 8 is selected
            pickASquare=String(Math.floor(Math.random()*9));
            //if the random number evaluates returns true, the square hasnt been selected yet
            if (placeXOrO(pickASquare)) {
                //this line calls the function
                placeXOrO(pickASquare);
                //this changes our boolean and ends the loop
                success=true;
            } ;
        }
    }
}

//this function parses the selectedSquares array to search for win condtitions.
//drawWinLine function is called to draw line if condition is met
function checkWinConditions() {
    // x 0, 1 , 2 condition
    if (arrayIncludes('0X', '1X', '2X')) {drawWinLine(50, 100, 558, 100); }
    //x 3, 4, 5 condition
    else if (arrayIncludes('3X', '4X', '5X')) {drawWinLine(50, 304, 558, 304); }
    //x 6, 7, 8 condition
    else if (arrayIncludes('6X', '7X', '8X')) {drawWinLine(50, 508, 558, 508); }
    //x 0, 3, 6 condition
    else if (arrayIncludes('0X', '3X', '6X')) {drawWinLine(100, 50, 100, 558); }
    //x 1, 4, 7 condition
    else if (arrayIncludes('1X', '4X', '7X')) {drawWinLine(304, 50, 304, 558); }
    //x 2, 5, 8 condition
    else if (arrayIncludes('2X', '5X', '8X')) {drawWinLine(508, 50, 508, 558); }
    //x 6, 4, 2 condition
    else if (arrayIncludes('6X', '4X', '2X')) {drawWinLine(100, 508, 510, 90); }
    //x 0, 4, 8 condition
    else if (arrayIncludes('0X', '4X', '8X')) {drawWinLine(100, 100, 520, 520); }
    //o 0, 1, 2 condition
    else if (arrayIncludes('0O', '1O', '2O')) {drawWinLine(50, 100, 558, 100); }
    //o 3, 4, 5 condition
    else if (arrayIncludes('3O', '4O', '5O')) {drawWinLine(50, 304, 558, 304); }
    //o 6, 7, 8 condition
    else if (arrayIncludes('6O', '7O', '8O')) {drawWinLine(50, 508, 558, 508); }
    //o 0, 3, 6 condition
    else if (arrayIncludes('0O', '3O', '6O')) {drawWinLine(100, 50, 100, 558); }
    //o 1 ,4 , 7 condition
    else if (arrayIncludes('1O', '4O', '7O')) {drawWinLine(304, 50, 304, 558); }
    //o 2, 5, 8 condition
    else if (arrayIncludes('2O', '5O', '8O')) {drawWinLine(508, 50, 508, 558); }
    //o 6, 4, 2 condition
    else if (arrayIncludes('6O', '4O', '2O')) {drawWinLine(100, 508, 510, 90); }
    //o 0, 4, 8 condition
    else if (arrayIncludes('0O', '4O', '8O')) {drawWinLine(100, 100, 520, 520); }
    //this condition checks for tie, if none of the ablove conditions register
    //and 9 squares are selected, the code executes.
    else if (selectedSquares.length >=9) {
        //this function plays tie game sound
        Audio('./media/tie.mp3');
        //this function sets a .3 second timer before the resetGame is called.
        setTimeout(function () {resetGame(); }, 1000);
    }
    //this function check if an array includes 3 strings
    //it is used to check for each win condition
    function arrayIncludes(squareA, squareB, squareC) {
        //the next 3 variables will be used to check for 3 in a row
        const a = selectedSquares.includes(squareA);
        const b = selectedSquares.includes(squareB);
        const c = selectedSquares.includes(squareC);
        // if the 3 variables we pass are all included in out array true
        //is returned and our else if condition executes the drawLine function.
        if (a===true && b===true && c===true) { return true; }
    }
}