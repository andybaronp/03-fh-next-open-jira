import { ChangeEvent, useState, useMemo } from 'react'
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
import { EntryStatus } from '../../interfaces'

const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished']

const EntryPage = () => {
  const [inputValue, setInputValue] = useState('')
  const [status, setStatus] = useState<EntryStatus>('pending')
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
    console.log({ inputValue, status })
  }
  return (
    <Layout title='.......'>
      <Grid container justifyContent='center' sx={{ marginTop: 2 }}>
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader
              title={`Entrada ${inputValue}`}
              subheader={`Creada hace:.... minutos`}
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
      >
        <DeleteForeverOutlinedIcon />
      </IconButton>
    </Layout>
  )
}

export default EntryPage
