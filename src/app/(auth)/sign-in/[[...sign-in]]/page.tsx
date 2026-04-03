import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
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
            &ldquo;Taskflow helped our team cut delivery time in half. We
            finally have full visibility into every project.&rdquo;
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
          <SignIn />
        </div>
      </div>
    </div>
  );
}
