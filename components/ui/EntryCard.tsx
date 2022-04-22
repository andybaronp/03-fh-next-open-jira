import { FC, DragEvent, useContext } from 'react'

import { Card, CardContent, Typography, CardActions } from '@mui/material'

import { Entry } from '../../interfaces'
import { UIContext } from '../../context/ui/UIContext'

interface Props {
  entry: Entry
}
export const EntryCard: FC<Props> = ({ entry }) => {
  const { EndDragging, StarDragging } = useContext(UIContext)
  //Funtions Drag on Drop
  const onDragStart = (event: DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData('text', entry._id)
    //Todo: modificar el state
    StarDragging()
  }
  //Funtions Drag on Drop
  const onDragEnd = () => {
    //TOdo: cancelar el DRAg
    EndDragging()
  }

  return (
    <Card
      sx={{ marginBottom: 1 }}
      /* Eventos de drag */
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <CardContent>
        <Typography sx={{ whiteSpace: 'pre-line' }}>
          {entry.description}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          display: 'flex',
          justifyContent: 'end',
          paddingRight: 2,
        }}
      >
        <Typography variant='body2'>hace 30 min</Typography>
      </CardActions>
    </Card>
  )
}
