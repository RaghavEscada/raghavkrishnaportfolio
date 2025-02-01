import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
import { Fox } from "../models";
import { Loader } from "../components";

const Contact = () => {
  const [currentAnimation, setCurrentAnimation] = useState("idle");

  const handleFocus = () => setCurrentAnimation("walk");
  const handleBlur = () => setCurrentAnimation("run");

  // Handler for hover effect on the button
  const handleMouseEnter = () => setCurrentAnimation("run");  // Set animation to 'run' on hover
  const handleMouseLeave = () => setCurrentAnimation("idle"); // Revert to 'idle' on hover out

  return (
    <section className="relative flex flex-col lg:flex-row max-container p-6">
      <div className="flex-1 min-w-[50%] flex flex-col items-start">
        <h1 className="text-4xl md:text-5xl font-bold text-left text-red-600 leading-tight mb-4">
          Hire Me! <br />
          <span className="text-black font-bold">
            Feels Like 5 Freelancers in 1 Engineer.
          </span>
        </h1>
        <p className="text-lg mb-8">
          From Sales and brainstorming to SaaS, AI, and web development—I'm your all-in-one solution.
        </p>
        <div className="mt-10"> {/* Added margin-top for spacing */}
          {/* Big Button to Direct to Tally Form */}
          <button
            onClick={() => window.open("https://tally.so/r/mObJOa", "_blank")}
            className="btn bg-gradient-to-r from-orange-400 to-yellow-500 hover:from-orange-500 hover:to-yellow-600 text-white font-extrabold text-3xl sm:text-4xl py-6 px-10 sm:py-8 sm:px-14 rounded-3xl transform transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-2xl flex items-center justify-center gap-6 hover:ring-4 hover:ring-yellow-400"
            onFocus={handleFocus}
            onBlur={handleBlur}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Reach Out to Me
          </button>
        </div>
      </div>

      {/* Dog Model */}
      <div className="lg:w-1/2 w-full lg:h-auto md:h-[550px] h-[350px] mt-10 lg:mt-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 75, near: 0.1, far: 1000 }}>
          <directionalLight position={[0, 0, 1]} intensity={2.5} />
          <ambientLight intensity={1} />
          <pointLight position={[5, 10, 0]} intensity={2} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} />
          <Suspense fallback={<Loader />}>
            <Fox
              currentAnimation={currentAnimation}
              position={[0.5, 0.35, 0]}
              rotation={[12.629, -0.6, 0]}
              scale={[0.5, 0.5, 0.5]}
            />
          </Suspense>
        </Canvas>
      </div>
    </section>
  );
};

export default Contact;
