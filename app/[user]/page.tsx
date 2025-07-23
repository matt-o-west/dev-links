import React from 'react'
import axios from 'axios'
import ProfilePreview from '@/components/ProfilePreview'

interface DevLinksProps {
  id: string
  email: string
  username: string
  firstname: string
  lastname: string
  profileImage: string
  links: [
    {
      id: string
      url: string
      platform: string
    }
  ]
}
interface Link {
  id: string
  url: string
  platform: string
}

const DevLinks = async ({ params }: { params: { user: DevLinksProps } }) => {
  const user = params.user

  const { data } = await axios.post(
    'https://dev-links-black.vercel.app/api/devLink',
    {
      user: user,
    }
  )
  const profile = data

  return (
    <div className='flex flex-col bg-background items-center h-screen'>
      <div className='w-full h-1/3 bg-primary.blue absolute rounded-b-3xl top-0 left-0 z-0' />

      <ProfilePreview profile={profile} />
    </div>
  )
}

export default DevLinks
