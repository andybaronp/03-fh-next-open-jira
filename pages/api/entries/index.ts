import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database'
import { Entry, IEntry } from '../../../models'

type Data =
  | {
      message: string
    }
  | IEntry[]

export default function habldres(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'GET':
      return getEntries(res)

    default:
      res.status(400).json({ message: 'EndPoint no Valido' })
  }
}

const getEntries = async (res: NextApiResponse<Data>) => {
  await db.connect()
  const entries = await Entry.find().sort({ createdAt: 'ascending' })
  await db.disconnect()
  res.status(200).json(entries)
}
