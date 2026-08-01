"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import { ChevronDown, Search, Check } from "lucide-react";
import { banks } from "@/lib/banks";

type Props = {
  value: string;
  onChange: (value: string) => void;
  search?: string;
  onSearchChange?: (value: string) => void;
};

export default function BankSelector({
  value,
  onChange,
  search,
  onSearchChange,
}: Props) {
const [open, setOpen] = useState(false);

const wrapperRef = useRef<HTMLDivElement>(null);

const filteredBanks = useMemo(() => {

    return banks.filter((bank)=>

        bank.name
            .toLowerCase()
            .includes((search ?? "").toLowerCase())

    );

}, [search]);

const selectedBank = banks.find(

    x=>x.id===value

);

useEffect(()=>{

    function handleClickOutside(e: MouseEvent){

        if(
            wrapperRef.current &&
            !wrapperRef.current.contains(e.target as Node)
        ){

            setOpen(false);

        }

    }

    document.addEventListener(
        "mousedown",
        handleClickOutside
    );

    return ()=>{

        document.removeEventListener(
            "mousedown",
            handleClickOutside
        );

    };

},[]);

  return (

<div
    ref={wrapperRef}
    className="relative"
>

    <button
        type="button"
        onClick={()=>setOpen(!open)}
        className="
        flex
        h-14
        w-full
        items-center
        justify-between
        rounded-2xl
        border
        border-white/10
        bg-slate-900/60
        px-5
        transition-all
        duration-300
        hover:border-cyan-500
        "
    >

        <div className="flex items-center gap-3">

            <Search
                size={18}
                className="text-slate-400"
            />

            <span>

                {selectedBank?.name ?? "Cari atau pilih bank"}

            </span>

        </div>

        <ChevronDown
            size={20}
            className={`
                transition-transform
                duration-300
                ${open ? "rotate-180" : ""}
            `}
        />

    </button>

    {
        open && (

            <div
                className="
                absolute
                z-50
                mt-3
                w-full
                overflow-hidden
                rounded-2xl
                border
                border-white/10
                bg-slate-950
                shadow-2xl
                shadow-cyan-500/10
                "
            >
                              <div className="p-3">

                    <div className="relative">

                        <Search
                            size={16}
                            className="
                            absolute
                            left-3
                            top-1/2
                            -translate-y-1/2
                            text-slate-500
                            "
                        />

                        <input
                            value={search}
                            onChange={(e)=>
                                onSearchChange?.(e.target.value)
                            }
                            placeholder="Cari bank..."
                            className="
                            h-11
                            w-full
                            rounded-xl
                            border
                            border-white/10
                            bg-slate-900
                            pl-10
                            pr-3
                            outline-none
                            transition
                            focus:border-cyan-500
                            "
                        />

                    </div>

                </div>
                                <div
                    className="
                    max-h-80
                    overflow-y-auto
                    "
                >

                    {

                        filteredBanks.map(bank=>(

                            <button

                                key={bank.id}

                                type="button"

                                onClick={()=>{

                                    onChange(bank.id);

                                    onSearchChange?.(bank.name);

                                    setOpen(false);

                                }}

                                className="
                                flex
                                w-full
                                items-center
                                justify-between
                                px-5
                                py-4
                                transition
                                hover:bg-slate-800
                                "
                            >

                                <span>

                                    {bank.name}

                                </span>

                                {

                                    value===bank.id && (

                                        <Check
                                            size={18}
                                            className="text-cyan-400"
                                        />

                                    )

                                }

                            </button>

                        ))

                    }

                </div>

            </div>

        )

    }

</div>

);
}