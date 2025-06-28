"use client";

import { signInWithGithub } from "@/actions/auth";
import { useTransition } from "react";
import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OrbitingCirclesDemo } from "@/components/LoginModel";

const LoginPage = () => {
  const [isPending, startTransition] = useTransition();

  const handleGithubLogin = () => {
    startTransition(async () => {
      await signInWithGithub();
    });
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-background text-foreground">
      {/* Left Side: Hero Graphic and Marketing Text */}
      <div className="hidden lg:flex w-1/2 bg-background text-foreground flex-col justify-center items-center relative px-8">
        {/* Orbiting Animation */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
          <OrbitingCirclesDemo />
        </div>

        {/* Text Content */}
        <div className="relative z-10 text-center space-y-6 max-w-md mx-auto">
          <h1 className="text-4xl font-bold leading-tight">
            Build Components with AI
          </h1>
          <p className="text-lg text-muted-foreground">
            Speed up your development process with intelligent, AI-assisted
            component generation tailored for modern frameworks.
          </p>
        </div>

        {/* Footer Text */}
        <div className="absolute bottom-10 text-xs text-muted-foreground">
          Powered by AI. Designed for Developers.
        </div>
      </div>

      {/* Right Side: Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 sm:px-8 bg-background">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">
              Welcome to <span className="text-primary">Component Builder</span>
            </h1>
            <p className="text-sm text-muted-foreground">
              Instantly generate, preview, and deploy components — all in one
              place.
            </p>
          </div>

          <Button
            onClick={handleGithubLogin}
            disabled={isPending}
            className="w-full gap-2 mt-4"
            variant="outline"
          >
            <Github className="h-4 w-4" />
            {isPending ? "Redirecting..." : "Continue with GitHub"}
          </Button>

          <div className="text-center text-xs text-muted-foreground px-4 pt-6">
            By continuing, you agree to our{" "}
            <a
              href="#"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="#"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </a>
            .
          </div>

          <div className="pt-8 text-center text-muted-foreground text-xs">
            Don’t have a GitHub account?{" "}
            <a
              href="https://github.com/signup"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-primary"
            >
              Create one here
            </a>
            .
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
