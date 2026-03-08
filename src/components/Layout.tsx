import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Home, ArrowRight, Grid3X3, Gamepad2, Terminal, BookOpen, Menu, X } from "lucide-react";

const navItems = [
  { to: "/", label: "Home", icon: Home },
  { to: "/vectors", label: "Vectors", icon: ArrowRight },
  { to: "/matrices", label: "Matrices", icon: Grid3X3 },
  { to: "/playground", label: "Playground", icon: Gamepad2 },
  { to: "/console", label: "Code Console", icon: Terminal },
  { to: "/examples", label: "Examples", icon: BookOpen },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="flex min-h-screen">
      {/* Mobile header */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between border-b border-border bg-background/95 backdrop-blur px-4 py-3 lg:hidden">
        <span className="font-mono text-sm font-bold text-primary">LinAlg<span className="text-foreground">.dev</span></span>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="text-muted-foreground">
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 border-r border-border bg-sidebar flex flex-col
        transition-transform duration-200
        lg:translate-x-0 lg:static
        ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className="px-6 py-6 border-b border-border">
          <span className="font-mono text-lg font-bold text-primary">LinAlg<span className="text-foreground">.dev</span></span>
          <p className="text-xs text-muted-foreground mt-1">Linear Algebra for Developers</p>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setMobileOpen(false)}
              className={() => {
                const isActive = location.pathname === to;
                return `flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors ${
                  isActive
                    ? "bg-sidebar-accent text-primary font-medium"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                }`;
              }}
            >
              <Icon size={16} />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="px-6 py-4 border-t border-border">
          <p className="text-xs text-muted-foreground">Built for learners 🚀</p>
        </div>
      </aside>

      {/* Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-30 bg-background/80 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      {/* Main content */}
      <main className="flex-1 lg:ml-0 mt-14 lg:mt-0 overflow-auto">
        <div className="max-w-4xl mx-auto px-6 py-10">
          {children}
        </div>
      </main>
    </div>
  );
}
