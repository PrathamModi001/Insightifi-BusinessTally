// components/FileUpload.js
import { useRef, useState } from 'react';
import { styled } from '@mui/system'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Image from 'next/image'
import FileUploadLogo from 'src/assets/images/FileSVG.svg'

// Styled components using MUI's styled API
const DropZone = styled(Grid)(({ theme }) => ({
  marginTop: '30px',
  border: '2px dashed #aaaaaa',
  borderRadius: '5px',
  flexDirection: 'column',
  width: '100%',
  margin: 'auto',
  padding: '20px',
  display: 'flex',
  textAlign: 'center',
  cursor: 'pointer',
  transition: 'border-color 0.3s ease',
  '&:hover': {
    borderColor: theme.palette.primary.main
  }
}))


const FileUpload = () => {
  const inputRef = useRef(null)
  const [files, setFiles] = useState([])

  const handleDrop = event => {
    event.preventDefault()
    const droppedFiles = Array.from(event.dataTransfer.files)
    setFiles(droppedFiles)
  }


  const handleFileInputChange = event => {
    const selectedFiles = Array.from(event.target.files)
    setFiles(selectedFiles)
  }

  return (
    <DropZone
      justifyContent='center'
      alignItems='center'
      sm={12}
      smooth='true'
      md={6}
      gap={'10px'}
      onClick={() => inputRef.current.click()}
      onDrop={handleDrop}
      onDragOver={event => event.preventDefault()}
    >
      <Grid item xs={12} sm={6} direction={'column'} alignItems={'center'} display={'flex'}>
        <Image src={FileUploadLogo} width={50} height={50} alt='FileUploadLogo' />

        <Typography variant='h7' color='inherit' gutterBottom>
          Drag & Drop Image here
        </Typography>
      </Grid>
      <Typography variant='body2' align='center' margin='15px'>
        OR
      </Typography>
      <Grid align='center' width='100%'>
        <input
          accept='.png, .jpg, .jpeg'
          type='file'
          id='fileInput'
          style={{ display: 'none' }}
          name='file'
          multiple
          ref={inputRef}
          onChange={handleFileInputChange}
        />

        <label htmlFor='fileInput'>
          <Button
            variant='contained'
            sx={{
              width: '40%'
            }}
          >
            Upload Image
          </Button>
        </label>
      </Grid>
    </DropZone>
  )
}

export default FileUpload
