import { FC, useReducer } from 'react'
import { UIContext, uiReducer } from './'

export interface UIState {
  sidemenuOpen: boolean
}

const UI_INITIAL_STATE: UIState = {
  sidemenuOpen: false,
}

export const UIProvider: FC = ({ children }) => {
  //reducer
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE)

  // Methods
  const openSideMenu = () => dispatch({ type: 'UI - Open Sidebar' })

  const closeSideMenu = () => dispatch({ type: 'UI - Close Sidebar' })

  return (
    //ContextProvider
    <UIContext.Provider
      value={{
        sidemenuOpen: state.sidemenuOpen,
        // Methods
        openSideMenu,
        closeSideMenu,
      }}
    >
      {children}
    </UIContext.Provider>
  )
}
