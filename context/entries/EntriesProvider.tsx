import { FC, useReducer, useEffect } from 'react'

import { useSnackbar } from 'notistack'

import { EntriesContext, entriesReducer } from './'
import { Entry } from '../../interfaces'
import { entriesApi } from '../../api'

export interface EntriesState {
  entries: Entry[]
}

const Entries_INITIAL_STATE: EntriesState = {
  entries: [],
}

export const EntriesProvider: FC = ({ children }: any) => {
  const { enqueueSnackbar } = useSnackbar()
  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE)

  // New Entry
  const addNewEntry = async (description: string) => {
    try {
      const { data } = await entriesApi.post<Entry>('/entries', { description })
      dispatch({ type: '[Entry] AddEntry', payload: data })
    } catch (error) {
      console.log(error)
    }
  }

  // Update State Entry
  const upEntry = async (
    { _id, status, description }: Entry,
    showSnackbar = false
  ) => {
    try {
      const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, {
        description,
        status,
      })
      dispatch({ type: '[Entry] UpEntry', payload: data })
      if (showSnackbar)
        enqueueSnackbar('Entrada actualizada', {
          variant: 'success',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
          autoHideDuration: 1500,
        })
    } catch (error) {
      console.log(error)
    }
  }
  // Get Entries
  const refreshEntries = async () => {
    try {
      const { data } = await entriesApi.get<Entry[]>('/entries')
      dispatch({ type: 'Refresh - Data', payload: data })
    } catch (error) {
      console.log(error)
    }
  }

  // Deleted Entry
  const deletedEntry = async (entry: Entry, showSnackbar = false) => {
    const { data } = await entriesApi.delete<Entry>(`/entries/${entry._id}`)
    dispatch({ type: '[Entry] Deleted', payload: data })
    if (showSnackbar)
      enqueueSnackbar(
        `Entrada ${entry.description.substring(0, 20)}... eliminada`,
        {
          variant: 'error',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
          autoHideDuration: 1900,
        }
      )
  }

  useEffect(() => {
    refreshEntries()
  }, [state])

  return (
    //ContextProvider
    <EntriesContext.Provider
      value={{
        ...state,

        // Methods
        addNewEntry,
        upEntry,
        deletedEntry,
      }}
    >
      {children}
    </EntriesContext.Provider>
  )
}
