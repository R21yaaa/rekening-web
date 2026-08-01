"use client";

import {
  Heart,
  Rocket,
  ShieldCheck,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10 bg-[#050816]/60 backdrop-blur-xl">

      <div className="mx-auto flex max-w-[1600px] flex-col items-center justify-between gap-6 px-8 py-8 lg:flex-row">

        {/* LEFT */}

        <div>

          <h2 className="text-2xl font-black">

            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">

              R21

            </span>

            <span className="ml-2 text-white">

             Technology

            </span>

          </h2>

          <p className="mt-2 flex items-center gap-2 text-sm text-slate-400">

            Built with

            <Heart
              size={15}
              className="fill-red-500 text-red-500"
            />

            for Indonesia

          </p>

        </div>

        {/* CENTER */}

        <div className="text-center">

          <div className="flex items-center justify-center gap-2">

            <Rocket
              size={18}
              className="text-violet-400"
            />

            <span className="font-semibold">

              QRIS Validation Pro V3 Ultimate

            </span>

          </div>

          <div className="mt-2 flex items-center justify-center gap-2 text-sm text-slate-400">

            <ShieldCheck
              size={16}
              className="text-cyan-400"
            />

            Powered by R21

          </div>

        </div>

        {/* RIGHT */}

        <div className="text-right">

          <p className="text-sm text-slate-500">

            © 2026 R21 Technology

          </p>

          <span className="mt-2 inline-flex rounded-full bg-gradient-to-r from-cyan-500 to-violet-600 px-3 py-1 text-xs font-bold text-white">

            V3.0.0

          </span>

        </div>

      </div>

    </footer>
  );
}