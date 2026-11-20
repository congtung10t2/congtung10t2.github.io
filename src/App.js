import { useEffect, useRef, useState } from "react";
import projects from "./projects";
import "./App.css";

const categories = ["All", ...new Set(projects.map((p) => p.cat))];

const gradient = (p) => ({
  background: `radial-gradient(circle at 78% 30%, ${p.c[1]} 0 22%, transparent 23%), linear-gradient(135deg, ${p.c[0]} 0 58%, transparent 58%), ${p.c[1]}`,
});

// Shows the project image; falls back to a colored cover if missing or broken.
function Cover({ project }) {
  const [failed, setFailed] = useState(false);
  if (project.image && !failed) {
    return (
      <div className="cover logo">
        <img src={project.image} alt="" loading="lazy" onError={() => setFailed(true)} />
      </div>
    );
  }
  return <div className="cover" style={gradient(project)} />;
}

function Tags({ items }) {
  return (
    <div className="tags">
      {items.map((s) => (
        <span key={s}>{s}</span>
      ))}
    </div>
  );
}

function ProjectCard({ project, onOpen }) {
  return (
    <button className="card" onClick={() => onOpen(project)}>
      <Cover project={project} />
      <div className="cbody">
        <h3>{project.title}</h3>
        <p>{project.desc}</p>
        <Tags items={project.tags} />
      </div>
    </button>
  );
}

function ProjectDialog({ project, onClose }) {
  const ref = useRef(null);

  useEffect(() => {
    const dlg = ref.current;
    if (project && !dlg.open) dlg.showModal();
    if (!project && dlg.open) dlg.close();
  }, [project]);

  return (
    <dialog
      ref={ref}
      aria-labelledby="dt"
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
    >
      {project && (
        <>
          <Cover project={project} />
          <div className="dbody">
            <h2 id="dt">{project.title}</h2>
            <p>{project.desc}</p>
            <Tags items={project.tags} />
            <div className="btns">
              <a className="btn" href={project.url} target="_blank" rel="noopener noreferrer">
                {project.cta}
              </a>
              <button className="btn alt" onClick={onClose}>Close</button>
            </div>
          </div>
        </>
      )}
    </dialog>
  );
}

export default function App() {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null);
  const visible = projects.filter((p) => filter === "All" || p.cat === filter);

  return (
    <>
      <div className="wrap">
        <header className="top">
          <div className="brand">congtung10t2</div>
          <nav>
            <a href="#work">Work</a>
            <a href="#about">About</a>
          </nav>
        </header>

        <section className="hero">
          <h1>Apps I’ve shipped, code I’ve shared.</h1>
          <p>iOS apps for clients, open source experiments, and a game from university. Pick a category, then open a project for details.</p>
          <div className="stack" role="group" aria-label="Filter projects">
            {categories.map((c) => (
              <button
                key={c}
                className="chip"
                aria-pressed={filter === c}
                onClick={() => setFilter(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </section>

        <main id="work">
          <div className="grid">
            {visible.map((p) => (
              <ProjectCard key={p.title} project={p} onOpen={setSelected} />
            ))}
          </div>
        </main>
      </div>

      <section className="about" id="about">
        <div className="wrap">
          <h2>Want to work together?</h2>
          <p>I build and maintain iOS apps, and I’m happy to talk about navigation, audio streaming, AI features or architecture.</p>
          <a className="btn" href="https://github.com/congtung10t2" target="_blank" rel="noopener noreferrer">See my GitHub</a>
           <a className="btn" href="https://www.linkedin.com/in/hoangcongtung" target="_blank" rel="noopener noreferrer">Connect with me on LinkedIn</a>
        </div>
      </section>

      <div className="wrap">
        <footer>© {new Date().getFullYear()} congtung10t2</footer>
      </div>

      <ProjectDialog project={selected} onClose={() => setSelected(null)} />
    </>
  );
}
