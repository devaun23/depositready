"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ShieldCheck, Lock, Clock, ArrowRight } from "lucide-react";

export function Hero() {
  const scrollToEngine = () => {
    document.getElementById("claim-engine")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative pt-28 sm:pt-36 pb-16 sm:pb-24 px-4 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-accent-light/40 via-background to-background" />
      </div>

      <div className="container max-w-2xl mx-auto relative z-10 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-serif text-3xl sm:text-4xl md:text-5xl leading-[1.15] tracking-tight text-foreground"
        >
          Your landlord may owe you{" "}
          <span className="gradient-text">2–3× your security deposit.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-5 text-base sm:text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed"
        >
          Most renters never realize their landlord already violated the law.
          DepositReady checks your case in 60 seconds and shows exactly what you may be owed.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10"
        >
          <Button
            variant="hero"
            size="xl"
            className="w-full sm:w-auto shadow-xl shadow-primary/20"
            onClick={scrollToEngine}
          >
            Check My Case Free
            <ArrowRight className="h-5 w-5" />
          </Button>
          <p className="mt-3 text-xs text-muted-foreground flex items-center justify-center gap-1.5">
            <Clock className="h-3 w-3" /> 60 seconds · No sign-up · Free verdict
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-5 text-xs text-muted-foreground"
        >
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-primary" />
            Money-back guarantee
          </span>
          <span className="h-3 w-px bg-border" />
          <span>2,400+ renter cases analyzed</span>
          <span className="h-3 w-px bg-border" />
          <span className="flex items-center gap-1.5">
            <Lock className="h-3.5 w-3.5 text-primary" />
            Secure &amp; private
          </span>
        </motion.div>
      </div>
    </section>
  );
}
