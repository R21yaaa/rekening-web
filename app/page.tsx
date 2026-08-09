"use client";

import { useEffect, useMemo, useState } from "react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import ValidationCard from "@/components/dashboard/ValidationCard";
import ResultCard from "@/components/dashboard/ResultCard";
import StatsCard from "@/components/dashboard/StatsCard";
import HistoryTable from "@/components/dashboard/HistoryTable";

export type ValidationResult = {
  status: boolean;
  bank: string;
  nama: string;
  rekening: string;
  responseTime: number;
};

export type HistoryItem = ValidationResult & {
  waktu: string;
};

export default function Home() {

  const [loading, setLoading] = useState(false);

  const [result, setResult] =
    useState<ValidationResult | null>(null);

  const [history, setHistory] =
    useState<HistoryItem[]>([]);

  async function loadHistory() {

    try {

      const res = await fetch(
        "https://api.qrisvalidation.com/api/history?t=" + Date.now(),
        {
          cache: "no-store",
        }
      );

      const data = await res.json();

      const historyData: HistoryItem[] = data.map((item: any) => ({

        status: Boolean(item.status),

        bank: item.bank,

        nama: item.nama,

        rekening: item.rekening,

        responseTime: item.response_time ?? 0,

        waktu: new Date(item.created_at)
          .toLocaleTimeString("id-ID"),

      }));

      setHistory(historyData);

    } catch (err) {

      console.error("History Error", err);

    }

  }

  useEffect(() => {

    loadHistory();

    const interval = setInterval(() => {

      loadHistory();

    }, 3000);

    return () => clearInterval(interval);

  }, []);

  const handleResult = (data: ValidationResult) => {

    setResult(data);

    setTimeout(() => {

      loadHistory();

    }, 500);

  };

  const stats = useMemo(() => {

    const total = history.length;

    const success = history.filter(
      (x) => x.status
    ).length;

    const failed = total - success;

    const average =
      total === 0
        ? 0
        : history.reduce(
            (sum, item) => sum + item.responseTime,
            0
          ) / total;

    return {

      total,

      success,

      failed,

      average,

    };

  }, [history]);

  return (

    <main className="min-h-screen bg-[#070B1A] text-white">

      <Navbar />

      <section className="mx-auto w-full max-w-[1750px] px-8 py-10">

        <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">

          <ValidationCard
            loading={loading}
            setLoading={setLoading}
            setResult={handleResult}
          />

          <ResultCard
            loading={loading}
            result={result}
          />

        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 xl:grid-cols-2">

          <StatsCard
            total={stats.total}
            success={stats.success}
            failed={stats.failed}
            average={stats.average}
          />

          <HistoryTable
            history={history}
          />

        </div>

      </section>

      <Footer />

    </main>

  );

}