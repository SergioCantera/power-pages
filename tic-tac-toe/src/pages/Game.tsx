import {useState} from 'react'
import {Cell} from '../components/Cell'
import {StaticCell} from '../components/StaticCell'
import {Winner} from '../components/Winner'

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

export function Game() {
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

  const checkEndGame = (board:Array<string | null>) => {
    return board.every(cell => cell !== null);
  }

  const updateBoard = (index:number) => {
    if(board[index] || winner) return;
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)){
      setWinner(false);
    }

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);
  }

  const reset = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setTurn(TURNS.X);
  }

  return (
    <main className="w-[678px] flex items-center justify-center flex-col mx-auto h-screen gap-4">
      <h1 className='text-4xl font-semibold tex-gray-100'>Tic-tac-toe</h1>
      <button className="px-2 py-3 m-6 bg-transparent border-2 border-gray-100 text-gray-100 
                w-[100px] rounded-md transition-colors font-bold cursor-pointer hover:bg-gray-100 hover:text-gray-800" onClick={reset}>Reiniciar</button>
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
        <StaticCell isSelected={turn === TURNS.X}>{TURNS.X}</StaticCell>
        <StaticCell isSelected={turn === TURNS.O}>{TURNS.O}</StaticCell>
      </section>
      <Winner winner={winner} reset={reset}/>
    </main>
  )
}