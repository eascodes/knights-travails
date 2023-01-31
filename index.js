let knight = {
    current: null,
    prev: null,
    distance: 0
}

let KnightFactory = (current) => {
    current = current;
    next = null;
    return { current, next }
}

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

function buildPath(root, next) {
    root.next = next;
}

function knightMoves(start, end) {
    let board = buildBoard();
    let x = start[0];
    let y = start[1];
    let startIndex = findIndex(board, start);
    let endIndex = findIndex(board, end);

    let potentialMoves = [
        [x+2, y+1],
        [x+1, y+2],
        [x-1, y+2],
        [x-2, y+1],
        [x-2, y-1],
        [x-1, y-2],
        [x+1, y-2],
        [x+2, y-1]
    ];

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

    let queue = [startIndex];
    let u;

    while (u != endIndex) {
        u = queue.shift();
        for (let i=0; i < 8; i++) {
            x = board[u][0];
            y = board[u][1];
            let v = findNextMove(i, x, y);

            if (containsSpot(board, v)) {
                let indexV = findIndex(board, v);

                if (indexV == endIndex) {
                    return "REACHED THE END!";
                } else {
                    queue.push(indexV);
                }
            }

        }
    }
}