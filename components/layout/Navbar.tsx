"use client";

import Image from "next/image";
import {
  Moon,
  Sun,
  BarChart3,
  ChevronDown,
} from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#070B1A]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-[1750px] items-center justify-between px-8">

        {/* LEFT */}

        <div className="flex items-center gap-4">

          {/* LOGO */}

          <div className="flex items-center justify-center">

            <Image
              src="/logo.png"
              alt="R21 Logo"
              width={64}
              height={64}
              priority
              className="h-14 w-auto drop-shadow-[0_0_20px_rgba(59,130,246,.45)]"
            />

          </div>

          {/* TITLE */}

          <div className="leading-tight">

            <div className="flex items-center gap-3">

              <h1 className="text-[34px] font-black tracking-tight">

                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">

                  R21

                </span>

                <span className="ml-2 text-white">

                  QRIS Validation Pro

                </span>

              </h1>

              <span
                className="
                rounded-full
                bg-gradient-to-r
                from-violet-600
                to-fuchsia-600
                px-3
                py-1
                text-[11px]
                font-bold
                uppercase
                tracking-wide
                text-white
                "
              >

                V3 Ultimate

              </span>

            </div>

            <p className="mt-1 text-sm text-slate-400">

              Real-Time Indonesian Bank Account Validation

            </p>

          </div>

        </div>

        {/* RIGHT */}

        <div className="flex items-center gap-3">

          {/* Sun */}

          <button
            className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            border
            border-white/10
            bg-slate-900/70
            transition
            hover:border-cyan-500
            hover:bg-slate-800
            "
          >

            <Sun
              size={18}
              className="text-slate-400"
            />

          </button>

          {/* Moon */}

          <button
            className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            bg-gradient-to-r
            from-blue-600
            to-violet-600
            shadow-lg
            shadow-blue-600/30
            "
          >

            <Moon
              size={18}
              className="text-white"
            />

          </button>

          <div className="mx-2 h-8 w-px bg-white/10" />

          {/* Chart */}

          <button
            className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            border
            border-white/10
            bg-slate-900/60
            transition
            hover:border-cyan-500
            "
          >

            <BarChart3
              size={18}
              className="text-slate-300"
            />

          </button>

          {/* Avatar */}

          <button
            className="
            flex
            items-center
            gap-2
            rounded-full
            border
            border-white/10
            bg-slate-900/60
            px-2
            py-2
            transition
            hover:border-cyan-500
            "
          >

            <div
              className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              bg-gradient-to-br
              from-cyan-500
              to-blue-600
              text-sm
              font-bold
              text-white
              "
            >

              R

            </div>

            <ChevronDown
              size={16}
              className="text-slate-400"
            />

          </button>

        </div>

      </div>
    </header>
  );
}