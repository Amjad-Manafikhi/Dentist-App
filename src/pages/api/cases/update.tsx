import { query } from '../../../lib/db';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string; result?: unknown; error?: string }>
) {
  const tableName="cases";
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
      [student_id, patient_id, d_s_id, toothache_id, isTreated, id]
      );

      res.status(200).json({
        message: 'case updated successfully',
        result,
      });
    } catch (error: unknown) {
        console.error(`Error creating ${tableName}:`, error);

        if (error instanceof Error) {
          res.status(500).json({
            message: `Error creating ${tableName}`,
            error: error.message,
          });
        } else {
          res.status(500).json({
            message: `Error creating ${tableName}`,
            error: 'Unknown error occurred',
          });
        }
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
