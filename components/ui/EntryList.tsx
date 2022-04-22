import { FC, useContext, useMemo, DragEvent } from 'react'
import { List, Paper } from '@mui/material'
import { EntryCard } from './EntryCard'
import { EntryStatus } from '../../interfaces'
import { EntriesContext } from '../../context/entries/EntriesContext'
import { UIContext } from '../../context/ui'
import style from './EntryList.module.css'
import { Entry } from '../../interfaces/entry'

interface Props {
  status: EntryStatus
}

export const EntryList: FC<Props> = ({ status }) => {
  // context
  const { entries, upEntry } = useContext(EntriesContext)
  const { isDragging, EndDragging } = useContext(UIContext)

  const entriesByStatus = useMemo(
    () => entries.filter((entry) => entry.status === status),
    [entries, status]
  )

  //Funtions Drag on Drop
  const onDropEntry = (event: DragEvent<HTMLDivElement>) => {
    const id = event.dataTransfer.getData('text')

    const entry = entries.find((entry) => entry._id === id)!
    entry.status = status
    upEntry(entry)
    EndDragging()
  }

  //Funtions Drag on Drop
  const allowDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }
  return (
    <div
      onDrop={onDropEntry}
      onDragOver={allowDrop}
      className={isDragging ? style.isDragging : ''}
    >
      <Paper
        sx={{
          height: 'calc(100vh - 100px)',
          //  overflow: 'scroll',
          backgroundColor: 'transparent',
          padding: '1px 5px',
        }}
      >
        <List sx={{ opacity: isDragging ? 0.2 : 1 }}>
          {entriesByStatus.map((entry) => (
            <EntryCard key={entry._id} entry={entry} />
          ))}
        </List>
      </Paper>
    </div>
  )
}
