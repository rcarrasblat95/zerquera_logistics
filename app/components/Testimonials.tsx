"use client";

import { Star } from "lucide-react";

const reviews = [
  {
    name: "Ashley T.",
    rating: 5,
    text: "Incredible service! The movers were fast, polite, and handled everything with care. 100% recommend!",
  },
  {
    name: "Marcus D.",
    rating: 5,
    text: "They arrived on time and made my move stress-free. The entire process was smooth and professional.",
  },
  {
    name: "Jenna R.",
    rating: 5,
    text: "Best moving experience I've ever had. I loved being able to track them in real-time too!",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-[#f9f9f9] py-20 px-6 text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-12">Loved by thousands</h2>
      <div className="flex flex-col md:flex-row justify-center items-center gap-8 max-w-5xl mx-auto">
        {reviews.map((review, i) => (
          <div key={i} className="bg-white rounded-xl shadow-md p-6 max-w-sm w-full">
            <div className="flex justify-center mb-4">
              {[...Array(review.rating)].map((_, index) => (
                <Star key={index} size={20} className="text-yellow-500 fill-yellow-500" />
              ))}
            </div>
            <p className="text-gray-700 italic">“{review.text}”</p>
            <p className="mt-4 font-semibold text-primary">{review.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}