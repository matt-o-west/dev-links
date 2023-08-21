import { db } from '../../prisma/db.server'
import { PrismaClient } from '@prisma/client'
import CustomLinkBlock from '@/components/CustomLinkBlock'

export const getLinks = async (
  db: PrismaClient,
  email: string,
  password: string
) => {
  const links = await db.link.findMany({
    include: {
      user: true,
    },
  })

  const user = await getUser(db, email, password)

  if (user) {
    return links.map((link, index) => {
      return (
        <CustomLinkBlock
          key={link.id + '-' + index}
          index={index}
          link={link.url}
          platform={link.platform}
        />
      )
    })
  }
}

export const getUser = async (
  db: PrismaClient,
  email: string,
  password: string
) => {
  const user = await db.user.findUnique({
    where: { email, password },
    include: {
      links: true,
    },
  })

  return user
}
