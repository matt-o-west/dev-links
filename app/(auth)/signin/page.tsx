'use client'
import Image from 'next/image'
import { signIn, useSession } from 'next-auth/react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { toast } from 'react-hot-toast'
import AlertCard from '@/components/AlertCard'
import LoadingSpinner from '@/components/LoadingSpinner'

interface CredentialsError {
  message: string
  active: boolean
}

export default function SignIn() {
  const [data, setData] = useState({
    email: 'vangogh@gmail.com',
    password: 'StarryNight123*',
    redirect: false,
  })
  const searchParams = useSearchParams()
  const loginError = searchParams.get('error') || null
  const [error, setError] = useState<CredentialsError>({
    message: loginError || '',
    active: false,
  })
  const [credentialsLoading, setCredentialsLoading] = useState(false)
  const [githubLoading, setGithubLoading] = useState(false)
  const [demo, setDemo] = useState(true)

  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/editor')
    }
  }, [session, status, router])

  const handleCredentialsLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('login function runs')
    setCredentialsLoading(true)
    await signIn('credentials', {
      ...data,
    }).then((callback) => {
      if (callback?.error) {
        setError({ message: callback?.error, active: true })
        setTimeout(() => {
          setError({
            message: '',
            active: false,
          })
        }, 5000)
        setCredentialsLoading(false)
      }
      if (callback?.ok && !callback?.error) {
        toast.success('Login successful')
        setCredentialsLoading(false)
      }
    })
  }

  const handleGithubLogin = (callbackUrl: string) => {
    setGithubLoading(true)
    signIn('github', { callbackUrl }).then((callback) => {
      if (callback?.error) {
        setError({ message: callback?.error, active: true })
        setTimeout(() => {
          setError({
            message: '',
            active: false,
          })
        }, 5000)
        setGithubLoading(false)
      }
      if (callback?.ok && !callback?.error) {
        toast.success('Login successful')
        setGithubLoading(false)
      }
    })
  }

  return (
    <>
      <h1 className='text-2xl font-bold text-black mb-6'>Login</h1>
      {demo && (
        <AlertCard type='info'>
          Demo credentials are provided. Use the demo account, create your own
          account, or log in with Github.
        </AlertCard>
      )}
      <form action='' onSubmit={handleCredentialsLogin}>
        <div className='mb-4'>
          <label
            className='block text-sm font-medium text-primary.gray mb-2'
            htmlFor='username'
          >
            Email
          </label>
          <input
            className={`w-full px-4 py-2 border rounded-md text-black placeholder-primary.gray bg-tertiary.gray ${
              error.active && 'error-container'
            }`}
            id='username'
            type='text'
            placeholder='Enter your username'
            onChange={(e) => setData({ ...data, email: e.target.value })}
            value={data.email}
          />
        </div>

        <div className='mb-4'>
          <label
            className='block text-sm font-medium text-primary.gray mb-2'
            htmlFor='password'
          >
            Password
          </label>
          <input
            className={`w-full px-4 py-2 border rounded-md text-black placeholder-primary.gray bg-tertiary.gray ${
              error.active && 'error-container'
            }`}
            id='password'
            type='password'
            placeholder='Enter your password'
            onChange={(e) => setData({ ...data, password: e.target.value })}
            minLength={5}
            value={data.password}
          />
        </div>
        {error.active && (
          <p className='form-validation-error'>{error.message}</p>
        )}
        {/*<div className='flex justify-end'>
          <Link
            href='/forgot-password'
            className='text-primary.blue hover:text-secondary.blue'
          >
            Forgot password?
          </Link>
        </div>*/}

        <div className='flex flex-col space-y-4 mt-6'>
          <button
            type='submit'
            className='w-full py-[0.82rem] px-4 bg-primary.blue text-white font-bold rounded-md hover:bg-secondary.blue'
          >
            {credentialsLoading ? <LoadingSpinner /> : 'Login'}
          </button>
        </div>
      </form>
      <button
        className='w-full py-[0.82rem] px-4 my-4 bg-charcoal text-white font-bold rounded-md hover:bg-primary.gray'
        onClick={() => handleGithubLogin('/editor')}
      >
        {githubLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <Image
              src='./images/icon-github.svg'
              alt='Github Logo'
              width={20}
              height={20}
              className='inline-block mr-5 mb-1'
            />
            Login with Github
          </>
        )}
      </button>
      <div className='flex mt-4 justify-center flex-wrap'>
        <span className='text-black'>Don&apos;t have an account?</span>
        <Link
          href='/register'
          className='desktop:block phone:flex phone:flex-nowrap justify-center ml-2 text-primary.blue hover:text-secondary.blue'
        >
          Create one.
        </Link>
      </div>
    </>
  )
}
