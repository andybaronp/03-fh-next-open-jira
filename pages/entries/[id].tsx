import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'

import { ChangeEvent, useState, useMemo, FC, useContext } from 'react'
import {
  Card,
  Grid,
  CardHeader,
  CardContent,
  TextField,
  CardActions,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  capitalize,
  IconButton,
} from '@mui/material'
import SaveAsOutlinedIcon from '@mui/icons-material/SaveAsOutlined'
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined'
import { Layout } from '../../components/layouts'
import { Entry, EntryStatus } from '../../interfaces'

import { dbEntries } from '../../database'
import { EntriesContext } from '../../context/entries'
import { dateFormat } from '../../utils'

const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished']

interface Props {
  entry: Entry
}
const EntryPage: FC<Props> = ({ entry }) => {
  const router = useRouter()
  const { upEntry, deletedEntry } = useContext(EntriesContext)
  const [inputValue, setInputValue] = useState(entry.description)
  const [status, setStatus] = useState<EntryStatus>(entry.status)
  const [touched, setTouched] = useState(false)

  const isNotValid = useMemo(
    () => inputValue.length < 2 && touched,
    [inputValue, touched]
  )

  const onInputValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }
  const onStatusChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.value as EntryStatus)
  }

  const onSave = () => {
    if (inputValue.trim().length === 0) return
    const updatedEntry = {
      ...entry,
      status,
      description: inputValue,
    }
    upEntry(updatedEntry, true)
    router.push('/')
  }

  const onDeleted = () => {
    deletedEntry(entry, true)
    router.push('/')
  }
  return (
    <Layout title={inputValue.substring(0, 15) + '...'}>
      <Grid container justifyContent='center' sx={{ marginTop: 2 }}>
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader
              title='Entrada:'
              subheader={`Creada ${dateFormat.getFormatDistanceToNow(
                entry.createdAt
              )}`}
            ></CardHeader>
            <CardContent>
              <TextField
                sx={{ marginTob: 2, marginBottom: 2 }}
                fullWidth
                placeholder='Nueva entrada'
                autoFocus
                multiline
                label='Actualizar entrada'
                value={inputValue}
                onBlur={() => setTouched(true)}
                onChange={onInputValueChange}
                helperText={isNotValid && 'Ingrese un Valor'}
                error={isNotValid}
              />
              <FormControl>
                <FormLabel>Estado: </FormLabel>
                <RadioGroup row value={status} onChange={onStatusChanged}>
                  {validStatus.map((option) => (
                    <FormControlLabel
                      key={option}
                      value={option}
                      control={<Radio />}
                      label={capitalize(option)}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </CardContent>
            <CardActions>
              <Button
                startIcon={<SaveAsOutlinedIcon />}
                variant='contained'
                fullWidth
                onClick={onSave}
                disabled={inputValue.length < 2}
              >
                Save
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      <IconButton
        sx={{
          position: 'fixed',
          right: 30,
          bottom: 30,
          backgroundColor: 'error.dark',
        }}
        onClick={onDeleted}
      >
        <DeleteForeverOutlinedIcon />
      </IconButton>
    </Layout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string }
  const entry = await dbEntries.getEntryByID(id)
  if (!entry) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  return {
    props: {
      entry,
    },
  }
}

export default EntryPage
