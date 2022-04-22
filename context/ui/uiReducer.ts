import { UIState } from './'

type UIActionType =
  | { type: 'UI - Open Sidebar' }
  | { type: 'UI - Close Sidebar' }
  | { type: 'UI - AddEntry'; payload: boolean }
  | { type: 'UI Start Drag' }
  | { type: 'UI End Drag' }

export const uiReducer = (state: UIState, action: UIActionType): UIState => {
  switch (action.type) {
    case 'UI - Open Sidebar':
      return {
        ...state,
        sidemenuOpen: true,
      }
    case 'UI - Close Sidebar':
      return {
        ...state,
        sidemenuOpen: false,
      }
    case 'UI - AddEntry':
      return {
        ...state,
        isAdding: action.payload,
      }
    case 'UI Start Drag':
      return {
        ...state,
        isDragging: true,
      }
    case 'UI End Drag':
      return {
        ...state,
        isDragging: false,
      }
    default:
      return state
  }
}
