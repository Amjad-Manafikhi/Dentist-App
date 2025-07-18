import { query } from '../../../lib/db'; // Adjust path if needed
import type { NextApiRequest, NextApiResponse } from 'next';
import { P_C } from '@/models/Database'; // Assuming you have a Database.ts in '@/models'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string; result?: unknown; error?: string }>
) {
  const tableName="p_c";
  if (req.method === 'PUT') {
    const newRow: P_C = req.body.newRow;

    // Check if required fields are present
    if (
      !newRow ||
      newRow.comorbidity_id === undefined ||
      newRow.patient_id === undefined
    ) {
      return res.status(400).json({ message: 'Missing P_C values' });
    }

    try {
      const { comorbidity_id, patient_id, } = newRow;

      // SQL query to insert a new P_C record
      const result = await query(
        'INSERT INTO p_c (comorbidity_id, patient_id) VALUES (?, ?)',
        [comorbidity_id, patient_id,]
      );

      res.status(200).json({
        message: 'P_C record added successfully',
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
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
