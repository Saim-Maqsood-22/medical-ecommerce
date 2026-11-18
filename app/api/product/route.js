import { NextResponse } from 'next/server';
import clientPromise from '@/utils/db';

export async function GET() {
  try {
    const client = await clientPromise;
<<<<<<< HEAD
    const db = client.db("products"); // Replace with your database name
=======
    const db = client.db("med-magic-db"); // Replace with your database name
>>>>>>> 5e0e30bb84cbbd8c5d1b04b7134352e31f6d482a

    const products = await db.collection("products").find({}).toArray();

    return NextResponse.json(products);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: 'Error fetching products' }, { status: 500 });
  }
}