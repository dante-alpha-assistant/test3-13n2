import { NextResponse } from "next/server";

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

const notes: Note[] = [];

export async function GET() {
  return NextResponse.json(notes);
}

export async function POST(req: Request) {
  const body = await req.json();
  const note: Note = {
    id: Date.now().toString(),
    title: body.title ?? "",
    content: body.content ?? "",
    createdAt: new Date().toISOString(),
  };
  notes.push(note);
  return NextResponse.json(note, { status: 201 });
}
