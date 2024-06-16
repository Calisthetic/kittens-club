export default function SidebarButton({onClick, isActive}:{onClick:() => void, isActive:boolean}) {
  return (
    <button onClick={onClick} className="bg-transparent hover:bg-background-secondary">
      <svg className="h-8 w-8 stroke-none pointer-events-auto cursor-pointer transition-transform" 
      xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512">
        <polygon points="64 148 488 148 488 108 64 108 Z"></polygon>
        <polygon points="64 276 488 276 488 236 64 236 Z"></polygon>
        <polygon points="64 404 488 404 488 364 64 364 Z"></polygon>
      </svg>
    </button>
  )
}