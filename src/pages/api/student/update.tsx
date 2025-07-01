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
      !newRow.stuYear ||
      !newRow.locker_id ||
      !newRow.birth ||
      !newRow.phoneNumber
    ) {
      return res.status(400).json({ message: 'Missing student values' });
    }

    try {
      const { fname, stuYear, locker_id, birth, phoneNumber} = newRow;

      const result = await query(
        'UPDATE student SET fname = ?, stuYear = ?, locker_id = ?, birth = ?, phoneNumber = ? WHERE id = ?',
        [fname, stuYear, locker_id, birth, phoneNumber, id]
      );

      res.status(200).json({
        message: 'Patient student successfully',
        result,
      });
    } catch (error: any) {
      console.error('Error updating student:', error);
      res.status(500).json({
        message: 'Error updating student',
        error: error.message,
      });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
