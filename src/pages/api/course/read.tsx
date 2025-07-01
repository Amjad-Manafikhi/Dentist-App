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
      const course = await query(
        'SELECT * FROM course'
      );

      res.status(200).json(course as TableRow[]);
    } catch (error: any) {
      console.error('Error fetching course:', error);
      res.status(500).json({
        message: 'Error fetching course',
        error: error.message,
      });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
