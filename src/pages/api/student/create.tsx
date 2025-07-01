import { query } from '../../../lib/db'; // Adjust path if needed
import type { NextApiRequest, NextApiResponse } from 'next';
import { Student } from '@/models/Database'; // Assuming Database.ts contains your types

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string; result?: any; error?: string }>
) {
  if (req.method === 'PUT') {
    const newRow: Student = req.body.newRow;

    // Validate required fields
    if (
      !newRow ||
      !newRow.fname ||
      newRow.stuYear === undefined ||
      newRow.locker_id === undefined ||
      !newRow.birth ||
      !newRow.phoneNumber
    ) {
      return res.status(400).json({ message: 'Missing student values' });
    }

    try {
      const { fname, stuYear, locker_id, birth, phoneNumber } = newRow;

      // SQL query to insert a new Student record
      const result = await query(
        'INSERT INTO Student (fname, stuYear, locker_id, birth, phoneNumber) VALUES (?, ?, ?, ?, ?)',
        [fname, stuYear, locker_id, birth, phoneNumber]
      );

      res.status(200).json({
        message: 'Student added successfully',
        result,
      });
    } catch (error: unknown) {
      console.error('Error creating student:', error);
      res.status(500).json({
        message: 'Error creating student',
        error: error.message,
      });
    }
  } else {
    // Handle unsupported HTTP methods
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
