interface StaticCellProps {
  children: React.ReactNode;
  isSelected?: boolean;
}

export const StaticCell = ({children, isSelected}:StaticCellProps) => {
  
  return (
    <div className={`w-[100px] h-[100px] border-2 border-gray-100 
    rounded-md grid place-items-center text-5xl
    ${isSelected ? "bg-[#1e59fc]":"" }`}>
      <span>
        {children}
      </span>
    </div>
  )
}
