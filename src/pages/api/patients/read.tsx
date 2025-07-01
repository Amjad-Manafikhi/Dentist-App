
import { query } from '../../../lib/db'; // Adjust path if needed
import type { NextApiRequest, NextApiResponse } from "next";
import { TableRow } from '@/models/Database';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TableRow[] | { message: string; error: string }>
) {
  if (req.method === 'GET') {
    console.log("get")
    try {
      const patients = await query(
        'SELECT id, fname, birth, phoneNumber FROM patient'
      );

      res.status(200).json(patients as TableRow[]);
    } catch (error: unknown) {
      console.error('Error fetching patients:', error);
      res.status(500).json({
        message: 'Error fetching patients',
        error: error.message,
      });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
