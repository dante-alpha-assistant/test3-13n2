import { NextResponse } from "next/server";

interface Task {
  id: string;
  title: string;
  priority: "low" | "normal" | "high";
  status: "todo" | "in-progress" | "done";
  createdAt: string;
}

const tasks: Task[] = [];

export async function GET() {
  return NextResponse.json(tasks);
}

export async function POST(req: Request) {
  const body = await req.json();
  const task: Task = {
    id: Date.now().toString(),
    title: body.title ?? "",
    priority: body.priority ?? "normal",
    status: body.status ?? "todo",
    createdAt: new Date().toISOString(),
  };
  tasks.push(task);
  return NextResponse.json(task, { status: 201 });
}
