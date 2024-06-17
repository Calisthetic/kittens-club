export default function SidebarButton({onClick, isActive}:{onClick:() => void, isActive:boolean}) {
  return (
    <button onClick={onClick} className="bg-transparent hover:bg-background-secondary">
      <svg fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8 cursor-pointer pointer-events-auto">
        <line x1="3" x2="21" y1="12" y2="12"/><line x1="3" x2="21" y1="6" y2="6"/><line x1="3" x2="21" y1="18" y2="18"/>
      </svg>
    </button>
  )
}