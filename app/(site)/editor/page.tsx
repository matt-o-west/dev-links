'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Nav from '@/components/Nav'
import Links from '@/components/Links'
import Profile from '@/components/Profile'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import useTabletDetect from '@/hooks/useTabletDetect'
import MobilePreview from '@/components/MobilePreview'
import toast from 'react-hot-toast'
import axios from 'axios'
import useSWR from 'swr'
interface Link {
  id: string
  url: string
  platform: string
}

interface User {
  links: React.JSX.Element[] | undefined
  id: string
  platform: string
  url: string
  createdAt: Date
  userId: string
  username: string
  firstname: string
  lastname: string
  email: string
  profileImage: string
  updatedAt: Date
}

const Editor = () => {
  // State to manage the active button in the toggle
  const isTablet = useTabletDetect()
  const { data: session, status } = useSession()
  const router = useRouter()
  const [activeButton, setActiveButton] = useState('links') // 'links' or 'profile'
  const [preview, setPreview] = useState<Object | null>(null)

  const fetcher = async (url: string) => {
    const response = await axios.get(url).then((res) => res.data)

    if (response.error) {
      toast.error(response.error || 'An unexpected error occurred.')
    }
    return response
  }
  const { error, isLoading, data } = useSWR('/api/profile', fetcher)
  const [profile, setProfile] = useState<User>(
    data || {
      links: [],
      id: '',
      platform: '',
      url: '',
      createdAt: new Date(),
      userId: '',
      username: '',
      firstname: '',
      lastname: '',
      email: '',
      profileImage: '',
      updatedAt: new Date(),
    }
  )

  const gridStyle = isTablet
    ? 'flex flex-col items-center w-auto'
    : 'grid grid-cols-2'

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/signin')
    }
    if (status === 'authenticated') {
      console.log(session, status)
    }
  }, [session, status])

  useEffect(() => {
    console.log(data, profile.lastname)
  })

  return (
    <>
      <Nav activeButton={activeButton} setActiveButton={setActiveButton} />
      <main
        className={`${gridStyle} justify-items-center bg-background min-h-auto pb-10 desktop:px-0 tablet:px-10`}
      >
        {!isTablet && (
          <MobilePreview
            profile={data}
            preview={preview}
            isLoading={isLoading}
          />
        )}
        {activeButton === 'links' && (
          <div className='flex flex-col pb-32 w-full desktop:mr-16 phone:m-0'>
            <Links
              profile={profile}
              setProfile={setProfile}
              isLoading={isLoading}
            />
          </div>
        )}
        {activeButton === 'profile' && (
          <Profile
            profile={profile}
            setProfile={setProfile}
            preview={preview}
            setPreview={setPreview}
          />
        )}
      </main>
    </>
  )
}

export default Editor
