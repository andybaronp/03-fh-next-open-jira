import { FC, useReducer } from 'react'

import { v4 as uuidv4 } from 'uuid'

import { EntriesContext, entriesReducer } from './'
import { Entry } from '../../interfaces'

export interface EntriesState {
  entries: Entry[]
}

const Entries_INITIAL_STATE: EntriesState = {
  entries: [
    {
      _id: uuidv4(),
      description: 'PENDIN lorem lorem lorme lalsalsla',
      createdAt: Date.now(),
      status: 'pending',
    },
    {
      _id: uuidv4(),
      description: 'PROGRESSS 111111lorem lorem lorme lalsalsla',
      createdAt: Date.now() - 1000000,
      status: 'in-progress',
    },
    {
      _id: uuidv4(),
      description: 'FINISH:lorem lorem lorme lalsalsla',
      createdAt: Date.now() - 100000,
      status: 'finish',
    },
  ],
}

export const EntriesProvider: FC = ({ children }) => {
  //reducer
  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE)

  return (
    //ContextProvider
    <EntriesContext.Provider
      value={{
        ...state,
      }}
    >
      {children}
    </EntriesContext.Provider>
  )
}