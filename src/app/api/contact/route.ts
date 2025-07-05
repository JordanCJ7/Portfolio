import clientPromise from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import type { MongoClient, Db } from 'mongodb';

// Add type annotation for clientPromise
const typedClientPromise: Promise<MongoClient> = clientPromise;

export async function POST(req: Request) {
  // Test log for env variables
  console.log('API route hit', process.env.MONGODB_URI, process.env.ADMIN_SECRET);
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    const client: MongoClient = await typedClientPromise;
    const db: Db = client.db();
    const result = await db.collection('messages').insertOne({
      name,
      email,
      subject,
      message,
      createdAt: new Date(),
    });
    return NextResponse.json({ success: true, id: result.insertedId });
  } catch (error: any) {
    let errorString = '';
    try {
      errorString = JSON.stringify(error, Object.getOwnPropertyNames(error));
    } catch (e) {
      errorString = String(error);
    }
    console.error('Contact API Error:', errorString);
    return NextResponse.json({ error: 'Failed to save message', details: errorString }, { status: 500 });
  }
}

export async function GET(req: Request) {
  // For admin dashboard: require a secret token in query string
  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token');
  if (token !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const client: MongoClient = await typedClientPromise;
    const db: Db = client.db();
    const messages = await db.collection('messages').find({}).sort({ createdAt: -1 }).toArray();
    return NextResponse.json({ messages });
  } catch (error: any) {
    // Enhanced error logging for debugging
    console.error('Contact API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch messages', details: error?.message || error }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  // For admin dashboard: require a secret token in query string
  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token');
  const id = searchParams.get('id');
  if (token !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  if (!id) {
    return NextResponse.json({ error: 'Missing message id' }, { status: 400 });
  }
  try {
    const client: MongoClient = await typedClientPromise;
    const db: Db = client.db();
    const { ObjectId } = await import('mongodb');
    const result = await db.collection('messages').deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 1) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: 'Message not found' }, { status: 404 });
    }
  } catch (error: any) {
    console.error('Contact API Delete Error:', error);
    return NextResponse.json({ error: 'Failed to delete message', details: error?.message || error }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  // For admin dashboard: require a secret token in query string
  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token');
  const id = searchParams.get('id');
  if (token !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  if (!id) {
    return NextResponse.json({ error: 'Missing message id' }, { status: 400 });
  }
  try {
    const body = await req.json();
    const update: any = {};
    if ('starred' in body) update.starred = !!body.starred;
    if ('read' in body) update.read = !!body.read;
    if (Object.keys(update).length === 0) {
      return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 });
    }
    const client: MongoClient = await typedClientPromise;
    const db: Db = client.db();
    const { ObjectId } = await import('mongodb');
    const result = await db.collection('messages').updateOne(
      { _id: new ObjectId(id) },
      { $set: update }
    );
    if (result.matchedCount === 1) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: 'Message not found' }, { status: 404 });
    }
  } catch (error: any) {
    console.error('Contact API Patch Error:', error);
    return NextResponse.json({ error: 'Failed to update message', details: error?.message || error }, { status: 500 });
  }
}
