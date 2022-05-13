import { FC, DragEvent, useContext } from 'react'
import { useRouter } from 'next/router'

import { Card, CardContent, Typography, CardActions } from '@mui/material'

import { Entry } from '../../interfaces'
import { UIContext } from '../../context/ui/UIContext'
import { dateFormat } from '../../utils'

interface Props {
  entry: Entry
}
export const EntryCard: FC<Props> = ({ entry }) => {
  const router = useRouter()
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
  const onCLick = () => {
    router.push(`/entries/${entry._id}`)
  }
  return (
    <Card
      sx={{ marginBottom: 1, cursor: 'grabbing' }}
      /* Eventos de drag */
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onClick={onCLick}
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
        <Typography variant='body2'>
          {dateFormat.getFormatDistanceToNow(entry.createdAt)}
        </Typography>
      </CardActions>
    </Card>
  )
}
