import { query } from '../../../lib/db'; // Adjust path if needed
import type { NextApiRequest, NextApiResponse } from 'next';
import { Doctor } from '@/models/Database'; // Assuming Database.ts contains your types

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string; result?: any; error?: string }>
) {
  const tableName="doctor";
  if (req.method === 'PUT') {
    const newRow: Doctor = req.body.newRow;

    // Validate required fields
    if (!newRow || !newRow.fname || !newRow.phoneNumber) {
      return res.status(400).json({ message: 'Missing doctor values' });
    }

    try {
      const { fname, phoneNumber } = newRow;

      // SQL query to insert a new Doctor record
      const result = await query(
        'INSERT INTO Doctor (fname, phoneNumber) VALUES (?, ?)',
        [fname, phoneNumber]
      );

      res.status(200).json({
        message: 'Doctor added successfully',
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
    // Handle unsupported HTTP methods
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
