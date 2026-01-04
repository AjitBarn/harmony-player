import { Music2, Users, Scan, Sparkles } from "lucide-react";

export function Header() {
  return (
    <header className="py-8 px-6">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center glow-primary">
              <Music2 className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gradient">FaceSync</h1>
              <p className="text-sm text-muted-foreground">Collaborative Music Experience</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Scan className="w-4 h-4 text-primary" />
              <span>Face Detection</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="w-4 h-4 text-primary" />
              <span>Multi-User</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Sparkles className="w-4 h-4 text-primary" />
              <span>Auto-Merge</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
