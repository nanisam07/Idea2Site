import React from 'react';

const testimonials = [
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
  return (
    <section className="relative z-10 py-20 px-4 text-white">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-purple-400 mb-4">What Our Clients Say</h2>
        <p className="mb-12 text-gray-300">Hear from people who have worked with us</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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

        
      </div>
    </section>
  );
};

export default Testimonials;
