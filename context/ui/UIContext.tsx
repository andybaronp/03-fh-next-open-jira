import { createContext } from 'react'

//  const [isAdding, setIsAdding] = useState(false)

interface ContextProp {
  sidemenuOpen: boolean
  isAdding: boolean
  isDragging: boolean

  // Methods
  openSideMenu: () => void
  closeSideMenu: () => void
  setIsAddingEntry: (stateAdding: boolean) => void
  StarDragging: () => void
  EndDragging: () => void
}

export const UIContext = createContext({} as ContextProp)
