import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { options } from '../auth/[...nextauth]/options'
import { s3Client } from '../../../libs/awsClient'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import multer from 'multer'
import { Request, Response } from 'express'

import { db } from '@/prisma/db.server'

const upload = multer({ storage: multer.memoryStorage() })
const multerUpload = upload.single('file')

export async function POST(req: Request, res: Response) {
  const session = await getServerSession(options)
  // const body = await req.json()

  console.log('File: ' + req.file)
  //console.log('Request body: ' + req)

  const user = await db.user.findUnique({
    where: { email: session?.user?.email as string },
    include: {
      links: true,
    },
  })

  if (!user) {
    return NextResponse.json(
      { error: 'User not found', errorType: 'TOAST_ERROR' },
      { status: 404 }
    )
  }

  // upload profile image to aws
  multerUpload(req, res, async (err) => {
    if (err) {
      return NextResponse.json({ error: err }, { status: 500 })
    }
    if (!req.file) {
      return NextResponse.json({ error: 'No image provided.' }, { status: 400 })
    }

    if (req.file) {
      const putObjectParams = {
        Bucket: process.env.AWS_BUCKET,
        Key: req.file.originalname,
        Body: req.file.buffer,
      }
      const putObjectCommand = new PutObjectCommand(putObjectParams)
      const signedUrl = await getSignedUrl(s3Client, putObjectCommand, {
        expiresIn: 3600,
      })

      // signed url that gets saved to db
      if (signedUrl) {
        await db.user.update({
          where: {
            id: user.id,
          },
          data: {
            profileImage: signedUrl,
          },
        })
        return signedUrl
      }
    }
  })
}
