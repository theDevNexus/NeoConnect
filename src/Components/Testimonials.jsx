// components/Testimonials.jsx
const testimonials = [
  {
    name: "Aarav Sharma",
    role: "Full Stack Developer",
    quote:
      "Neo Connect is a game changer. The tools are fast, accurate, and extremely helpful in my workflow.",
  },
  {
    name: "Ishita Verma",
    role: "Content Writer",
    quote:
      "The summarizer tool saved me hours. The interface is clean and super intuitive!",
  },
  {
    name: "Rohan Mehta",
    role: "CS Student",
    quote:
      "Code Explainer helped me understand tough concepts instantly. This is a must-use site for any developer.",
  },
  {
    name: "Neha Patil",
    role: "UX Designer",
    quote:
      "Beautiful UI with powerful AI tools — everything just flows smoothly. Loved the experience!",
  },
  {
    name: "Yash Deshmukh",
    role: "Backend Engineer",
    quote:
      "Being able to test AI tools so easily in one place is brilliant. Neo saved me tons of time.",
  },
  {
    name: "Sneha Reddy",
    role: "AI Research Intern",
    quote:
      "Each tool is thoughtfully built and actually works! I'm impressed by the quality and speed.",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 px-6 bg-black">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-sky-500 text-transparent bg-clip-text">
          What Users Say
        </h2>
        <p className="text-gray-400 mb-12">
          Hear from the developers and creators who use our tools.
        </p>

        {/* Slider container */}
        <div className="overflow-hidden relative">
          <div className="flex animate-slide gap-6 w-[300%]">
            {[...testimonials, ...testimonials].map((t, index) => (
              <div
                key={index}
                className="min-w-[300px] max-w-sm bg-white/5 border border-gray-800 backdrop-blur rounded-xl p-6 text-left text-white shadow-lg cursor-pointer"
              >
                <p className="text-sm text-gray-300 mb-4">"{t.quote}"</p>
                <div className="text-sm font-semibold text-cyan-400">{t.name}</div>
                <div className="text-xs text-gray-500">{t.role}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
