import type { NextApiResponse } from 'next';
import { connectToDatabase } from '../lib/mongodb';

type Json = {
  success: boolean;
  message: any[] | string;
};

export async function getUsers(res: NextApiResponse<Json>) {
  try {
    // connect to the database
    const { db } = await connectToDatabase();

    // fetch the users
    const users = await db
      .collection('users')
      .find({})
      .sort({ published: -1 })
      .toArray();

    // return the users
    return res.json({
      message: JSON.parse(JSON.stringify(users)),
      success: true,
    });
  } catch (error: any) {
    // return the error
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}
