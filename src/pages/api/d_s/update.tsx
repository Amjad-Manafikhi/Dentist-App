import { query } from '../../../lib/db'; // Adjust path if needed
import type { NextApiRequest, NextApiResponse } from 'next';
import { D_S } from '@/models/Database'; // Assuming you have a Database.ts in '@/models'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string; result?: any; error?: string }>
) {
  const tableName="d_s";
  if (req.method === 'POST') {
    const newRow: D_S = req.body.newRow;
    const { id } = req.body; // Assuming the ID is passed separately in the body

    // Check if ID and required fields are present
    if (
      !id ||
      !newRow ||
      newRow.diagnosticSource_id === undefined ||
      newRow.diagnosticSource_sourceType_id === undefined ||
      newRow.doctor_id === undefined
    ) {
      return res.status(400).json({ message: 'Missing D_S ID or values' });
    }

    try {
      const { diagnosticSource_id, diagnosticSource_sourceType_id, doctor_id } = newRow;

      // SQL query to update a D_S record by ID
      const result = await query(
        'UPDATE d_s SET diagnosticSource_id = ?, diagnosticSource_sourceType_id = ?, doctor_id = ?WHERE id = ?',
        [diagnosticSource_id, diagnosticSource_sourceType_id, doctor_id, id]
      );

      res.status(200).json({
        message: 'D_S record updated successfully',
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
