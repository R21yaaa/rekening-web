"use client";

import { useMemo, useState } from "react";

import {
  Landmark,
  Search,
  Timer,
  CircleCheck,
  ShieldCheck,
  Zap,
  Lock,
} from "lucide-react";

import { banks } from "@/lib/banks";
import { validateAccount } from "@/lib/api";

import GlassCard from "@/components/ui/GlassCard";
import GradientButton from "@/components/ui/GradientButton";
import ModernInput from "@/components/ui/ModernInput";
import BankSelector from "@/components/forms/BankSelector";

type ValidationResult = {
  status: boolean;
  bank: string;
  nama: string;
  rekening: string;
  responseTime: number;
  message?: string;
};

type Props = {
  loading: boolean;

  setLoading: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  setResult: (result: ValidationResult) => void;
};

export default function ValidationCardV2({
  loading,
  setLoading,
  setResult,
}: Props) {
  const [bank, setBank] = useState("");

  const [rekening, setRekening] = useState("");

  const [responseTime, setResponseTime] =
    useState(0);

  const [status, setStatus] =
    useState("Ready");

  const [search, setSearch] =
    useState("");

  const filteredBanks = useMemo(() => {

    return banks.filter((bank) =>
      bank.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  }, [search]);

  const handleValidation = async () => {
    if (!bank) {
      alert("Silakan pilih bank.");
      return;
    }

    if (!rekening.trim()) {
      alert("Masukkan nomor rekening.");
      return;
    }

    const selectedBank = banks.find(
      (item) => item.id === bank
    );

    if (!selectedBank) {
      alert("Bank tidak ditemukan.");
      return;
    }

    try {
      setLoading(true);
      setStatus("Checking...");

      const start = performance.now();

      const data = await validateAccount(
        selectedBank.id,
        selectedBank.name,
        rekening
      );

      console.log(data);

      const end = performance.now();

      const time = Math.round(end - start);

      setResponseTime(time);

      if (data.status) {
  setStatus("Success");
} else {
  setStatus("Failed");
}

setResult({
  status: data.status,
  bank: data.bank,
  nama: data.nama,
  rekening: data.rekening,
  responseTime: time,
  message: data.message,
});

// Opsional: hanya tampilkan alert saat gagal
if (!data.status) {
  alert(data.message ?? "Validasi gagal.");
}
    } catch (err) {
  console.error(err);

  setStatus("Failed");

  alert("Tidak dapat terhubung ke server.");
} finally {
  setLoading(false);
}
  };

  return (

<GlassCard
className="
relative
overflow-hidden
space-y-5
transition-all
duration-500
hover:shadow-[0_0_60px_rgba(6,182,212,.15)]
"
>

<div className="absolute right-6 top-6">

    <span
        className="
        rounded-full
        bg-gradient-to-r
        from-green-500
        to-emerald-500
        px-4
        py-2
        text-xs
        font-bold
        uppercase
        tracking-wider
    "
    >

        ● LIVE

    </span>

</div>

    {/* HEADER */}

    <div>

        <div className="flex items-center gap-3">

            <div className="rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 p-4">

                <Landmark
                    size={28}
                    className="text-white"
                />

            </div>

            <div>

                <h2 className="text-3xl font-black">

                    Validasi Rekening

                </h2>

                <p className="text-slate-400">

                    Real-Time Indonesian Bank Validation

                </p>

            </div>

        </div>

    </div>

    {/* SEARCH */}

    <div>

    <label className="mb-3 block font-semibold">

        Pilih Bank

    </label>

    <BankSelector
        value={bank}
        onChange={setBank}
        search={search}
        onSearchChange={setSearch}
    />

</div>

    {/* QUICK BANK */}

    <div>

        <label className="mb-3 block font-semibold">

            Bank Favorit 

        </label>

        <div className="mt-3 flex flex-wrap gap-3">

            {["Bank BCA","Bank BRI","Bank BNI","Bank Mandiri","DANA"].map((item)=>(

                <button
                    key={item}
                    type="button"
                    onClick={()=>{

                        const b=filteredBanks.find(
                            x=>x.name===item
                        );
                        

                        if (b) {

    setBank(b.id);

    setSearch(b.name);

}

                    }}
                    className="
                    rounded-full
                    border
                    border-white/10
                    bg-slate-900/60
                    px-4
                    py-2
                    text-sm
                    transition
                    hover:border-cyan-500
                    hover:bg-slate-800
                    "
                >

                    {item}

                </button>

            ))}

        </div>

    </div>

    {/* INPUT */}

    <div>

        <label className="mb-3 block font-semibold">

            Nomor Rekening

        </label>

        <ModernInput
        className="
h-14
"
            value={rekening}
            onChange={(e)=>
                setRekening(e.target.value)
            }
            placeholder="Masukkan nomor rekening..."
        />

    </div>

      <GradientButton
    disabled={loading}
    onClick={handleValidation}
    className="
    h-16
    w-full
    rounded-2xl
    text-lg
    font-bold
    shadow-2xl
    shadow-blue-600/20
    transition-all
    duration-300
    hover:scale-[1.02]
    "
>

    {loading ? (

        <div className="flex items-center justify-center gap-3">

            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"/>

            <span>

                Memvalidasi Rekening...

            </span>

        </div>

    ) : (

        <div className="flex items-center justify-center gap-3">

            <Zap
    size={22}
    className="
    animate-pulse
    "
/>

            VALIDASI SEKARANG

        </div>

    )}

</GradientButton>

      <div className="grid grid-cols-3 gap-4">

    <div className="glass-card p-5 text-center">

        <ShieldCheck
            className="mx-auto mb-3 text-cyan-400"
            size={26}
        />

        <h3 className="text-xl font-bold">

            100%

        </h3>

        <p className="text-sm text-slate-400">

            Secure

        </p>

    </div>

    <div className="glass-card p-5 text-center">

        <Timer
            className="mx-auto mb-3 text-green-400"
            size={26}
        />

        <h3 className="text-xl font-bold">

            {responseTime || "<2s"}

        </h3>

        <p className="text-sm text-slate-400">

            Realtime

        </p>

    </div>

    <div className="glass-card p-5 text-center">

        <CircleCheck
            className="mx-auto mb-3 text-violet-400"
            size={26}
        />

        <h3 className="text-xl font-bold">

            AI

        </h3>

        <p className="text-sm text-slate-400">

            Validation

        </p>

    </div>

</div>

    </GlassCard>
  );
}