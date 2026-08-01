"use client";

import GlassCard from "@/components/ui/GlassCard";

import {
  CheckCircle2,
  XCircle,
  Activity,
  Clock3,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

type Props = {
  total?: number;
  success?: number;
  failed?: number;
  average?: number;
};

export default function StatsCard({
  total = 0,
  success = 0,
  failed = 0,
  average = 0,
}: Props) {
  const cards = [
    {
      title: "Total Sukses",
      value: success,
      sub: "+12% dari kemarin",
      icon: <CheckCircle2 size={28} />,
      iconBg: "bg-green-500/20",
      iconColor: "text-green-400",
      subColor: "text-green-400",
      trend: <TrendingUp size={14} />,
    },
    {
      title: "Total Gagal",
      value: failed,
      sub: "-5% dari kemarin",
      icon: <XCircle size={28} />,
      iconBg: "bg-red-500/20",
      iconColor: "text-red-400",
      subColor: "text-red-400",
      trend: <TrendingDown size={14} />,
    },
    {
  title: "Rata-rata Respon",
  value: `${average.toFixed(2)} detik`,
  sub: "Realtime",
  icon: <Clock3 size={28} />,
      iconBg: "bg-violet-500/20",
      iconColor: "text-violet-400",
      subColor: "text-violet-400",
      trend: null,
    },
    {
      title: "Total Validasi",
      value: total,
      sub: "+7% dari kemarin",
      icon: <Activity size={28} />,
      iconBg: "bg-cyan-500/20",
      iconColor: "text-cyan-400",
      subColor: "text-cyan-400",
      trend: <TrendingUp size={14} />,
    },
  ];

  return (
    <GlassCard className="min-h-[430px]">

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-black">

            Statistik Hari Ini

          </h2>

          <p className="text-sm text-slate-400">

            Ringkasan aktivitas validasi

          </p>

        </div>

        <div className="rounded-full bg-cyan-500/10 px-4 py-2 text-xs font-semibold text-cyan-400">

          LIVE

        </div>

      </div>

      <div className="grid grid-cols-2 gap-5">

        {cards.map((item) => (

          <div
            key={item.title}
            className="
              group
              rounded-3xl
              border
              border-slate-700
              bg-slate-900/40
              p-6
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-cyan-500/40
              hover:bg-slate-900/70
            "
          >

            <div className="flex items-center justify-between">

              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl ${item.iconBg} ${item.iconColor}`}
              >
                {item.icon}
              </div>

              {item.trend && (
                <div className={`${item.subColor}`}>
                  {item.trend}
                </div>
              )}

            </div>

            <p className="mt-6 text-sm text-slate-400">

              {item.title}

            </p>

            <h3 className="mt-2 text-4xl font-black tracking-tight">

              {item.value}

            </h3>

            <p className={`mt-3 text-sm ${item.subColor}`}>

              {item.sub}

            </p>

          </div>

        ))}

      </div>

    </GlassCard>
  );
}