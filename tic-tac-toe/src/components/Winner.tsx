import {StaticCell} from './StaticCell'

interface WinnerProps {
  winner: string | false | null;
  reset: () => void;
}

export const Winner = ({winner, reset}:WinnerProps) => {
  if (winner !== null) {
  return (
          <section className="absolute w-lvw h-lvh top-0 left-0 grid place-items-center bg-gray-800/70">
            <div className="bg-gray-900 h-[300px] w-[320px] border-2 border-gray-100 rounded-xl flex flex-col justify-center items-center gap-5">
              <h2>{winner === false ? 'Empate' : 'Ganador '}</h2>
              <header className="mx-0 my-auto w-fit rounded-xl flex gap-4">
                {winner && <StaticCell isSelected={true}>{winner}</StaticCell>}
              </header>
              <footer>
                <button className="px-2 py-3 m-6 bg-transparent border-2 border-gray-100 text-gray-100 
                w-[100px] rounded-md transition-colors font-bold cursor-pointer hover:bg-gray-100 hover:text-gray-800" onClick={reset}>Reiniciar</button>
              </footer>
            </div>
          </section>
        )
    }
  }