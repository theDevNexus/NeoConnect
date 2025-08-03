import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Replace with your actual backend endpoint or Formspree
      const response = await fetch('https://formspree.io/f/YOUR_FORMSPREE_ID', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-6 bg-black text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-sky-500 text-transparent bg-clip-text" data-aos="fade-up">
          Get in Touch
        </h2>
        <p className="text-gray-400 mb-12 max-w-xl mx-auto" data-aos="fade-up" data-aos-delay="100">
          Have a question, suggestion, or want to collaborate? Drop a message below.
        </p>

        <form data-aos="zoom-in" data-aos-delay="200"
          onSubmit={handleSubmit}
          className="bg-white/5 backdrop-blur-md border border-gray-800 rounded-xl p-8 space-y-6 shadow-md"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="w-full p-3 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
              className="w-full p-3 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            placeholder="Your Message"
            required
            className="w-full p-3 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          {submitStatus === 'success' && (
            <div className="p-3 bg-green-900/50 text-green-300 rounded-lg">
              Message sent successfully!
            </div>
          )}
          {submitStatus === 'error' && (
            <div className="p-3 bg-red-900/50 text-red-300 rounded-lg">
              Failed to send message. Please try again.
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full cursor-pointer py-3 px-6 bg-gradient-to-r from-emerald-400 to-sky-500 text-white font-semibold rounded-lg hover:opacity-90 transition-all disabled:opacity-50"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </section>
  );
}