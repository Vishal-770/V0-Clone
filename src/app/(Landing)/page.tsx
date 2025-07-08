"use client";

import { AnimatedBeamDemo } from "@/components/AnimatedBeam";
import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

const HomePage = () => {
  return (
    <div className="bg-background text-foreground w-full">
      {/* Hero Section */}
      <div className="px-6 md:px-10 xl:px-20 mt-32 md:mt-40">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <div className="space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight"
            >
              Build with AI, <br /> Visually & Effortlessly
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="text-lg text-muted-foreground"
            >
              Design and deploy custom UI components powered by AI. Perfect for
              developers, designers, and product teams who want speed and
              precision.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/dashboard">
                <Button size="lg">Get Started</Button>
              </Link>
              <Button variant="outline" size="lg">
                Explore Demo
              </Button>
            </motion.div>
          </div>

          {/* Right: Animation */}
          <div className="w-full">
            <AnimatedBeamDemo />
          </div>
        </div>
      </div>

      {/* Marquee */}
    </div>
  );
};

export default HomePage;
