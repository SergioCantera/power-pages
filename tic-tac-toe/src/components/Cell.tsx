interface CellProps {
  children: React.ReactNode;
  isSelected?: boolean;
  updateBoard: (index: number) => void;
  index: number;
}

export const Cell = ({children, isSelected, updateBoard, index}:CellProps) => {
  
  const handleClick = () => {
    updateBoard(index)
  }
  
  return (
    <div onClick={handleClick} className={`w-[100px] h-[100px] border-2 border-gray-100 
    rounded-md grid place-items-center cursor-pointer text-5xl
    ${isSelected ? "bg-[#09f]":"" }`} key={index}>
      <span>
        {children}
      </span>
    </div>
  )
}
