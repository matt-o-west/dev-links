'use client'
import Image from 'next/image'
import { useSession } from 'next-auth/react' // Make sure to define a signUp function or use another function for registration
import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { toast } from 'react-hot-toast'

export default function Register() {
  const router = useRouter()
  const [data, setData] = useState({
    email: '',
    password: '',
    username: '',
  })
  const registerUser = async (e) => {
    e.preventDefault()
    console.log('Registering user')
    axios
      .post('/api/auth/register', data)
      .then(() => {
        toast.success('User registered successfully')
      })
      .catch((err) => {
        console.log(err)
      })
    router.push('/')
  }

  return (
    <main className='min-h-screen flex items-center justify-center bg-background'>
      <div className='w-full max-w-md desktop:mb-0 phone:mb-16'>
        <div className='flex items-center justify-center mb-6 phone:aboslute phone:top-10'>
          <Image
            src='./images/logo-devlinks-large.svg'
            alt='Devlinks Logo'
            width={200}
            height={200}
            className='mb-1'
          />
        </div>

        <div className='p-6 pb-8 mx-6 phone:mx-2'>
          <h1 className='text-2xl font-bold text-black mb-6'>Register</h1>
          <form action='' onSubmit={registerUser}>
            <div className='mb-4'>
              <div className='mb-4'>
                <label
                  className='block text-sm font-medium text-black mb-2'
                  htmlFor='password'
                >
                  Username
                </label>
                <input
                  className='w-full px-4 py-2 border rounded-md text-black placeholder-primary.gray bg-tertiary.gray'
                  id='username'
                  type='username'
                  placeholder='Enter your username'
                  onChange={(e) =>
                    setData({ ...data, username: e.target.value })
                  }
                />
              </div>
              <label
                className='block text-sm font-medium text-black mb-2'
                htmlFor='email'
              >
                Email
              </label>
              <input
                className='w-full px-4 py-2 border rounded-md text-black placeholder-primary.gray bg-tertiary.gray'
                id='email'
                type='text'
                placeholder='Enter your email'
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
            </div>

            <div className='mb-4'>
              <label
                className='block text-sm font-medium text-black mb-2'
                htmlFor='password'
              >
                Password
              </label>
              <input
                className='w-full px-4 py-2 border rounded-md text-black placeholder-primary.gray bg-tertiary.gray'
                id='password'
                type='password'
                placeholder='Enter your password'
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
            </div>

            <button
              type='submit'
              className='w-full py-2 px-4 bg-primary.blue text-white font-bold rounded-md hover:bg-secondary.blue'
            >
              Register
            </button>
          </form>
          <div className='flex mt-4 justify-center flex-wrap'>
            <span className='text-black'>Already have an account?</span>
            <Link
              href='/signin' // Update this with your login page link
              className='desktop:block phone:flex phone:flex-nowrap justify-center ml-2 text-primary.blue hover:text-secondary.blue'
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
