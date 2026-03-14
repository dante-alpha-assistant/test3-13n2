import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const firstName = user?.email?.split("@")[0] ?? "there";

  const stats = [
    { label: "Notes", value: "0", description: "Total notes created" },
    { label: "Tasks", value: "0", description: "Total tasks tracked" },
    { label: "Completed", value: "0", description: "Tasks completed" },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight">
          Good morning, {firstName} 👋
        </h2>
        <p className="text-muted-foreground mt-1">
          Here&apos;s what&apos;s happening with your workspace today.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-8">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="pb-2">
              <CardDescription>{stat.label}</CardDescription>
              <CardTitle className="text-4xl">{stat.value}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick actions */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="flex gap-4">
          <Link href="/notes">
            <Button>📝 New Note</Button>
          </Link>
          <Link href="/tasks">
            <Button variant="outline">✓ New Task</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
