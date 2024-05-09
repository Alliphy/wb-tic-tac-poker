let player = "X";

const lines = [
    // Horizontal lines
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // Vertical lines
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // Diagonal lines
    [0, 4, 8],
    [2, 4, 6],
];

function play(evt) {
    // using ternary statement to check true or false to change player name 
    player = (player === "X") ? "O" : "X";
    
    // accessing span tag from html and giving it's textCOntent the value of our ternary statement for player
    let currentPlayerSpan = document.getElementById("current-player");
    currentPlayerSpan.textContent = player;
    
    // event target the textContent to update the textContent to the current player
    evt.target.textContent = player;
    
    // checkWinner or tie
    const winner = checkWinner(squares);
    if (winner) {
        alert(`The Winner is: ${winner}`)
    } else {
        const tie = checkForTie(squares);
        // nested if to check if the tie is true and to display an alert if so
        if (tie) {
            alert("Cat's Game!");
        }
    }
}

// access squares from html
const squares = document.querySelectorAll(".square");

// loop through squares and addEventListener to run our play function as you click on each square
for (const square of squares) {
    square.addEventListener("click", play);
}

// write function for checkingFor Tie
function checkForTie(squares) {

    // .every was not working with the array I had so I had to add it to the NodeList using Array.from to make it a real array 
    const squaresArray = Array.from(squares);

    // then I access my new array and check all items using .every. then I check the textContent of square and if its not empty and the squares are all full then it will be a cat's game!
    return squaresArray.every(square => square.textContent !== "");
}

// define helper function checkWinner that takes in a single line as an argument
function checkWinner(squares) {
    // using .every to check if every item in array will meet a condition. return true only if all elements pass otherwise it's false.
    
    // in this instance I am using it to check is all the squares have a filled textContent and see if they match the inner text of the first square line by using (squares[line[0].innerText]) 
    
    // if all the squares n this line meet the condition then it should return true!!
    
    const winningLine = line => line.every(index => squares[index].textContent !== "" && squares[index].textContent === squares[line[0]].textContent);
    
    // using the .some to iterate through the lines array. winningLine is passed through as a callback to some. some stops iterating through once winningLine === true.

    // if winningLine is found using some then i use filter to get the first winning line from lines

    // then I accessed the textContent of the first square within the winning line to determine the winner of the game.

    return lines.some(winningLine) ? squares[lines.filter(winningLine)[0][0]].textContent : null;
}