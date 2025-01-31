import emailjs from "@emailjs/browser";
import { Canvas } from "@react-three/fiber";
import { Suspense, useRef, useState } from "react";
import { Send, MessageSquare } from 'lucide-react';

import { Fox } from "../models";
import useAlert from "../hooks/useAlert";
import { Alert, Loader } from "../components";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const { alert, showAlert, hideAlert } = useAlert();
  const [loading, setLoading] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState("idle");

  const handleChange = ({ target: { name, value } }) => {
    setForm({ ...form, [name]: value });
  };

  const handleFocus = () => setCurrentAnimation("walk");
  const handleBlur = () => setCurrentAnimation("idle");

  const validateForm = () => {
    return form.name && form.email && form.phone && form.message;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      showAlert({ show: true, text: "Please fill in all fields.", type: "warning" });
      return;
    }

    setLoading(true);
    setCurrentAnimation("hit");

    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "JavaScript Mastery",
          from_email: form.email,
          to_email: "raghavkrishnaiiitk27@gmail.com",
          phone: form.phone,
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setLoading(false);
          showAlert({
            show: true,
            text: "Thank you for your message 😃",
            type: "success",
          });

          setTimeout(() => {
            hideAlert(false);
            setCurrentAnimation("idle");
            setForm({ name: "", email: "", phone: "", message: "" });
          }, 3000);
        },
        (error) => {
          setLoading(false);
          console.error(error);
          setCurrentAnimation("idle");
          showAlert({ show: true, text: "I didn't receive your message 😢", type: "danger" });
        }
      );
  };

  return (
    <section className="relative flex lg:flex-row flex-col max-container">
      {alert.show && <Alert {...alert} />}

      <div className="flex-1 min-w-[50%] flex flex-col">
      <h1 className="head-text">
  Hire Me! <br/> Feels Like 5 Freelancers in 1 Engineer.
</h1>

        <p className="p-1">From Sales and brainstorming to SaaS, AI, and web development—I'm your all-in-one solution</p>

        <form ref={formRef} onSubmit={handleSubmit} className="w-full flex flex-col gap-7 mt-14">
          <label className="text-black-500 font-semibold">
            Name
            <input
              type="text"
              name="name"
              className="input"
              placeholder="Your Name"
              required
              value={form.name}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>

          <label className="text-black-500 font-semibold">
            Email
            <input
              type="email"
              name="email"
              className="input"
              placeholder="example@gmail.com"
              required
              value={form.email}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>

          <label className="text-black-500 font-semibold">
            Phone Number
            <input
              type="tel"
              name="phone"
              className="input"
              placeholder="+91 6385751370"
              required
              value={form.phone}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>

          <label className="text-black-500 font-semibold">
            Your Message
            <textarea
              name="message"
              rows="4"
              className="textarea"
              placeholder="Write your thoughts here..."
              value={form.message}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="btn bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-3 px-6 rounded-lg transform transition-all duration-200 hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2"
            onFocus={handleFocus}
            onBlur={handleBlur}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin" />
                Sending...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Send className="w-5 h-5" />
                Submit
              </span>
            )}
          </button>
        </form>

        <a
          href={`https://api.whatsapp.com/send?phone=916385751370&text=Hello, I want to get in touch.`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn mt-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-3 px-6 rounded-lg transform transition-all duration-200 hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2"
        >
          <MessageSquare className="w-5 h-5" />
          Contact via WhatsApp
        </a>
      </div>

      <div className="lg:w-1/2 w-full lg:h-auto md:h-[550px] h-[350px]">
        <Canvas camera={{ position: [0, 0, 5], fov: 75, near: 0.1, far: 1000 }}>
          <directionalLight position={[0, 0, 1]} intensity={2.5} />
          <ambientLight intensity={1} />
          <pointLight position={[5, 10, 0]} intensity={2} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} />
          <Suspense fallback={<Loader />}>
            <Fox currentAnimation={currentAnimation} position={[0.5, 0.35, 0]} rotation={[12.629, -0.6, 0]} scale={[0.5, 0.5, 0.5]} />
          </Suspense>
        </Canvas>
      </div>
    </section>
  );
};

export default Contact;
