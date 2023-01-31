function buildBoard() {
    let board = [];
    
    for (let j=0; j<8; j++) {
        for (let i=0; i < 8; i++) {
            board.push([j,i]);
        }
    }

    return board;
}

function findIndex(arr, target) {
    for (let i=0; i < arr.length; i++) {
        if (arr[i][0] == target[0] && arr[i][1] == target[1]) {
            return i;
        }
    }
}

function containsSpot(arr, target) {
    if (arr.find(element => element[0] == target[0]) &&
        arr.find(element => element[1] == target[1])) {
        return true;
    } else {
        return false;
    }
}

function knightMoves(start, end) {
    let board = buildBoard();
    let startIndex = findIndex(board, start);
    let endIndex = findIndex(board, end);

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

    let bfsInfo = [];
    for (let i=0; i < board.length; i++) {
        bfsInfo[i] = {
            distance: null,
            predecessor: null
        }
    }
    bfsInfo[startIndex].distance = 0;

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

    let queue = [startIndex];
    let u;

    while (u != endIndex) {
        u = queue.shift();
        for (let i=0; i < adjList[u].length; i++) {
            let vIndex = adjList[u][i];

            if (vIndex === endIndex) {
                bfsInfo[vIndex].predecessor = u;
                let path = [];

                function constructPath(item, index) {
                    if (item.predecessor === null) return;
                    if (item.predecessor != null) {
                        path.push(board[index]);
                        constructPath(bfsInfo[item.predecessor], item.predecessor);
                }
                }

                constructPath(bfsInfo[vIndex], vIndex);
                result = path.reverse();
                result = path.splice(0,0,start);
                console.log(`You made it in ${path.length - 1} moves! Here's your path:`);
                return path;
            } else {
                if (bfsInfo[vIndex].distance == null) {
                    bfsInfo[vIndex].distance = bfsInfo[u].distance + 1;
                    bfsInfo[vIndex].predecessor = u;
                    queue.push(vIndex);
                }
            }
        }
    }
}


