import { query } from '../../../lib/db';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string; result?: unknown; error?: string }>
) {
  const tableName="doctor";
  if (req.method === 'POST') {
    const newRow = req.body.newRow;
    const { id } = req.body;

    if (
      !newRow ||
      !newRow.fname ||
      !newRow.phoneNumber
    ) {
      return res.status(400).json({ message: 'Missing doctor values' });
    }

    try {
      const { fname, phoneNumber } = newRow;

      const result = await query(
        'UPDATE doctor SET fname = ?, phoneNumber = ? WHERE id = ?',
        [fname, phoneNumber, id]
      );

      res.status(200).json({
        message: 'doctor updated successfully',
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
