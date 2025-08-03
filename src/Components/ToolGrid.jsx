// components/ToolGrid.jsx
const tools = [
  {
    title: "Text Summarizer",
    description: "Instantly shorten articles and content with AI precision.",
    icon: "📝",
    link: "/summarizer",
    gradient: "from-purple-500 to-blue-500",
  },
  {
    title: "Image Captioner",
    description: "Auto-generate clear, descriptive captions for any image.",
    icon: "🖼️",
    link: "/image-captioner",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    title: "Code Explainer",
    description: "Decode complex code instantly with AI-powered insights.",
    icon: "💻",
    link: "/code-explainer",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    title: "StartupPitchWriter",
    description: "Generate a compelling startup pitch based on your idea.",
    icon: "🚀",
    link: "/startup-pitch-writer",
    gradient: "from-fuchsia-600 to-pink-500",
  },
  {
    title: "Flashcard Generator",
    description: "Turn your notes into smart flashcards instantly.",
    icon: "📚",
    link: "/flashcard-generator",
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    title: "Resume Polisher",
    description: "Refine and enhance your resume content with AI.",
    icon: "🧰",
    link: "/resume-polisher",
    gradient: "from-blue-500 to-cyan-500",
  },
];

export default function ToolGrid() {
  return (
    <section id="tools" className="py-20 px-6 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-sky-500 text-transparent bg-clip-text">
          Explore Our AI Tools
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto mb-12 text-base">
          Empower your workflow with purpose-built tools designed to save time
          and boost quality.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool, index) => (
            <a
              data-aos="zoom-in"
              data-aos-delay={index * 100}
              key={index}
              href={tool.link}
              className="group relative overflow-hidden rounded-2xl backdrop-blur-md bg-white/5 border border-gray-700 p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.03]"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${tool.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 -z-10`}
              />

              <div
                className={`inline-flex items-center justify-center w-16 h-16 mb-4 rounded-xl bg-gradient-to-br ${tool.gradient} text-white text-3xl shadow-inner shadow-black/20`}
              >
                {tool.icon}
              </div>

              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-blue-600 transition-all">
                {tool.title}
              </h3>

              <p className="text-gray-400 text-base leading-relaxed group-hover:text-gray-300 transition-colors">
                {tool.description}
              </p>

              <div className="mt-6 flex justify-end opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-300">
                <span className="text-blue-400 text-sm font-medium flex items-center gap-1">
                  Try now <span className="translate-x-1">→</span>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
