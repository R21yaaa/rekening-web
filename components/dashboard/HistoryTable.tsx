"use client";

import GlassCard from "@/components/ui/GlassCard";

import {
  ArrowRight,
  CheckCircle2,
  XCircle,
  Clock3,
  Building2,
} from "lucide-react";

type HistoryItem = {
  bank: string;
  nama: string;
  rekening: string;
  responseTime: number;
  status: boolean;
  waktu: string;
};

type Props = {
  history?: HistoryItem[];
};

export default function HistoryTable({
  history = [],
}: Props) {
  return (
    <GlassCard className="min-h-[430px]">

      {/* HEADER */}

      <div className="mb-6 flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-black">

            Riwayat Terakhir

          </h2>

          <p className="text-sm text-slate-400">

            History validasi terbaru

          </p>

        </div>

        <span
          className="
          rounded-full
          bg-slate-800
          px-3
          py-1
          text-xs
          text-slate-400
          "
        >

          {history.length} Data

        </span>

      </div>

      {history.length === 0 ? (

        <div className="flex h-[300px] items-center justify-center">

          <p className="text-slate-500">

            Belum ada riwayat validasi.

          </p>

        </div>

      ) : (

        <div className="space-y-4">

          {history
            .slice()
            .reverse()
            .map((item, index) => (

              <div
                key={index}
                className="
                group
                rounded-2xl
                border
                border-slate-700
                bg-slate-900/40
                p-5
                transition
                duration-300
                hover:-translate-y-1
                hover:border-cyan-500
                hover:bg-slate-900/70
                "
              >

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-4">

                    <div
                      className={`
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-xl
                      ${
                        item.status
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }
                      `}
                    >

                      {item.status ? (
                        <CheckCircle2 size={24} />
                      ) : (
                        <XCircle size={24} />
                      )}

                    </div>

                    <div>

                      <h3 className="font-bold text-lg">

                        {item.bank}

                      </h3>

                      <p className="text-sm text-slate-400">

                        {item.nama}

                      </p>

                    </div>

                  </div>

                  <ArrowRight
                    size={20}
                    className="text-slate-500 transition group-hover:translate-x-1"
                  />

                </div>

                <div className="mt-5 grid grid-cols-3 gap-4">

                  <InfoBox
                    icon={<Building2 size={16} />}
                    title="Rekening"
                    value={item.rekening}
                  />

                  <InfoBox
                    icon={<Clock3 size={16} />}
                    title="Response"
                    value={`${item.responseTime.toFixed(2)} detik`}
                  />

                  <div className="rounded-xl border border-slate-700 bg-slate-900/50 p-3">

                    <p className="text-xs text-slate-400">

                      Waktu

                    </p>

                    <p className="mt-1 font-semibold">

                      {item.waktu}

                    </p>

                  </div>

                </div>

              </div>

            ))}

        </div>

      )}

    </GlassCard>
  );
}

function InfoBox({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900/50 p-3">

      <div className="mb-2 flex items-center gap-2 text-cyan-400">

        {icon}

        <span className="text-xs">

          {title}

        </span>

      </div>

      <p className="font-semibold break-all">

        {value}

      </p>

    </div>
  );
}