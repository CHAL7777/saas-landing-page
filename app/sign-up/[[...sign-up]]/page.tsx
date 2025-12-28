import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-slate-400">Join Scholarly and start mastering your studies</p>
        </div>
        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-8">
          <SignUp 
            appearance={{
              elements: {
                formButtonPrimary: "bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-medium",
                card: "bg-transparent shadow-none",
                headerTitle: "text-white",
                headerSubtitle: "text-slate-400",
                socialButtonsBlockButton: "border-white/10 hover:border-white/20",
                formFieldInput: "bg-slate-900/50 border-white/10 text-white placeholder:text-slate-500",
                footerActionLink: "text-emerald-400 hover:text-emerald-300"
              }
            }}
            routing="path"
            path="/sign-up"
            signInUrl="/sign-in"
            afterSignUpUrl="/dashboard"
            redirectUrl="/dashboard"
          />
        </div>
      </div>
    </div>
  );
}
