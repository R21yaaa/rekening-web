  "use client";

  import { useMemo, useState } from "react";

  import {
    Landmark,
    ShieldCheck,
    Timer,
    CircleCheck,
    Zap,
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
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setResult: (result: ValidationResult) => void;
  };


  const MAINTENANCE = true;

  export default function ValidationCard({
    loading,
    setLoading,
    setResult,
  }: Props) {

    const [bank, setBank] = useState("");

    const [rekening, setRekening] = useState("");

    const [responseTime, setResponseTime] = useState(0);

    const [status, setStatus] = useState("Ready");

    const [search, setSearch] = useState("");

    const filteredBanks = useMemo(() => {
      return banks.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }, [search]);
    const handleValidation = async () => {

  if (MAINTENANCE) {
    alert(
      "UNDER MAINTENANCE\n\n" +
      "Fitur validasi rekening sedang dalam maintenance.\n" +
      "Silakan coba kembali nanti."
    );
    return;
  }

  if (!bank) {

          alert("Silakan pilih bank.");

          return;

      }

      if (!rekening.trim()) {

          alert("Masukkan nomor rekening.");

          return;

      }

      const selectedBank = banks.find(

          item => item.id === bank

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

          const end = performance.now();

const time = Math.round(end - start);

const seconds = time / 1000;

setResponseTime(seconds);

setResult({
    status: data.status,
    bank: data.bank,
    nama: data.nama,
    rekening: data.rekening,
    responseTime: seconds,
    message: data.message,
});

      }

      catch (err) {

          console.error(err);

          setStatus("Failed");

          alert("Tidak dapat terhubung ke server.");

      }

      finally {

          setLoading(false);

      }

  };

    return (
    <GlassCard className="relative overflow-hidden space-y-6">

      {/* LIVE */}
      <div className="absolute right-6 top-6">
        <span className="rounded-full bg-gradient-to-r from-green-500 to-emerald-500 px-4 py-2 text-xs font-bold tracking-wider text-white">
          ● LIVE
        </span>
      </div>

      {/* HEADER */}
      <div className="flex items-center gap-4">

        <div className="rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 p-3">

          <Landmark size={30} className="text-white"/>

        </div>

        <div>

          <h2 className="text-2xl font-black">
            Validasi Rekening
          </h2>

          <p className="text-slate-400">
            Realtime Bank Account Verification
          </p>

        </div>

      </div>

      {/* PILIH BANK */}

      <div className="space-y-3">

        <label className="text-sm font-semibold uppercase tracking-wider text-slate-300">

          Pilih Bank

        </label>

        <BankSelector
      value={bank}
      onChange={setBank}
      search={search}
      onSearchChange={setSearch}
  />

      </div>

      {/* FAVORIT */}

      <div className="space-y-3">

        <label className="text-sm font-semibold uppercase tracking-wider text-slate-300">

          ⭐ Populer

        </label>

        <div className="mt-3 flex flex-wrap gap-3">

          {["Bank BCA","Bank BRI","Bank BNI","Bank Mandiri","DANA"].map((item)=>(

            <button
      key={item}
      type="button"
      onClick={() => {

          const bankItem = banks.find(
              b => b.name === item
          );

          if (!bankItem) return;

          setBank(bankItem.id);

          setSearch(bankItem.name);

      }}
      className="
      rounded-full
      border
      border-white/10
      bg-slate-900/60
      px-4
      py-2
      text-sm
      transition-all
      duration-300
      hover:border-cyan-500
      hover:bg-slate-800
      "
  >

              {item}

            </button>

          ))}

        </div>

      </div>

      {/* REKENING */}

  <div className="space-y-3">

      <label className="text-sm font-semibold uppercase tracking-wider text-slate-300">

          Nomor Rekening

      </label>

      <ModernInput
          value={rekening}
          onChange={(e)=>setRekening(e.target.value)}
          placeholder="Masukkan nomor rekening"
      />

  </div>

  {/* BUTTON */}

  <GradientButton
  onClick={handleValidation}
  disabled={loading || MAINTENANCE}
  className="
    h-14
    w-full
    rounded-2xl
    text-lg
    font-bold
    transition-all
    duration-300
    hover:scale-[1.02]
    shadow-2xl
    shadow-cyan-500/20
  "
>
  {
    MAINTENANCE ? (

      <div className="flex items-center justify-center gap-3">
        <ShieldCheck size={22} />
        UNDER MAINTENANCE
      </div>

    ) : loading ? (

      <div className="flex items-center justify-center gap-3">

        <div
          className="
            h-5
            w-5
            animate-spin
            rounded-full
            border-2
            border-white
            border-t-transparent
          "
        />

        Memvalidasi Rekening...

      </div>

    ) : (

      <div className="flex items-center justify-center gap-3">

        <Zap
          size={22}
          className="animate-pulse"
        />

        VALIDASI SEKARANG

      </div>

    )
  }
</GradientButton>

  {/* STATS */}

  <div className="grid grid-cols-3 gap-4">

      <div className="glass-card p-5 text-center">

          <ShieldCheck
              className="mx-auto mb-3 text-cyan-400"
              size={24}
          />

          <h3 className="font-bold">
              100%
          </h3>

          <p className="text-xs text-slate-400">
              Secure
          </p>

      </div>

      <div className="glass-card p-5 text-center">

          <Timer
              className="mx-auto mb-3 text-green-400"
              size={24}
          />

          <h3 className="font-bold">

              {responseTime || "<2s"}

          </h3>

          <p className="text-xs text-slate-400">

              Realtime

          </p>

      </div>

      <div className="glass-card p-5 text-center">

          <CircleCheck
    className="mx-auto mb-3 text-violet-400"
    size={24}
/>

<h3 className="font-bold">
    Akurat
</h3>

<p className="text-xs text-slate-400">
    Data terpercaya
</p>

      </div>

  </div>

    </GlassCard>
  );

  }