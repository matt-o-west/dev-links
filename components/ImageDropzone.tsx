import React, { useEffect, useCallback } from 'react'
import axios from 'axios'
import Image from 'next/image'
import { useDropzone } from 'react-dropzone'
import { toast } from 'react-hot-toast'

const ImageDropzone = () => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/png': ['.png'],
      'text/html': ['.html', '.htm'],
    },
    onDrop: async (acceptedFiles) => {
      // Directly defining the onDrop function
      const data = new FormData()
      data.append('file', acceptedFiles[0])
      const test = await axios.post('/api/imageUpload', data)
      console.log(test.data)
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0]
        const formData = new FormData()
        formData.set('file', file)
        console.log(file)

        const response = await axios
          .post('/api/imageUpload', formData)
          .then((response) => {
            toast.success('Image uploaded successfully.')
            console.log('Upload response:', response.data)
          })
          .catch((error) => {
            console.log('Error: ' + error.message)
          })
      }
    },
  })

  return (
    <div
      {...getRootProps()}
      className={`flex flex-col items-center align-middle h-40 w-50 bg-tertiary.blue rounded-md m-2 mr-8 pt-6 pb-8 ${
        isDragActive && 'border-secondary.blue border-2'
      }`}
    >
      <input {...getInputProps()} />
      <Image
        src='./images/icon-upload-image.svg'
        alt='profile picture'
        width={36}
        height={36}
        className='rounded-full mt-4 mb-2'
      />
      <p className='font-bold text-primary.blue'>
        <span>+</span> Upload Image
      </p>
      {isDragActive ? <p>Drop your file here</p> : null}
    </div>
  )
}

export default ImageDropzone
