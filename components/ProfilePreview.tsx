'use client'
import React, { useEffect } from 'react'
import Image from 'next/image'
import CustomLinkBlock from './CustomLinkBlock'
import PreviewSkeleton from './skeletons/PreviewSkeleton'

interface ProfilePreviewProps {
  profile: {
    links: {
      id: string
      url: string
      platform: string
    }[]
    id: string
    userUrl: string
    createdAt: Date
    userId: string
    username: string
    firstname: string
    lastname: string
    email: string
    profileImage: string
    updatedAt: Date
  }
  isOverlay?: boolean
  preview?: {
    preview: string
  } | null
  isLoading?: boolean
}

const ProfilePreview = ({
  profile,
  isOverlay = false,
  preview,
  isLoading,
}: ProfilePreviewProps) => {
  const shape = isOverlay ? 'w-60 h-[3.75rem]' : 'w-72 h-[4.55rem]'
  const placeholderLink = {
    id: 'placeholder',
    url: '',
    platform: '',
  }

  const imageSrc = profile?.profileImage

  if (isLoading) {
    return <PreviewSkeleton isOverlay={isOverlay} />
  }

  console.log(
    'name length:',
    profile?.firstname?.length + profile?.lastname?.length
  )

  return (
    <div
      className={`${
        isOverlay
          ? 'w-64 h-full pb-2 mt-10 mx-1 flex flex-col items-center justify-center bg-white'
          : 'flex flex-col items-center justify-center mt-10 pb-4 px-10 w-auto bg-white z-10 shadow-2xl rounded-lg'
      }`}
    >
      <div
        className={`border-4 border-primary.blue rounded-full mt-16 relative ${
          isOverlay ? 'w-24 h-24' : 'h-32 w-32 '
        }`}
      >
        {imageSrc && (
          <Image
            src={imageSrc}
            alt='Profile Image'
            layout='fill'
            objectFit='cover'
            className='rounded-full absolute top-0 left-0 z-10 overflow-hidden'
          />
        )}
        {(!imageSrc || isLoading) && (
          <div className='rounded-full absolute top-0 left-0 z-10 bg-secondary.gray w-full h-full' />
        )}
      </div>

      <h1
        className={`${
          isOverlay &&
          profile?.firstname?.length + profile?.lastname?.length >= 14
            ? 'text-2xl'
            : 'text-4xl'
        } mt-4 text-black`}
      >
        <span className='text-primary.blue font-semibold'>{'{'}</span>
        {(profile?.firstname || 'Your') + ' ' + (profile?.lastname || 'Name') ||
          profile?.username ||
          'Your Name Here'}
        <span className='text-primary.blue font-semibold'>{'}'}</span>
      </h1>
      <h3
        className={`${
          isOverlay && profile?.email?.length > 20 ? 'text-lg' : 'text-xl'
        } mt-4 text-black`}
      >
        <span className='text-primary.blue font-semibold'>{'{'}</span>
        {profile?.email || 'Your email here'}
        <span className='text-primary.blue font-semibold'>{'}'}</span>
      </h3>
      <section
        className={`flex flex-col w-72 mt-10 justify-center items-center ${
          isOverlay ? 'w-60' : ''
        }`}
      >
        {!isOverlay &&
          profile?.links?.map((link, index) => (
            <CustomLinkBlock
              key={link?.id}
              index={index}
              link={link}
              platform={link.platform}
              shape={shape}
              isOverlay={isOverlay}
            />
          ))}
        {isOverlay &&
          profile.links.length >= 3 &&
          profile.links
            .slice(0, 3)
            .map((link, index) => (
              <CustomLinkBlock
                key={link?.id}
                index={index}
                link={link}
                platform={link?.platform}
                shape={shape}
                isOverlay={isOverlay}
              />
            ))}
        {isOverlay && profile.links.length < 3 && (
          <>
            {profile.links.map((link, index) => (
              <CustomLinkBlock
                key={link?.id}
                index={index}
                link={link}
                platform={link?.platform}
                shape={shape}
                isOverlay={isOverlay}
              />
            ))}

            {Array.from({ length: 3 - profile.links.length }).map(
              (link, index) => (
                <CustomLinkBlock
                  key={`placeholder-${index}`}
                  index={index}
                  link={placeholderLink}
                  platform={''}
                  shape={shape}
                  isOverlay={isOverlay}
                />
              )
            )}
          </>
        )}
      </section>
    </div>
  )
}

export default ProfilePreview
