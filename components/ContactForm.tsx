"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2, CheckCircle2, GraduationCap } from "lucide-react";

type FormData = {
  name: string;
  email: string;
  university: string;
  message: string;
};

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    // Simulate API call to your support system
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSuccess(true);
    reset();
    setTimeout(() => setIsSuccess(false), 5000);
  };

  const inputStyles = `w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300`;

  return (
    <section id="contact" className="py-24 bg-[#020617] border-t border-white/5 relative overflow-hidden">
      {/* Subtle ambient glow */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-emerald-500/5 blur-[100px] rounded-full" />

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-[10px] font-black tracking-widest uppercase rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
             <GraduationCap size={14} /> Student Support Desk
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            Need a <span className="text-emerald-400">helping hand?</span>
          </h2>
          <p className="text-slate-400">Questions about your account, campus deals, or feature requests? Let's talk.</p>
        </div>

        <div className="relative group">
          {/* Form Glow Effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-[2.5rem] blur-xl opacity-50 group-hover:opacity-100 transition duration-1000"></div>

          <div className="relative bg-slate-900/40 backdrop-blur-xl p-8 md:p-12 rounded-[2rem] border border-white/10 shadow-2xl">
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit(onSubmit)} 
                  className="space-y-6"
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-black uppercase tracking-widest mb-2 text-slate-500">Name</label>
                      <input
                        {...register("name", { required: "Name is required" })}
                        placeholder="Alex Johnson"
                        className={`${inputStyles} ${errors.name ? 'border-red-500/50 focus:ring-red-500/30' : ''}`}
                      />
                      {errors.name && <p className="text-red-400 text-[10px] mt-2 font-bold uppercase tracking-wide">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-black uppercase tracking-widest mb-2 text-slate-500">Uni Email</label>
                      <input
                        {...register("email", { 
                          required: "Email is required",
                          pattern: { value: /^\S+@\S+$/i, message: "Invalid email" }
                        })}
                        placeholder="alex@university.edu"
                        className={`${inputStyles} ${errors.email ? 'border-red-500/50 focus:ring-red-500/30' : ''}`}
                      />
                      {errors.email && <p className="text-red-400 text-[10px] mt-2 font-bold uppercase tracking-wide">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest mb-2 text-slate-500">University / College</label>
                    <input
                      {...register("university")}
                      placeholder="State University"
                      className={inputStyles}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest mb-2 text-slate-500">How can we help?</label>
                    <textarea
                      {...register("message", { required: "Message is required" })}
                      rows={4}
                      placeholder="I'm having trouble syncing my Canvas calendar..."
                      className={`${inputStyles} ${errors.message ? 'border-red-500/50 focus:ring-red-500/30' : ''}`}
                    />
                    {errors.message && <p className="text-red-400 text-[10px] mt-2 font-bold uppercase tracking-wide">{errors.message.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-emerald-500 text-slate-950 py-4 rounded-xl font-black text-sm uppercase tracking-[0.2em] hover:bg-emerald-400 disabled:opacity-50 flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)]"
                  >
                    {isSubmitting ? <Loader2 className="animate-spin" /> : <Send size={18} />}
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </motion.form>
              ) : (
                <motion.div 
                  key="success"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="py-12 text-center"
                >
                  <div className="w-20 h-20 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-500/20">
                    <CheckCircle2 size={48} />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-tighter">Message Sent!</h3>
                  <p className="text-slate-400 font-medium">We'll get back to your student email within a few hours.</p>
                  <button 
                    onClick={() => setIsSuccess(false)}
                    className="mt-8 text-emerald-400 text-xs font-black uppercase tracking-widest hover:text-emerald-300 transition-colors"
                  >
                    Send another inquiry
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}