import React, { useState, useEffect } from 'react'
import SaveButton from './SaveButton'
import ImageDropzone from './ImageDropzone'
import axios from 'axios'
import { toast } from 'react-hot-toast'

const Profile = () => {
  const [image, setImage] = useState<File | null>(null)
  const [errors, setErrors] = useState([])
  const [profile, setProfile] = useState({
    firstname: '',
    lastname: '',
    email: '',
  })

  const nameError = errors.find((item) => item.errorType === 'NAME')
  const emailError = errors.find((item) => item.errorType === 'EMAIL')

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()

    // form object to encode profile data with image data

    console.log('Sending profile to server:', profile)
    axios
      .post('/api/profile', profile)
      .then(() => {
        toast.success('Profile saved.')
        console.log('profile sent to server')
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.errors) {
          console.log(err.response.data.errors)
          setErrors(err.response.data.errors)
          toast.error("Couldn't save profile, check your info.")
          setTimeout(() => {
            setErrors([])
          }, 6000)
        }
      })
  }

  return (
    <section className='flex flex-col justify-start mb-10 z-20 bg-white text-black px-4 pt-2 mt-8 phone:w-80 phone:h-full rounded-md'>
      <h1 className='py-4'>Profile Details</h1>

      <p className='text-sm text-gray-500'>
        Add your details to create a personal touch to your profile.
      </p>
      <article className='flex flex-col justify-center align-middle text-primary.gray text-sm z-50 bg-background rounded-md h-auto w-full my-4 p-4'>
        <h2 className='ml-2'>Profile Picture</h2>
        <ImageDropzone />
        <p className='text-xs text-gray-500 ml-2'>
          Image must be below 1024x1024px. Use PNG or JPG format.
        </p>
      </article>
      <form action='' className='w-full mb-4' onSubmit={handleUpdateProfile}>
        <article className='text-primary.gray text-sm z-50 bg-background rounded-md h-auto w-full my-4 p-6'>
          <div className='mb-4'>
            <label
              className='block text-xs font-medium text-black mb-2'
              htmlFor='firstname'
            >
              First name*
            </label>
            <input
              className={`w-full px-4 py-2 border rounded-md text-black placeholder-primary.gray bg-tertiary.gray ${
                nameError ? 'error-container' : null
              }`}
              id='firstname'
              type='text'
              placeholder='Enter your first name'
              onChange={(e) =>
                setProfile({ ...profile, firstname: e.target.value })
              }
            />
            {nameError && (
              <p className='form-validation-error'>{nameError.error}</p>
            )}
          </div>

          <div className='mb-4'>
            <label
              className='block text-xs font-medium text-black mb-2'
              htmlFor='lastname'
            >
              Last name*
            </label>
            <input
              className={`w-full px-4 py-2 border rounded-md text-black placeholder-primary.gray bg-tertiary.gray ${
                nameError ? 'error-container' : null
              }`}
              id='lastname'
              type='text'
              placeholder='Enter your last name'
              onChange={(e) =>
                setProfile({ ...profile, lastname: e.target.value })
              }
            />
            {nameError && (
              <p className='form-validation-error'>{nameError.error}</p>
            )}
          </div>

          <div className='mb-4'>
            <label
              className='block text-xs font-medium text-black mb-2'
              htmlFor='email'
            >
              Email
            </label>
            <input
              className={`w-full px-4 py-2 border rounded-md text-black placeholder-primary.gray bg-tertiary.gray ${
                emailError ? 'error-container' : null
              }`}
              id='email'
              type='text'
              placeholder='Enter your email'
              onChange={(e) =>
                setProfile({ ...profile, email: e.target.value })
              }
            />
            {emailError && (
              <p className='form-validation-error'>{emailError.error}</p>
            )}
          </div>
        </article>
        <SaveButton />
      </form>
    </section>
  )
}

export default Profile
