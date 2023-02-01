// Build game board array
function buildBoard() {
    let board = [];
    for (let j=0; j < 8; j++) {
        for (let i=0; i < 8; i++) {
            board.push([j,i]);
        }
    }
    return board;
}

// Return index of a target spot within array
function findIndex(arr, target) {
    for (let i=0; i < arr.length; i++) {
        if (arr[i][0] === target[0] && arr[i][1] === target[1]) {
            return i;
        }
    }
}

// Check if target spot is contained within array
function containsSpot(arr, target) {
    if (arr.find(element => element[0] === target[0]) &&
        arr.find(element => element[1] === target[1])) {
        return true;
    }
}

// Calculate next potential move for knight piece
function findNextMove(index, x, y) {
    if (index == 0) return [x+2, y+1];
    if (index == 1) return [x+1, y+2];
    if (index == 2) return [x-1, y+2];
    if (index == 3) return [x-2, y+1];
    if (index == 4) return [x-2, y-1];
    if (index == 5) return [x-1, y-2];
    if (index == 6) return [x+1, y-2];
    if (index == 7) return [x+2, y-1];
}

// Build array of objects w/ info for each board square
function buildInfoArr(boardArr, startIndex) {
    let newArr = [];
    for (let i=0; i < boardArr.length; i++) {
        newArr[i] = {
            distance: null,
            predecessor: null
        }
    }
    newArr[startIndex].distance = 0;
    return newArr;
}

//Build adjacency list from chess board array
function buildAdjList(board) {
    let adjList = [];
    for (let i=0; i < board.length; i++) {
        let neighbors = [];
        for (let j=0; j < 8; j++) {
            let neighbor = findNextMove(j,board[i][0],board[i][1]);
            if (containsSpot(board, neighbor)) {
                neighbors.push(findIndex(board, neighbor));
            }
        }
        adjList[i] = neighbors;
    }
    return adjList;
}

// Construct a path by tracing predecessor of each square object
function constructPath(board, infoArr, item, index, newArr) {
    if (item.predecessor === null) return;
    if (item.predecessor != null) {
        newArr.push(board[index]);
        constructPath(board, infoArr, infoArr[item.predecessor], item.predecessor, newArr);
    }
}

function knightMoves(start, end) {
    let board = buildBoard();
    let startIndex = findIndex(board, start);
    let endIndex = findIndex(board, end);
    let bfsInfo = buildInfoArr(board, startIndex);
    let adjList = buildAdjList(board);
    let queue = [startIndex];
    let u;

    while (u != endIndex) {
        // Set first element of queue equal to u variable
        u = queue.shift();

        //Iterate through each neighbor v of u
        for (let i=0; i < adjList[u].length; i++) {
            let vIndex = adjList[u][i];
            // If the neighbor index is the end square, build & return path
            if (vIndex === endIndex) {
                bfsInfo[vIndex].predecessor = u;
                let path = [];               
                constructPath(board, bfsInfo, bfsInfo[vIndex], vIndex, path);
                result = path.reverse().splice(0,0,start);
                console.log(`You made it in ${path.length - 1} moves! Here's your path:`);
                return path;
            } else {
                // Update info for neighbor square & enqueue it
                if (bfsInfo[vIndex].distance == null) {
                    bfsInfo[vIndex].distance = bfsInfo[u].distance + 1;
                    bfsInfo[vIndex].predecessor = u;
                    queue.push(vIndex);
                }
            }
        }
    }
}


