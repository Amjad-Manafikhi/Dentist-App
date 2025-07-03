import { query } from '../../../lib/db'; // Adjust path if needed
import type { NextApiRequest, NextApiResponse } from 'next';
import { P_C } from '@/models/Database'; // Assuming you have a Database.ts in '@/models'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string; result?: any; error?: string }>
) {
  const tableName="p_c";
  if (req.method === 'POST') {
    const newRow: P_C = req.body.newRow;
    const { id } = req.body; // Assuming the ID is passed separately in the body

    // Check if ID and required fields are present
    if (
      !id ||
      !newRow ||
      newRow.comorbidity_id === undefined ||
      newRow.patient_id === undefined 
    ) {
      return res.status(400).json({ message: 'Missing P_C ID or values' });
    }

    try {
      const { comorbidity_id, patient_id } = newRow;

      // SQL query to update a P_C record by ID
      const result = await query(
        'UPDATE p_c SET comorbidity_id = ?, patient_id = ? WHERE id = ?',
        [comorbidity_id, patient_id, id]
      );

      res.status(200).json({
        message: 'P_C record updated successfully',
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
