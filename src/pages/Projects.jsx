import { Link } from "react-router-dom";
import { CTA } from "../components";
import { projects } from "../constants";
import { arrow } from "../assets/icons";

const Projects = () => {
  return (
    <section className="max-container">
      <h1 className="head-text">
        My{" "}
        <span className="blue-gradient_text drop-shadow font-semibold">
          Projects
        </span>
      </h1>

      <p className="text-slate-500 mt-2 leading-relaxed">
        I've embarked on numerous projects throughout the years, but these are
        the ones I hold closest to my heart. Many of them are open-source, so if
        you come across something that piques your interest, feel free to
        explore the codebase and contribute your ideas for further enhancements.
        Your collaboration is highly valued!
      </p>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-20">
        {projects.map((project, index) => (
          <div
            className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            key={index}
          >
            {/* Image Section (Top 60%) */}
            <div className="h-60 w-full overflow-hidden">
              <img
                src={project.image}
                alt={project.name}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Content Section (Bottom 40%) */}
            <div className="p-5">
              <h4 className="text-2xl font-poppins font-semibold mb-2 group-hover:text-blue-600 transition-colors duration-300">
                {project.name}
              </h4>
              <p className="text-slate-500 mb-3 line-clamp-3">{project.description}</p>

              {/* Tech Stack */}
              {project.techStack && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="bg-gray-200 text-gray-800 text-sm px-2 py-1 rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              {/* Live Link */}
              <div className="flex items-center gap-2 font-poppins">
                <Link
                  to={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all duration-300"
                >
                  Live Link
                  <img src={arrow} alt="arrow" className="w-4 h-4 object-contain" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <hr className="border-slate-200" />

      <CTA />
    </section>
  );
};

export default Projects;