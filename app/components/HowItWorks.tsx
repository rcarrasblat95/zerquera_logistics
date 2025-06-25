"use client";

import { Truck, MapPin, Package } from "lucide-react";

const steps = [
  {
    icon: <MapPin size={40} className="text-primary" />,
    title: "Schedule your move",
    desc: "Book your movers and truck for the time that works for you.",
  },
  {
    icon: <Package size={40} className="text-primary" />,
    title: "We pick it up",
    desc: "Your items are loaded and secured by our professional movers.",
  },
  {
    icon: <Truck size={40} className="text-primary" />,
    title: "We deliver",
    desc: "Your things arrive safely and on time at the destination.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-white text-black py-20 px-6 text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-12">How it works</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center space-y-4 px-4">
            <div className="bg-gray-100 p-4 rounded-full">{step.icon}</div>
            <h3 className="text-xl font-semibold">{step.title}</h3>
            <p className="text-gray-600">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}