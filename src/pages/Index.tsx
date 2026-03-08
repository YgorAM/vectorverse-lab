import { Link } from "react-router-dom";
import { ArrowRight, Grid3X3, Gamepad2, Terminal, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

const sections = [
  { to: "/vectors", icon: ArrowRight, title: "Vectors", desc: "Direction, magnitude, addition, dot product" },
  { to: "/matrices", icon: Grid3X3, title: "Matrices", desc: "Transforms, multiplication, determinants" },
  { to: "/playground", icon: Gamepad2, title: "Playground", desc: "Interactive vector & matrix calculator" },
  { to: "/console", icon: Terminal, title: "Code Console", desc: "Write and run code in JS, Python, Java" },
  { to: "/examples", icon: BookOpen, title: "Examples", desc: "Ready-to-run code snippets" },
];

export default function Index() {
  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="grid-bg rounded-lg border border-border p-8 mb-10">
          <p className="font-mono text-xs text-primary mb-3">// welcome</p>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Linear Algebra<br />
            <span className="text-primary glow-text">for Developers</span>
          </h1>
          <p className="text-muted-foreground max-w-lg leading-relaxed">
            Master vectors and matrices — the math behind game engines, 3D graphics, machine learning, and data science. 
            Interactive examples, live code, and visual explanations.
          </p>
        </div>
      </motion.div>

      <h2 className="font-mono text-xs text-muted-foreground uppercase tracking-wider mb-4">Explore</h2>
      <div className="grid gap-3">
        {sections.map(({ to, icon: Icon, title, desc }, i) => (
          <motion.div key={to} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}>
            <Link to={to} className="flex items-center gap-4 p-4 rounded-lg border border-border bg-card hover:border-primary/50 hover:bg-secondary/50 transition-all group">
              <div className="w-10 h-10 rounded-md bg-secondary flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Icon size={18} />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-sm">{title}</h3>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
              <ArrowRight size={14} className="text-muted-foreground group-hover:text-primary transition-colors" />
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="mt-10 p-4 rounded-lg border border-border bg-card">
        <p className="font-mono text-xs text-muted-foreground mb-2">// why learn this?</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          {["🎮 Game Dev", "🎨 3D Graphics", "🤖 Machine Learning", "📊 Data Science"].map(t => (
            <div key={t} className="bg-secondary rounded-md px-3 py-2 text-center text-secondary-foreground">{t}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
