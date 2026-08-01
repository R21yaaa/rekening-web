import { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement>;

export default function ModernInput(props: Props) {
  return (
    <input
      {...props}
      className="
        w-full
        rounded-2xl
        border
        border-slate-700
        bg-slate-900/70
        px-4
        py-4
        text-white
        placeholder:text-slate-500
        outline-none
        transition
        focus:border-blue-500
        focus:ring-2
        focus:ring-blue-500/20
      "
    />
  );
}