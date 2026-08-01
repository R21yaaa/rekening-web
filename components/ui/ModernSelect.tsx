type Props = {
  children: React.ReactNode;
};

export default function ModernSelect({ children }: Props) {
  return (
    <select
      className="
        w-full
        rounded-2xl
        border
        border-slate-700
        bg-slate-900/70
        px-4
        py-4
        text-white
        outline-none
        transition
        focus:border-blue-500
      "
    >
      {children}
    </select>
  );
}