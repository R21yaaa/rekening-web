"use client";

import GlassCard from "@/components/ui/GlassCard";

import {
  BadgeCheck,
  Building2,
  User,
  CreditCard,
  Timer,
  Copy,
  CircleCheckBig,
  Sparkles,
  RotateCcw,
  Trash2,
} from "lucide-react";

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
  result: ValidationResult | null;
};

export default function ResultCard({
  loading,
  result,
}: Props) {
  async function copy(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      alert("Nomor rekening berhasil disalin.");
    } catch {
      alert("Gagal menyalin.");
    }
  }
  async function copyAll() {

    if (!result) return;

    const text = `
Nama Pemilik : ${result.nama}
Bank : ${result.bank}
Nomor Rekening : ${result.rekening}
Response Time : ${result.responseTime.toFixed(2)} detik
`;

    try{

        await navigator.clipboard.writeText(text);

        alert("Semua data berhasil disalin.");

    }catch{

        alert("Gagal menyalin.");

    }

}

function clearResult(){

    location.reload();

}

  if (loading) {

    return(

        <GlassCard className="min-h-[640px]">

            <div className="flex h-full flex-col items-center justify-center py-24">

                <div
                className="
                mb-8
                h-20
                w-20
                animate-spin
                rounded-full
                border-4
                border-cyan-500
                border-t-transparent
                "
                />

                <h2
                className="
                text-3xl
                font-black
                "
                >

                    Memvalidasi...

                </h2>

                <p
                className="
                mt-3
                text-slate-400
                "
                >

                    Mohon tunggu beberapa detik.

                </p>

            </div>

        </GlassCard>

    );

}

  if(!result){
    

return(

<GlassCard className="min-h-[640px]">

<div
className="
flex
h-full
flex-col
items-center
justify-center
py-24
"
>

<div
className="
mb-8
flex
h-28
w-28
items-center
justify-center
rounded-full
bg-slate-900
"
>

<Building2

size={58}

className="text-slate-600"

/>

</div>

<h2

className="
text-3xl
font-black
"

>

Belum Ada Validasi

</h2>

<p

className="
mt-4
max-w-sm
text-center
leading-7
text-slate-400
"

>

Silakan lakukan validasi rekening
untuk melihat hasil secara realtime.

</p>

</div>

</GlassCard>

);

}
if (!result.status) {
  return (
    <GlassCard className="min-h-[640px]">
      <div className="rounded-3xl border border-red-500/20 bg-gradient-to-r from-red-500/20 to-rose-500/10 p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500 text-3xl">
            ❌
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[4px] text-red-300">
              INVALID
            </p>

            <h2 className="mt-2 text-3xl font-black">
              Rekening Tidak Valid
            </h2>

            <p className="mt-2 text-red-200">
              {result.message ?? "Account not exists"}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <CardItem
          icon={<Building2 size={20} />}
          title="Bank"
          value={result.bank}
        />

        <CardItem
          icon={<CreditCard size={20} />}
          title="Nomor Rekening"
          value={result.rekening}
        />

        <CardItem
          icon={<Timer size={20} />}
          title="Response Time"
          value={`${result.responseTime.toFixed(2)} detik`}
        />
      </div>
    </GlassCard>
  );
}

  return (
    <GlassCard>

      <div
className="
mb-8
rounded-3xl
border
border-green-500/20
bg-gradient-to-r
from-green-500/15
to-emerald-500/10
p-6
"
>

<div
className="
flex
items-center
gap-5
"
>

<div
className="
flex
h-20
w-20
items-center
justify-center
rounded-3xl
bg-green-500
"
>

<CircleCheckBig

size={42}

className="text-white"

/>

</div>

<div>

<div
className="
mb-2
flex
items-center
gap-2
"
>

<Sparkles

size={18}

className="text-yellow-400"

/>

<span
className="
text-xs
font-bold
uppercase
tracking-[4px]
text-green-300
"
>

VALID

</span>

</div>

<h2

className="
text-3xl
font-black
"

>

Rekening Ditemukan

</h2>

<p

className="
mt-1
text-slate-300
"

>

Valid & Terverifikasi

</p>

</div>

</div>

</div>

      <div className="space-y-4">

        <CardItem
          icon={<User size={20} />}
          title="Nama Pemilik"
          value={result.nama}
        />

        <CardItem
          icon={<Building2 size={20} />}
          title="Bank"
          value={result.bank}
        />

        <CardItem
          icon={<CreditCard size={20} />}
          title="Nomor Rekening"
          value={result.rekening}
          action={
            <button
              onClick={() =>
                copy(result.rekening)
              }
              className="
rounded-xl
border
border-violet-500/30
bg-violet-500/20
p-3
transition
hover:bg-violet-500/30
"
            >
              <Copy size={18} />
            </button>
          }
        />

        <CardItem
          icon={<Timer size={20} />}
          title="Response Time"
          value={`${result.responseTime.toFixed(2)} detik`}
        />
        <div className="mt-6 grid grid-cols-3 gap-4">

<button
  onClick={copyAll}
  className="
  flex
  items-center
  justify-center
  gap-2
  h-12
  rounded-xl
  bg-gradient-to-r
  from-emerald-600/30
  to-green-500/20
  border
  border-emerald-500/30
  text-emerald-300
  font-bold
  transition-all
  duration-300
  hover:scale-[1.02]
  hover:bg-emerald-500/30
  hover:shadow-lg
  hover:shadow-emerald-500/20
  "
>
    <Copy size={18}/>
    COPY SEMUA
</button>

<button
    onClick={() => location.reload()}
    className="
  flex
  items-center
  justify-center
  gap-2
  h-12
  rounded-xl
  bg-gradient-to-r
  from-blue-600/30
  to-cyan-500/20
  border
  border-blue-500/30
  text-cyan-300
  font-bold
  transition-all
  duration-300
  hover:scale-[1.02]
  hover:bg-blue-500/30
  hover:shadow-lg
  hover:shadow-cyan-500/20
  "
>
    <RotateCcw size={18}/>
    CEK LAGI
</button>

<button
    onClick={clearResult}
  className="
  flex
  items-center
  justify-center
  gap-2
  h-12
  rounded-xl
  bg-gradient-to-r
  from-red-600/30
  to-rose-500/20
  border
  border-red-500/30
  text-red-300
  font-bold
  transition-all
  duration-300
  hover:scale-[1.02]
  hover:bg-red-500/30
  hover:shadow-lg
  hover:shadow-red-500/20
  "
>
    <Trash2 size={18}/>
    CLEAR
</button>

</div>

      </div>

    </GlassCard>
  );
}

