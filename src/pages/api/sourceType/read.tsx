
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
      const sourceType = await query(
        'SELECT * FROM sourceType'
      );

      res.status(200).json(sourceType as TableRow[]);
    } catch (error: any) {
      console.error('Error fetching sourceType:', error);
      res.status(500).json({
        message: 'Error fetching sourceType',
        error: error.message,
      });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
