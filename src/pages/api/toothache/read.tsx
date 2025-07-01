import { FormValues } from '@/pages';
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
      const toothache = await query(
        'SELECT * FROM toothache'
      );

      res.status(200).json(toothache as TableRow[]);
    } catch (error: any) {
      console.error('Error fetching toothache:', error);
      res.status(500).json({
        message: 'Error fetching toothache',
        error: error.message,
      });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
