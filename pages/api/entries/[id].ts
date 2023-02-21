import type { NextApiRequest, NextApiResponse } from 'next'

import mongoose from 'mongoose'

import { db } from '@/database'
import { EntryModel, IEntry } from '@/models'

type Data =
  | {
      message: string
    }
  | IEntry

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: `El id no es válido ${id}` })
  }

  switch (req.method) {
    case 'PUT':
      return updateEntry(req, res)

    default:
      return res.status(400).json({ message: 'Método no existe' })
  }
}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query

  await db.connect()

  const entryToUpdate = await EntryModel.findById(id)
  if (!entryToUpdate) {
    await db.disconnect()
    return res.status(400).json({ message: `No hay entrada con ese ID: ${id}` })
  }

  const {
    description = entryToUpdate.description,
    status = entryToUpdate.status,
  } = req.body

  try {
    const updatedEntry = await EntryModel.findByIdAndUpdate(
      id,
      {
        description,
        status,
      },
      { runValidators: true, new: true }
    )
    await db.disconnect()
    res.status(200).json(updatedEntry!)
  } catch (error: any) {
    console.log(`Error In: [entryToUpdate] ${error}`)
    await db.disconnect()
    return res.status(400).json({ message: error.errors.status.message })
  }
}
