import { query } from '../../../lib/db';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string; result?: any; error?: string }>
) {
  if (req.method === 'POST') {
    const newRow = req.body.newRow;
    const { id } = req.body;

    if (
      !newRow ||
      !newRow.fname ||
      !newRow.birth ||
      !newRow.phoneNumber
    ) {
      return res.status(400).json({ message: 'Missing patient values' });
    }

    try {
      const { fname, birth, phoneNumber} = newRow;

      const result = await query(
        'UPDATE patient SET fname = ?, birth = ?, phoneNumber = ? WHERE id = ?',
        [fname, birth, phoneNumber, id]
      );

      res.status(200).json({
        message: 'Patient updated successfully',
        result,
      });
    } catch (error: any) {
      console.error('Error updating patient:', error);
      res.status(500).json({
        message: 'Error updating patient',
        error: error.message,
      });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
