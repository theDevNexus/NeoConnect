// components/HeroSection.jsx
export default function HeroSection() {
  return (
    <section id="hero" className="relative overflow-hidden bg-gray-900 text-white">
      <div className="absolute -z-10 top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] h-[800px] bg-gradient-to-br from-indigo-500/10 via-sky-500/10 to-emerald-500/10 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto px-6 py-24 md:py-32 text-center">
        <span className="text-sm font-semibold bg-gradient-to-r from-emerald-400 to-sky-500 bg-clip-text text-transparent mb-3 inline-block">
          AI-Powered Tools for Developers
        </span>

        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6" data-aos="fade-up">
          <span className="bg-gradient-to-r from-emerald-400 to-sky-500 bg-clip-text text-transparent">
            Supercharge{" "}
          </span>
          <span className="text-white">Your Workflow</span>
        </h1>

        <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10" data-aos="fade-up" data-aos-delay="100">
          All-in-one hub for AI productivity. Summarize, explain, generate — all in seconds.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="#tools"
            className="bg-gradient-to-r from-emerald-400 to-sky-500 text-white px-8 py-3 rounded-lg hover:opacity-90 transition font-semibold text-lg shadow-lg" data-aos="zoom-in" data-aos-delay="200"
          >
            Explore Tools
          </a>
          <a
            href="#"
            className="border border-gray-700 text-gray-300 hover:bg-gray-800 px-8 py-3 rounded-lg transition font-semibold text-lg" data-aos="zoom-in" data-aos-delay="250"
          >
            View GitHub
          </a>
        </div>

        <div className="mt-16 flex flex-wrap justify-center gap-10 text-center">
          <div>
            <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">10+</div>
            <div className="text-gray-500">AI Tools</div>
          </div>
          <div>
            <div className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">100%</div>
            <div className="text-gray-500">Free Forever</div>
          </div>
          <div>
            <div className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">24/7</div>
            <div className="text-gray-500">Global Access</div>
          </div>
        </div>
      </div>
    </section>
  );
}
