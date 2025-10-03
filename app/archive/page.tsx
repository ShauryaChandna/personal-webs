'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Archive() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const projects = [
    {
      year: "2024",
      name: "E-Commerce Platform",
      madeAt: "Personal Project",
      builtWith: ["Next.js", "Prisma", "Stripe", "PostgreSQL", "Tailwind CSS"],
      link: "https://github.com/yourusername/project1"
    },
    {
      year: "2024",
      name: "Task Management App",
      madeAt: "Personal Project",
      builtWith: ["React", "Socket.io", "Express", "MongoDB", "Material-UI"],
      link: "https://github.com/yourusername/project2"
    },
    {
      year: "2024",
      name: "AI Chat Assistant",
      madeAt: "Personal Project",
      builtWith: ["Python", "TensorFlow", "Flask", "OpenAI API", "Docker"],
      link: "https://github.com/yourusername/project3"
    },
    {
      year: "2023",
      name: "Weather Dashboard",
      madeAt: "Personal Project",
      builtWith: ["Vue.js", "Chart.js", "OpenWeather API", "CSS3"],
      link: "https://github.com/yourusername/weather-dashboard"
    },
    {
      year: "2023",
      name: "Blog CMS",
      madeAt: "Personal Project",
      builtWith: ["Node.js", "Express", "MongoDB", "Handlebars", "Bootstrap"],
      link: "https://github.com/yourusername/blog-cms"
    },
    {
      year: "2023",
      name: "Portfolio Website",
      madeAt: "Personal Project",
      builtWith: ["HTML5", "CSS3", "JavaScript", "GSAP"],
      link: "https://github.com/yourusername/portfolio-v1"
    },
    {
      year: "2022",
      name: "Todo App",
      madeAt: "Learning Project",
      builtWith: ["React", "Local Storage", "CSS3"],
      link: "https://github.com/yourusername/todo-app"
    },
    {
      year: "2022",
      name: "Calculator",
      madeAt: "Learning Project",
      builtWith: ["JavaScript", "HTML5", "CSS3"],
      link: "https://github.com/yourusername/calculator"
    }
  ];

  return (
    <div 
      className="min-h-screen bg-background text-foreground overflow-x-hidden"
      style={{
        background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 255, 133, 0.06), transparent 50%)`
      }}
    >
      {/* Desktop Layout */}
      <div className="hidden lg:block min-h-screen overflow-hidden">
        {/* Fixed Sidebar */}
        <div className="w-[45vw] h-screen fixed left-0 top-0 bg-transparent p-10 flex flex-col justify-between">
          <div>
            <Link href="/" className="text-3xl font-bold text-accent mb-2 block hover:text-accent/80 transition-colors">
              Lorem Ipsum
            </Link>
            <h2 className="text-xl text-foreground/80 mb-4">Computer Science Student</h2>
            <p className="text-foreground/60 mb-8 leading-relaxed">
              Building innovative solutions through code. Passionate about creating meaningful technology that makes a difference.
            </p>
            
            <nav className="space-y-2">
              <Link href="/#about" className="block text-foreground/70 hover:text-accent transition-colors cursor-glow">
                About
              </Link>
              <Link href="/#experience" className="block text-foreground/70 hover:text-accent transition-colors cursor-glow">
                Experience
              </Link>
              <Link href="/#projects" className="block text-foreground/70 hover:text-accent transition-colors cursor-glow">
                Projects
              </Link>
              <Link href="/archive" className="block text-accent transition-colors cursor-glow">
                Archive
              </Link>
            </nav>
          </div>
          
          <div className="space-y-3">
            <a 
              href="https://github.com/yourusername" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block text-foreground/70 hover:text-accent transition-colors cursor-glow"
            >
              GitHub
            </a>
            <a 
              href="https://linkedin.com/in/yourusername" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block text-foreground/70 hover:text-accent transition-colors cursor-glow"
            >
              LinkedIn
            </a>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:ml-[45vw] lg:w-[55vw] p-10 overflow-y-auto">
          <div className="max-w-2xl mx-auto">
            <div className="mb-8">
              <Link 
                href="/"
                className="inline-flex items-center text-foreground/80 hover:text-foreground transition-colors mb-6"
              >
                <span className="mr-2">←</span>
                Back to Home
              </Link>
              <h1 className="text-3xl font-semibold text-foreground mb-2 tracking-tight">Project Archive</h1>
              <p className="text-foreground/70 leading-relaxed">
                A comprehensive list of all the projects I&apos;ve worked on over the years. 
                Each project represents a learning opportunity and a step forward in my development journey.
              </p>
            </div>

            {/* Projects Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-separate border-spacing-y-2">
                <thead>
                  <tr>
                    <th className="text-left py-2 px-2 text-foreground/50 font-medium text-xs uppercase tracking-wider">Year</th>
                    <th className="text-left py-2 px-2 text-foreground/50 font-medium text-xs uppercase tracking-wider">Project</th>
                    <th className="text-left py-2 px-2 text-foreground/50 font-medium text-xs uppercase tracking-wider">Made at</th>
                    <th className="text-left py-2 px-2 text-foreground/50 font-medium text-xs uppercase tracking-wider">Built with</th>
                    <th className="text-left py-2 px-2 text-foreground/50 font-medium text-xs uppercase tracking-wider">Link</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project, index) => (
                    <tr 
                      key={index}
                      className="hover:bg-white/5 transition-colors cursor-pointer"
                      onClick={() => window.open(project.link, '_blank')}
                    >
                      <td className="py-3 px-2 text-foreground/60 align-top">{project.year}</td>
                      <td className="py-3 px-2 text-foreground font-medium align-top">{project.name}</td>
                      <td className="py-3 px-2 text-foreground/70 align-top">{project.madeAt}</td>
                      <td className="py-3 px-2 align-top">
                        <div className="flex flex-wrap gap-1.5">
                          {project.builtWith.map((tech, techIndex) => (
                            <span 
                              key={techIndex} 
                              className="px-2.5 py-0.5 bg-white/5 text-foreground/80 rounded-full text-xs"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-3 px-2 align-top">
                        <a 
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-foreground/80 hover:text-foreground transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          GitHub →
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden p-6">
        <div className="mb-8">
          <Link 
            href="/"
            className="inline-flex items-center text-accent hover:text-accent/80 transition-colors cursor-glow mb-6"
          >
            <span className="mr-2">←</span>
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-accent mb-4">Project Archive</h1>
          <p className="text-foreground/80 leading-relaxed mb-8">
            A comprehensive list of all the projects I&apos;ve worked on over the years.
          </p>
        </div>

        {/* Mobile Project Cards */}
        <div className="space-y-6">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="bg-secondary/30 backdrop-blur-sm border border-accent/20 rounded-lg p-6 hover:bg-secondary/50 transition-all duration-300 cursor-pointer cursor-glow"
              onClick={() => window.open(project.link, '_blank')}
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold text-foreground">{project.name}</h3>
                <span className="text-foreground/60 text-sm">{project.year}</span>
              </div>
              <p className="text-accent mb-4">{project.madeAt}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.builtWith.map((tech, techIndex) => (
                  <span 
                    key={techIndex} 
                    className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <a 
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-accent/80 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                View on GitHub →
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-accent/20 bg-secondary/30 backdrop-blur-sm p-8 mt-16">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-foreground/60 text-sm leading-relaxed">
            Loosely designed in Figma and coded in Cursor by yours truly. Built with Next.js and Tailwind CSS, 
            deployed with GitHub. All text is set in the Inter typeface.
          </p>
        </div>
      </footer>
    </div>
  );
}
