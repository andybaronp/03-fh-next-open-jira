import { ChangeEvent, useState, useContext } from 'react'

import { Box, Button, TextField } from '@mui/material'
import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined'
import SaveAsOutlinedIcon from '@mui/icons-material/SaveAsOutlined'
import { EntriesContext } from '../../context/entries'
import { UIContext } from '../../context/ui/UIContext'

const NewEntry = () => {
  //context
  const { addNewEntry } = useContext(EntriesContext)
  const { isAdding, setIsAddingEntry } = useContext(UIContext)

  //states
  const [inputValue, setInputValue] = useState('')
  const [touched, setTouched] = useState(false)

  const onTextFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }
  const onSave = () => {
    if (inputValue.length === 0) return

    addNewEntry(inputValue)
    setIsAddingEntry(false)
    setInputValue('')
    setTouched(false)
  }
  return (
    <Box sx={{ padding: 2, marginBottom: 2 }}>
      {isAdding ? (
        <>
          <TextField
            fullWidth
            label='Nueva entrada'
            placeholder='Nueva entrada'
            multiline
            autoFocus
            helperText={inputValue.length <= 0 && touched && 'Ingrese un valor'}
            error={inputValue.length <= 0 && touched}
            sx={{ marginTop: 2, marginBottom: 1 }}
            value={inputValue}
            onChange={onTextFieldChange}
            onBlur={() => setTouched(true)}
          />
          <Box display='flex' justifyContent='space-between'>
            <Button onClick={() => setIsAddingEntry(false)}>Cancelar</Button>{' '}
            <Button
              variant='outlined'
              endIcon={<SaveAsOutlinedIcon />}
              color='secondary'
              onClick={onSave}
            >
              Guardar
            </Button>
          </Box>
        </>
      ) : (
        <Button
          variant='outlined'
          fullWidth
          startIcon={<AddCommentOutlinedIcon />}
          onClick={() => setIsAddingEntry(true)}
        >
          Nueva entrada
        </Button>
      )}
    </Box>
  )
}

export default NewEntry
