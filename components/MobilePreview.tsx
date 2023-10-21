import React from 'react'
import Image from 'next/image'
import ProfilePreview from '@/components/ProfilePreview'

const MobilePreview = ({ profile }) => {
  return (
    <div className='flex flex-col col-span-1 mt-10 p-2 relative'>
      <Image
        src='/images/illustration-phone-mockup.svg'
        alt='Profile Image'
        width={128}
        height={128}
        className='w-auto'
      />
      <div className='absolute z-10 flex flex-col items-center justify-center ml-6'>
        <ProfilePreview profile={profile} isOverlay={true} />
      </div>
    </div>
  )
}

export default MobilePreview
