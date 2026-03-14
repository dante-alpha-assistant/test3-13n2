import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/dashboard", label: "Dashboard", icon: "▦" },
  { href: "/notes", label: "Notes", icon: "📝" },
  { href: "/tasks", label: "Tasks", icon: "✓" },
  { href: "/settings", label: "Settings", icon: "⚙" },
];

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 flex flex-col border-r border-zinc-800 bg-zinc-950 text-zinc-100">
        {/* App name */}
        <div className="p-6 border-b border-zinc-800">
          <h1 className="text-xl font-bold tracking-tight text-white">test3</h1>
          <p className="text-xs text-zinc-400 mt-1">Your productivity hub</p>
        </div>

        {/* Nav links */}
        <nav className="flex-1 p-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
            >
              <span className="text-base">{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </nav>

        {/* User section */}
        <div className="p-4 border-t border-zinc-800">
          <p className="text-xs text-zinc-400 truncate mb-3">{user.email}</p>
          <form action="/auth/signout" method="post">
            <Button
              type="submit"
              variant="outline"
              size="sm"
              className="w-full border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white"
            >
              Sign out
            </Button>
          </form>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
