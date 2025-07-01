import { query } from '../../../lib/db'; // Adjust path if needed
import type { NextApiRequest, NextApiResponse } from 'next';
import { Session } from '@/models/Database'; // Assuming Database.ts contains your types

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string; result?: any; error?: string }>
) {
  if (req.method === 'PUT') {
    const newRow: Session = req.body.newRow;

    // Validate required fields
    if (!newRow || newRow.s_s_id === undefined) {
      return res.status(400).json({ message: 'Missing session values' });
    }

    try {
      const { s_s_id } = newRow;

      // SQL query to insert a new Session record
      const result = await query(
        'INSERT INTO Session (s_s_id) VALUES (?)',
        [s_s_id]
      );

      res.status(200).json({
        message: 'Session added successfully',
        result,
      });
    } catch (error: any) {
      console.error('Error creating session:', error);
      res.status(500).json({
        message: 'Error creating session',
        error: error.message,
      });
    }
  } else {
    // Handle unsupported HTTP methods
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
