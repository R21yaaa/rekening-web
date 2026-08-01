import { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export default function GradientButton({
  children,
  className = "",
  ...props
}: Props) {
  return (
    <button
      {...props}
      className={`
        w-full
        rounded-2xl
        bg-gradient-to-r
        from-blue-500
        via-blue-600
        to-purple-600
        py-4
        text-lg
        font-semibold
        text-white
        shadow-lg
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-blue-500/40
        active:scale-[.98]
        ${className}
      `}
    >
      {children}
    </button>
  );
}