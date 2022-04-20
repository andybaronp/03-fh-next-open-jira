import { FC } from 'react'

import { Card, CardContent, Typography, CardActions } from '@mui/material'

import { Entry } from '../../interfaces'

interface Props {
  entry: Entry
}

export const EntryCard: FC<Props> = ({ entry }) => {
  return (
    <Card
      sx={{ marginBottom: 1 }}
      /* Eventos de drag */
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
