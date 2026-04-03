import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen">
      {/* Left Side */}
      <div className="hidden lg:flex lg:w-1/2 bg-zinc-950 flex-col justify-between p-12">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white rounded-md" />
          <span className="text-white font-semibold text-xl">Taskflow</span>
        </div>
        <div>
          <blockquote className="text-zinc-300 text-lg leading-relaxed">
            &ldquo;Finally a tool that actually fits how our team works. Setup
            took minutes and we were shipping faster the same day.&rdquo;
          </blockquote>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex w-full lg:w-1/2 items-center justify-center bg-white p-8">
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-zinc-950 rounded-md" />
              <span className="font-semibold text-xl">Taskflow</span>
            </div>
          </div>
          <SignUp />
        </div>
      </div>
    </div>
  );
}
