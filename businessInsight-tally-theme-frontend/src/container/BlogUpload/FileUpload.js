import React, { useRef, useState } from 'react'
import { styled } from '@mui/system'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import LinearProgress from '@mui/material/LinearProgress'
import FileUploadLogo from '../../assets/images/FileSVG.svg'
import Box from '@mui/material/Box'
import Image from 'next/image'

const DropZone = styled(Grid)(({ theme }) => ({
  marginTop: '30px',
  border: '2px dashed #aaaaaa',
  borderRadius: '5px',
  flexDirection: 'column',
  width: '80%',
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

const FileList = styled('div')({
  marginTop: '10px',
  width: 'fit-content',
  margin: '10px auto'
})

const FileItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '10px',
  padding: '10px',
  justifyContent: 'space-between',
  border: '1px solid #ddd',
  borderRadius: '5px',
  backgroundColor: '#fff',
  width: '100%',
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
}))

const FileName = styled('span')(({ theme }) => ({
  fontSize: '14px',
  fontWeight: 'bold',
  color: theme.palette.primary.main
}))

const ProgressBar = styled(LinearProgress)(({ theme }) => ({
  width: '90%',
  marginTop: '10px',
  '& .MuiLinearProgress-bar': {
    backgroundColor: theme.palette.primary.main
  }
}))

const FileUpload = ({ files, setFiles }) => {
  const inputRef = useRef(null)
  const [errorMessage, setErrorMessage] = useState('')
  const MAX_FILES = 1

  const handleDeleteFile = index => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index))
    if (inputRef.current) {
      inputRef.current.value = null
    }
  }

  const handleDrop = event => {
    event.preventDefault()

    const droppedFiles = Array.from(event.dataTransfer.files)
      .slice(0, MAX_FILES - files.length)
      .map(file => ({
        file,
        progress: 0,
        uploaded: false,
        url: URL.createObjectURL(file) // Store URL for each file
      }))
    setFiles(prevFiles => [...prevFiles, ...droppedFiles])

    droppedFiles.forEach((file, index) => uploadFile(file, files.length + index))
  }

  const handleFileInputChange = event => {
    const selectedFiles = Array.from(event.target.files)
      .slice(0, MAX_FILES - files.length)
      .map(file => ({
        file,
        progress: 0,
        uploaded: false,
        url: URL.createObjectURL(file) // Store URL for each file
      }))
    setFiles(prevFiles => [...prevFiles, ...selectedFiles])
    selectedFiles.forEach((file, index) => uploadFile(file, files.length + index))
  }

  const uploadFile = (file, index) => {
    const interval = setInterval(() => {
      setFiles(prevFiles => {
        const newFiles = [...prevFiles]
        newFiles[index].progress += 10
        if (newFiles[index].progress >= 100) {
          newFiles[index].progress = 100
          newFiles[index].uploaded = true
          clearInterval(interval)
        }

        return newFiles
      })
    }, 200)
  }

  return (
    <>
      <DropZone
        justifyContent='center'
        alignItems='center'
        sm={12}
        md={6}
        gap={'10px'}
        onClick={() => inputRef.current.click()}
        onDrop={handleDrop}
        onDragOver={event => event.preventDefault()}
      >
        <Grid item xs={12} sm={6} direction={'column'} alignItems={'center'} display={'flex'}>
          {/* Use <img> directly instead of <Image> component */}
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
            <Button variant='contained' sx={{ minWidth: '50%' }}>
              Choose Image
            </Button>
          </label>
        </Grid>
      </DropZone>
      <FileList>
        {errorMessage && (
          <Typography variant='h6' color='error' gutterBottom sx={{ textAlign: 'center', marginTop: '20px' }}>
            {errorMessage}
          </Typography>
        )}
        {files.length > 0
          ? files.map((fileObj, index) => (
              <FileItem key={index}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {/* Render image using the stored URL */}
                  <img
                    src={fileObj.url}
                    alt={fileObj.file.name}
                    style={{ width: '50px', height: '50px', borderRadius: '5px' }}
                  />
                  <div>
                    <FileName>{fileObj.file.name}</FileName>
                    <Typography variant='body2' color='textSecondary'>
                      {fileObj.uploaded ? 'Upload completed' : 'Uploading...'}
                    </Typography>
                    <ProgressBar variant='determinate' value={fileObj.progress} />
                  </div>
                </div>
                <div>
                  <Button onClick={() => handleDeleteFile(index)}>
                    <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
                      <g clipPath='url(#clip0_51_1940)'>
                        <path
                          d='M10.0001 18.3334C14.6025 18.3334 18.3334 14.6024 18.3334 10C18.3334 5.39765 14.6025 1.66669 10.0001 1.66669C5.39771 1.66669 1.66675 5.39765 1.66675 10C1.66675 14.6024 5.39771 18.3334 10.0001 18.3334Z'
                          stroke='#ADB2B7'
                          strokeWidth='2'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                        <path
                          d='M12.5 7.5L7.5 12.5'
                          stroke='#ADB2B7'
                          strokeWidth='2'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                        <path
                          d='M7.5 7.5L12.5 12.5'
                          stroke='#ADB2B7'
                          strokeWidth='2'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                      </g>
                      <defs>
                        <clipPath id='clip0_51_1940'>
                          <rect width='20' height='20' fill='white' />
                        </clipPath>
                      </defs>
                    </svg>
                  </Button>
                </div>
              </FileItem>
            ))
          : null}
        {files.length >= MAX_FILES + 1 && (
          <Typography variant='body2' color='error' gutterBottom sx={{ textAlign: 'center', marginTop: '20px' }}>
            Maximum of {MAX_FILES} files allowed.
          </Typography>
        )}
      </FileList>
    </>
  )
}

export default FileUpload
