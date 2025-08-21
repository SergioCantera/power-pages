import {useState} from 'react'
import {Cell} from './components/Cell'

const TURNS = {
  X: 'x',
  O: 'o'
}

const WINNER_COMBOS = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]


function App() {
  const [turn, setTurn] = useState(TURNS.X)
  const [board, setBoard] = useState(Array(9).fill(null))
  const [winner, setWinner] = useState<null | false | string>(null)

  const checkWinner = (board:Array<string | null>) => {
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  }

  const updateBoard = (index:number) => {
    if(board[index] || winner) return;
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    
    const newWinner = checkWinner(newBoard);
    if (newWinner) setWinner(newWinner);

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);
  }

  return (
    <main className="w-[678px] flex items-center justify-center flex-col mx-auto h-screen gap-4">
      <h1 className='text-4xl font-semibold'>Tic-tac-toe</h1>
      <section className='grid grid-cols-3 gap-4'>
        {board.map((_,index)=>{
          return (
          <Cell
            key={index}
            index={index}
            updateBoard={updateBoard}>
              {board[index]}
            </Cell>
          )
        })}
      </section>
      <section className='flex gap-4'>
        <Cell isSelected={turn === TURNS.X}>{TURNS.X}</Cell>
        <Cell isSelected={turn === TURNS.O}>{TURNS.O}</Cell>
      </section>
    </main>
  )
}

export default App
