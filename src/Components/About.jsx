export default function About() {
  return (
    <section id="about" className="py-20 px-6 bg-gray-950 text-gray-300">
      <div className="max-w-5xl mx-auto text-center">
        {/* Section Heading */}
        <h2
          data-aos="fade-up"
          className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-sky-500 bg-clip-text text-transparent"
        >
          About Neo Connect
        </h2>

        {/* Description */}
        <p
          data-aos="fade-up"
          data-aos-delay="100"
          className="text-gray-400 max-w-3xl mx-auto mb-8 text-base sm:text-lg leading-relaxed"
        >
          Neo Connect is your all-in-one platform for AI-powered productivity.
          Whether you're a developer, student, or enthusiast, our tools are
          built to simplify your workflow, help you learn faster, and save
          time. No logins. No fees. Just free, instant utility — available 24/7.
        </p>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-12">
          {[
            {
              title: "Made for Developers",
              icon: "💡",
              desc: "Designed with clean UI and speed in mind for dev workflows.",
              animation: "fade-right",
              delay: "0",
            },
            {
              title: "Powered by AI",
              icon: "⚡",
              desc: "Backed by state-of-the-art AI models under the hood.",
              animation: "fade-up",
              delay: "100",
            },
            {
              title: "Free & Accessible",
              icon: "🌍",
              desc: "Open access tools that anyone can use — anywhere, anytime.",
              animation: "fade-left",
              delay: "200",
            },
          ].map((item, index) => (
            <div
              key={index}
              data-aos={item.animation}
              data-aos-delay={item.delay}
              className="rounded-xl border border-gray-800 bg-white/5 backdrop-blur p-6 transition-transform duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {item.title}
              </h3>
              <p className="text-gray-400 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