type CardItemProps = {
  icon: React.ReactNode;
  title: string;
  value: string;
  action?: React.ReactNode;
};

function CardItem({
  icon,
  title,
  value,
  action,
}: CardItemProps) {
  return (
    <div
      className="
      group
      relative
      overflow-hidden
      rounded-3xl
      border
      border-white/10
      bg-slate-900/40
      p-5
      transition-all
      duration-300
      hover:-translate-y-1
      hover:border-cyan-500/50
      hover:bg-slate-900/70
      "
    >

      {/* Glow */}

      <div
        className="
        absolute
        -right-10
        -top-10
        h-28
        w-28
        rounded-full
        bg-cyan-500/10
        blur-3xl
        transition
        group-hover:bg-cyan-500/20
        "
      />

      <div className="relative flex items-center justify-between">

        <div className="flex items-center gap-4">

          {/* Icon */}

          <div
            className="
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            bg-gradient-to-br
            from-cyan-500
            to-blue-600
            shadow-lg
            shadow-cyan-500/20
            "
          >

            {icon}

          </div>

          {/* Text */}

          <div>

            <p
              className="
              text-xs
              font-semibold
              uppercase
              tracking-[3px]
              text-slate-400
              "
            >

              {title}

            </p>

            <p
              className="
              mt-2
              break-all
              text-xl
              font-bold
              text-white
              "
            >

              {value}

            </p>

          </div>

        </div>

        {action}

      </div>

    </div>
  );
}