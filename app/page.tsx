'use client';

import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const headerRef = useRef<HTMLDivElement | null>(null);
  const [showHeader, setShowHeader] = useState(true);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set(['hero']));
  const lastY = useRef(0);
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  // Handle header visibility on scroll
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y <= 0) {
        setShowHeader(true);
      } else if (y > lastY.current) {
        setShowHeader(false); // scrolling down
      } else {
        setShowHeader(true); // scrolling up
      }
      lastY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Intersection Observer for section animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.getAttribute('data-section');
            if (sectionId) {
              setVisibleSections(prev => new Set([...prev, sectionId]));
            }
          }
        });
      },
      { 
        threshold: 0.1,
        rootMargin: '-50px 0px -50px 0px'
      }
    );

    // Observe all sections
    Object.values(sectionRefs.current).forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Header */}
      <div ref={headerRef} className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${showHeader ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="w-full flex items-center justify-between px-4 md:px-6 py-4 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 animate-fade-in">
          {/* Logo hex button */}
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Home" className="group">
            <svg width="40" height="44" viewBox="0 0 40 44" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 2 36 11v22L20 42 4 33V11L20 2Z" stroke="#08CB00" strokeWidth="3" strokeLinejoin="round"/>
              <text x="20" y="27" textAnchor="middle" fontSize="16" fill="#08CB00" fontFamily="inherit">S</text>
            </svg>
          </button>
          {/* Nav */}
          <nav className="hidden sm:flex items-center gap-6">
            {[
              { id: 'about', num: '01.', label: 'About' },
              { id: 'experience', num: '02.', label: 'Experience' },
              { id: 'work', num: '03.', label: 'Work' },
              { id: 'contact', num: '04.', label: 'Contact' }
            ].map((i) => (
              <button 
                key={i.label} 
                onClick={() => scrollToSection(i.id)}
                className="group text-sm text-foreground/70 hover:text-accent transition-colors"
              >
                <span className="text-accent mr-1">{i.num}</span><span className="group-hover:text-accent">{i.label}</span>
              </button>
            ))}
            <a href="scresume.pdf" target="_blank" rel="noopener noreferrer" className="text-sm text-accent border border-accent/60 hover:border-accent px-4 py-2 rounded-md transform transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(0,230,184,0.25)]">
              Resume
            </a>
          </nav>
        </div>
      </div>
      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center px-4 md:px-6 pt-20 pb-16">
        <div className="mx-auto max-w-3xl w-full">
          <h1 className="text-6xl font-semibold text-foreground tracking-tight animate-fade-in" style={{animationDelay:'200ms'}}>Shaurya Chandna.</h1>
          <h2 className="text-6xl font-semibold text-foreground/40 tracking-tight mt-2 animate-fade-in" style={{animationDelay:'300ms'}}>I build data-driven solutions.</h2>
          <p className="text-muted mt-6 animate-fade-in max-w-[60%]" style={{animationDelay:'400ms'}}>
            I&apos;m a computational mathematics student at the University of Waterloo, specializing in data science and aspiring to work in machine learning. I&apos;m currently focused on learning, building and applying intelligent models that solve real-world problems.
          </p>
          <a href="scresume.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center mt-8 text-accent border border-accent/60 hover:border-accent px-5 py-3 rounded-md animate-fade-in transform transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(0,230,184,0.25)]" style={{animationDelay:'500ms'}}>
            Check out my resume!
            </a>
          </div>
        </section>

        {/* About Section */}
      <section 
        id="about" 
        ref={(el) => { sectionRefs.current['about'] = el; }}
        data-section="about"
        className={`min-h-screen flex items-center px-4 md:px-6 py-20 transition-all duration-1000 ${
          visibleSections.has('about') 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="mx-auto max-w-4xl w-full">
          <h2 className="text-4xl md:text-5xl font-semibold text-accent mb-8">About Me</h2>
          <div className="grid md:grid-cols-5 gap-12 items-center">
            <div className="md:col-span-3">
              <p className="text-foreground/80 text-lg leading-relaxed mb-6">
              Hi there! My name is Shaurya and I enjoy turning math, code, and too much coffee into machine intelligence. The idea that raw numbers could be transformed into insights that drive real-world solutions is what hooked me into the field.
              </p>
              <p className="text-foreground/80 text-lg leading-relaxed mb-8">
                I specialize in developing hybrid forecasting systems, RAG-powered applications, and automated data pipelines. 
                My experience spans from government energy analytics to startup AI solutions, with a focus on creating 
                scalable systems that deliver measurable business impact.
              </p>
              <div className="flex flex-wrap gap-3">
                {['Python', 'SQL', 'C/C++', 'React', 'PyTorch', 'TensorFlow', 'FastAPI', 'Pandas', 'scikit-learn', 'XGBoost', 'LangChain', 'OpenAI API'].map((skill) => (
                  <span key={skill} className="px-4 py-2 bg-accent/20 text-accent rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="md:col-span-2 flex justify-center">
              <div className="w-80 h-80 rounded-lg overflow-hidden border-2 border-accent/20">
                <img 
                  src="/personal-webs/profile-photo.jpg" 
                  alt="Shaurya Chandna" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          </div>
        </section>

        {/* Experience Section */}
      <section 
        id="experience" 
        ref={(el) => { sectionRefs.current['experience'] = el; }}
        data-section="experience"
        className={`min-h-screen flex items-center px-4 md:px-6 py-20 transition-all duration-1000 ${
          visibleSections.has('experience') 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="mx-auto max-w-4xl w-full">
          <h2 className="text-4xl md:text-5xl font-semibold text-accent mb-12">Experience</h2>
          <div className="space-y-8">
            {/* Experience 1 */}
            <div className="bg-secondary/30 backdrop-blur-sm border border-accent/20 rounded-lg p-8 hover:bg-secondary/50 transition-all duration-300">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-foreground">Data Analyst Intern</h3>
                  <p className="text-accent">Ontario Ministry of Energy and Electrification • Toronto, ON</p>
                </div>
                <span className="text-sm text-foreground/60 mt-2 md:mt-0">Jan 2025 - Apr 2025</span>
              </div>
              <ul className="text-foreground/80 mb-4 leading-relaxed space-y-2">
                <li className="flex items-start">
                  <span className="text-accent mr-3 mt-1">▶</span>
                  <span>Built a centralized data automation pipeline using Python and Pandas to extract, clean, and enrich energy datasets for Ontario buildings via REST APIs</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-3 mt-1">▶</span>
                  <span>Automated 40% of all company maps and dashboards workflows, decreasing manual cleaning time by 97%</span>
                </li>
              </ul>
              <div className="flex flex-wrap gap-2">
                {['Python', 'Pandas', 'REST APIs', 'ArcGIS', 'Data Automation'].map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Experience 2 */}
            <div className="bg-secondary/30 backdrop-blur-sm border border-accent/20 rounded-lg p-8 hover:bg-secondary/50 transition-all duration-300">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-foreground">Data Science Intern</h3>
                  <p className="text-accent">Innova Solutions • Atlanta, Georgia</p>
                </div>
                <span className="text-sm text-foreground/60 mt-2 md:mt-0">May 2024 - Aug 2024</span>
              </div>
              <ul className="text-foreground/80 mb-4 leading-relaxed space-y-2">
                <li className="flex items-start">
                  <span className="text-accent mr-3 mt-1">▶</span>
                  <span>Developed a hybrid time series forecasting system combining Croston&apos;s Method and ARIMA with a decision tree selector</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-3 mt-1">▶</span>
                  <span>Reduced RMSE by 4% on usage prediction by engineering temporal embeddings and applying Bayesian hyperparameter tuning on XGBoost</span>
                </li>
              </ul>
              <div className="flex flex-wrap gap-2">
                {['Python', 'XGBoost', 'ARIMA', 'Time Series', 'SHAP Analysis'].map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm">
                    {skill}
                  </span>
                ))}
            </div>
          </div>
          
            {/* Experience 3 */}
            <div className="bg-secondary/30 backdrop-blur-sm border border-accent/20 rounded-lg p-8 hover:bg-secondary/50 transition-all duration-300">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-foreground">Data Analyst Intern</h3>
                  <p className="text-accent">ElevonData • New York, NY</p>
                </div>
                <span className="text-sm text-foreground/60 mt-2 md:mt-0">May 2023 - Aug 2023</span>
              </div>
              <ul className="text-foreground/80 mb-4 leading-relaxed space-y-2">
                <li className="flex items-start">
                  <span className="text-accent mr-3 mt-1">▶</span>
                  <span>Developed end-to-end ETL pipelines for a telecom cost-reduction initiative using Airflow, Talend DI, and SQL</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-3 mt-1">▶</span>
                  <span>Designed advanced Power BI reports with custom DAX measures, driving a 7.3% reduction in project costs</span>
                </li>
              </ul>
              <div className="flex flex-wrap gap-2">
                {['SQL', 'Airflow', 'Power BI', 'DAX', 'ETL Pipelines'].map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Work Section */}
      <section 
        id="work" 
        ref={(el) => { sectionRefs.current['work'] = el; }}
        data-section="work"
        className={`min-h-screen flex items-center px-4 md:px-6 py-20 transition-all duration-1000 ${
          visibleSections.has('work') 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="mx-auto max-w-4xl w-full">
          <h2 className="text-4xl md:text-5xl font-semibold text-accent mb-12">Featured Work</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Project 1 */}
            <div className="bg-secondary/30 backdrop-blur-sm border border-accent/20 rounded-lg p-8 hover:bg-secondary/50 transition-all duration-300 cursor-pointer">
              <div className="flex gap-4 mb-6">
                <div className="w-16 h-16 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🧠</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground mb-2">QuizMaster</h3>
                  <p className="text-accent text-sm">RAG-Powered Document Quiz Generator</p>
                </div>
              </div>
              <p className="text-foreground/80 mb-6 leading-relaxed">
                Architected a Retrieval Augmented Generation (RAG) system to transform resource documents into interactive quizzes. 
                Utilized OpenAI&apos;s text-embedding-3-small model and Pinecone vector database with optimized indexing strategies.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {['Python', 'FastAPI', 'OpenAI API', 'Pinecone', 'LangChain', 'React'].map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
              <div className="flex gap-4">
                <a href="https://github.com/ShauryaChandna/QuizMaster" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent/80 transition-colors text-sm">GitHub</a>
              </div>
            </div>

            {/* Project 2 */}
            <div className="bg-secondary/30 backdrop-blur-sm border border-accent/20 rounded-lg p-8 hover:bg-secondary/50 transition-all duration-300 cursor-pointer">
              <div className="flex gap-4 mb-6">
                <div className="w-16 h-16 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🤖</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground mb-2">Ads for AI Agents</h3>
                  <p className="text-accent text-sm">RAG-Powered Advertisement System</p>
                </div>
              </div>
              <p className="text-foreground/80 mb-6 leading-relaxed">
                Built a RAG-powered model to recommend personalized advertisements for AI agents. 
                Optimized Qdrant vector database with HNSW indexing and fine-tuned OpenAI embeddings using contrastive learning.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {['Python', 'QDrant', 'LangChain', 'SBERT', 'OpenAI API'].map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
              <div className="flex gap-4">
                <a href="https://github.com/ShauryaChandna" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent/80 transition-colors text-sm">GitHub</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section 
        id="contact" 
        ref={(el) => { sectionRefs.current['contact'] = el; }}
        data-section="contact"
        className={`min-h-screen flex items-center px-4 md:px-6 py-20 transition-all duration-1000 ${
          visibleSections.has('contact') 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="mx-auto max-w-4xl w-full text-center">
          <h2 className="text-4xl md:text-5xl font-semibold text-accent mb-8">Get In Touch</h2>
          <p className="text-foreground/80 text-lg leading-relaxed mb-12 max-w-2xl mx-auto">
            I&apos;m always interested in new opportunities and exciting projects in data science and machine learning. 
            Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
          </p>
          <a 
            href="mailto:shauryachandna13@gmail.com" 
            className="inline-flex items-center text-accent border border-accent/60 hover:border-accent px-8 py-4 rounded-md transform transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(8,203,0,0.25)]"
          >
            Say Hello
          </a>
          </div>
        </section>

      {/* Sticky left social bar near corner */}
      <div className="fixed bottom-16 left-4 md:left-6 flex flex-col items-center gap-6 animate-fade-in" style={{animationDelay:'700ms'}}>
        <a href="https://github.com/ShauryaChandna" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-foreground/60 hover:text-foreground transition-colors">
          <span className="text-2xl">🐙</span>
        </a>
        <a href="https://www.linkedin.com/in/shaurya-chandna-0a65b9236/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-foreground/60 hover:text-foreground transition-colors">
          <span className="text-2xl">in</span>
        </a>
        <a href="mailto:shauryachandna13@gmail.com" aria-label="Email" className="text-foreground/60 hover:text-foreground transition-colors">
          <span className="text-2xl">@</span>
        </a>
        <div className="w-px h-24 bg-foreground/30" />
      </div>


      {/* Footer */}
      <footer className="border-t border-accent/20 bg-secondary/30 backdrop-blur-sm p-6 mt-10">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-foreground/60 text-xs leading-relaxed">
            Loosely designed in Figma and coded in Cursor by yours truly. Built with Next.js and Tailwind CSS, 
            deployed with GitHub. All text is set in the Inter typeface.
          </p>
        </div>
      </footer>
    </div>
  );
}
