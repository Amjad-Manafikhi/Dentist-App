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
      !newRow.student_id ||
      !newRow.patient_id ||
      !newRow.d_s_id ||
      !newRow.toothache_id ||
      !newRow.isTreated
    ) {
      return res.status(400).json({ message: 'Missing case values' });
    }

    try {
      const { student_id, patient_id, d_s_id, toothache_id, isTreated} = newRow;
      console.log(newRow)
      const result = await query(
      'UPDATE `case` SET student_id = ?, patient_id = ?, d_s_id = ?, toothache_id = ?, isTreated = ? WHERE id = ?',
      [student_id, patient_id, d_s_id, toothache_id, isTreated]
      );

      res.status(200).json({
        message: 'case updated successfully',
        result,
      });
    } catch (error: any) {
      console.error('Error updating case:', error);
      res.status(500).json({
        message: 'Error updating case',
        error: error.message,
      });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
