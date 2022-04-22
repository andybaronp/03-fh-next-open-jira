import { createContext } from 'react'
import { Entry } from '../../interfaces'

interface ContextProp {
  entries: Entry[]

  // Methods
  addNewEntry: (description: string) => void
  upEntry: (entry: Entry) => void
}

export const EntriesContext = createContext({} as ContextProp)
