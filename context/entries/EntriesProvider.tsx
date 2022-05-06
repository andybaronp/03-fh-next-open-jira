import { FC, useReducer, useEffect } from 'react'

import { v4 as uuidv4 } from 'uuid'

import { EntriesContext, entriesReducer } from './'
import { Entry } from '../../interfaces'
import { entriesApi } from '../../api'

export interface EntriesState {
  entries: Entry[]
}

const Entries_INITIAL_STATE: EntriesState = {
  entries: [],
}

export const EntriesProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE)

  const addNewEntry = async (description: string) => {
    const { data } = await entriesApi.post<Entry>('/entries', { description })

    dispatch({ type: '[Entry] AddEntry', payload: data })
  }

  const upEntry = (entry: Entry) => {
    dispatch({ type: '[Emtry] UpEntry', payload: entry })
  }
  const refreshEntries = async () => {
    const { data } = await entriesApi.get<Entry[]>('/entries')
    dispatch({ type: 'Refresh - Data', payload: data })
  }
  useEffect(() => {
    refreshEntries()
  }, [])

  return (
    //ContextProvider
    <EntriesContext.Provider
      value={{
        ...state,

        // Methods
        addNewEntry,
        upEntry,
      }}
    >
      {children}
    </EntriesContext.Provider>
  )
}
