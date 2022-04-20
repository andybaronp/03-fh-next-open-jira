import { ChangeEvent, useState } from 'react'

import { Box, Button, TextField } from '@mui/material'
import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined'
import SaveAsOutlinedIcon from '@mui/icons-material/SaveAsOutlined'

const NewEntry = () => {
  const [isAdding, setIsAdding] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [touched, setTouched] = useState(false)

  const onTextFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }
  const onSave = () => {
    if (inputValue.length === 0) return
    console.log(inputValue)
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
            <Button onClick={() => setIsAdding(false)}>Cancelar</Button>{' '}
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
          onClick={() => setIsAdding(true)}
        >
          Nueva entrada
        </Button>
      )}
    </Box>
  )
}

export default NewEntry
