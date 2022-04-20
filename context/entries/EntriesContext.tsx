import { createContext } from 'react'
import { Entry } from '../../interfaces'

interface ContextProp {
  entries: Entry[]
}

export const EntriesContext = createContext({} as ContextProp)
