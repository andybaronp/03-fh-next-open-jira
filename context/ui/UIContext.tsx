import { createContext } from 'react'

interface ContextProp {
  sidemenuOpen: boolean

  // Methods
  openSideMenu: () => void
  closeSideMenu: () => void
}

export const UIContext = createContext({} as ContextProp)
