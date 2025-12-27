"use client";
import React, { useRef } from "react";
import { useScroll, motion, useTransform } from "framer-motion";

const content = [
  {
    title: "Collaborative Editing",
    description: "Work together in real-time. Changes sync across all devices instantly.",
    color: "bg-blue-500"
  },
  {
    title: "Version Control",
    description: "Never lose a change. Track every modification with built-in versioning.",
    color: "bg-indigo-500"
  },
  {
    title: "AI Insights",
    description: "Let our algorithms find the patterns in your data while you sleep.",
    color: "bg-purple-500"
  }
];

export default function StickyScroll() {
  return (
    <section className="relative flex bg-slate-50 dark:bg-slate-900 py-20">
      <div className="container mx-auto px-6 flex flex-col md:flex-row">
        {/* Left Side: Scrolling Text */}
        <div className="w-full md:w-1/2 space-y-32 py-20">
          {content.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ margin: "-40%" }}
              className="max-w-md"
            >
              <h3 className="text-4xl font-bold mb-6 dark:text-white">{item.title}</h3>
              <p className="text-xl text-slate-600 dark:text-slate-400">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Right Side: Sticky Visuals */}
        <div className="hidden md:block w-1/2 sticky top-40 h-[400px] rounded-3xl overflow-hidden shadow-2xl">
          <div className="relative h-full w-full bg-slate-800 flex items-center justify-center text-white text-2xl">
             <div className="absolute inset-0 bg-grid-white/[0.05]" />
             {/* Dynamic content could go here based on scroll progress */}
             <p className="z-10 font-mono tracking-tighter">Feature Visualizer</p>
          </div>
        </div>
      </div>
    </section>
  );
}