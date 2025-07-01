import { query } from '../../../lib/db'; // Adjust path if needed
import type { NextApiRequest, NextApiResponse } from 'next';
import { S_M } from '@/models/Database'; // Assuming you have a Database.ts in '@/models'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string; result?: any; error?: string }>
) {
  if (req.method === 'POST') {
    const newRow: S_M = req.body.newRow;
    const { id } = req.body; // Assuming the ID is passed separately in the body

    // Check if ID and required fields are present
    if (
      !id ||
      !newRow ||
      newRow.session_id === undefined ||
      newRow.material_id === undefined ||
      newRow.amount === undefined
    ) {
      return res.status(400).json({ message: 'Missing S_M ID or values' });
    }

    try {
      const { session_id, material_id, amount } = newRow;

      // SQL query to update a S_M record by ID
      const result = await query(
        'UPDATE s_m SET session_id = ?, material_id = ?, amount = ? WHERE id = ?',
        [session_id, material_id, amount, id]
      );

      res.status(200).json({
        message: 'S_M record updated successfully',
        result,
      });
    } catch (error: any) {
      console.error('Error updating S_M record:', error);
      res.status(500).json({
        message: 'Error updating S_M record',
        error: error.message,
      });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
