"use client";

import React, { useState } from 'react';

const initialTestimonials = [
  {
    name: 'Raju',
    title: 'UX Designer',
    quote:
      'The team delivered exactly what I needed for my portfolio website. The code was clean, well-organized, and easy to deploy. I highly recommend their services!',
  },
  {
    name: 'Daniel',
    title: 'Startup Founder',
    quote:
      'I was impressed by how quickly they turned my design into a fully functional website. The responsive design works perfectly on all devices, and the code is easy to maintain.',
  },
  {
    name: 'Ravinder',
    title: 'Marketing Director',
    quote:
      'Working with this team was a pleasure. They understood my requirements perfectly and delivered a beautiful, high-performance website that exceeded my expectations.',
  },
];

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [showForm, setShowForm] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [name, setName] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    
    // Create a new testimonial object
    const newTestimonial = {
      name: name,
      title: 'New Client', // Or you could add a new field for title in the form
      quote: feedback,
    };

    // Update the state with the new testimonial
    setTestimonials([newTestimonial, ...testimonials]);

    // Display the thank you message
    setShowForm(false);
    setShowThankYou(true);

    // Reset the form fields
    setName('');
    setFeedback('');

    // Hide the "Thank You" message after 5 seconds
    setTimeout(() => {
      setShowThankYou(false);
    }, 5000);
  };

  return (
    <section className="relative z-10 py-20 px-4 text-white">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-purple-400 mb-4">What Our Clients Say</h2>
        <p className="mb-12 text-gray-300">Hear from people who have worked with us</p>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-lg text-left transition hover:scale-105 hover:shadow-xl"
            >
              <div className="text-blue-400 text-xl mb-2">★★★★★</div>
              <p className="italic text-sm mb-4">"{t.quote}"</p>
              <p className="font-semibold">{t.name}</p>
              <p className="text-gray-400 text-sm">{t.title}</p>
            </div>
          ))}
        </div>

        {/* Conditional rendering for form or button */}
        {!showForm && !showThankYou && (
          <button 
            onClick={() => setShowForm(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out shadow-lg transform hover:-translate-y-1"
          >
            Submit Your Feedback
          </button>
        )}

        {/* Feedback Form */}
        {showForm && (
          <div className="mt-12 max-w-lg mx-auto bg-white/10 p-8 rounded-2xl border border-white/20 shadow-lg text-left">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Share Your Experience</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 rounded-lg bg-white/5 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="feedback" className="block text-sm font-medium text-gray-300 mb-1">Feedback</label>
                <textarea
                  id="feedback"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="w-full p-3 rounded-lg bg-white/5 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none h-32"
                  required
                ></textarea>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out shadow-lg transform hover:-translate-y-1"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Thank You Message */}
        {showThankYou && (
          <div className="mt-12 max-w-lg mx-auto p-8 rounded-2xl bg-white/10 border border-white/20 shadow-lg">
            <h3 className="text-3xl font-bold text-green-400 mb-4">Thank You!</h3>
            <p className="text-gray-300 text-lg">Your feedback has been successfully submitted.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;