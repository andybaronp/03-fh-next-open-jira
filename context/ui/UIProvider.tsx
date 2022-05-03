import { FC, useReducer } from 'react'
import { UIContext, uiReducer } from './'

export interface UIState {
  sidemenuOpen: boolean
  isAdding: boolean
  isDragging: boolean
}

const UI_INITIAL_STATE: UIState = {
  sidemenuOpen: false,
  isAdding: false,
  isDragging: false,
}

export const UIProvider: FC = ({ children }) => {
  //reducer
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE)

  // Methods
  const openSideMenu = () => dispatch({ type: 'UI - Open Sidebar' })

  const closeSideMenu = () => dispatch({ type: 'UI - Close Sidebar' })

  const setIsAddingEntry = (stateAdding: boolean) => {
    dispatch({ type: 'UI - AddEntry', payload: stateAdding })
  }
  const StarDragging = () => dispatch({ type: 'UI Start Drag' })
  const EndDragging = () => dispatch({ type: 'UI End Drag' })

  return (
    //ContextProvider
    <UIContext.Provider
      value={{
        ...state,
        // Methods
        openSideMenu,
        closeSideMenu,
        setIsAddingEntry,
        StarDragging,
        EndDragging,
      }}
    >
      {children}
    </UIContext.Provider>
  )
}
