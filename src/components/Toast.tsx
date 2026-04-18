interface ToastProps {
  visible: boolean;
}

export default function Toast({ visible }: ToastProps) {
  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 rounded-[22px] border border-white/10 bg-stone-950 px-5 py-4 text-sm text-amber-50 shadow-[0_24px_60px_rgba(0,0,0,0.35)]">
      <p className="font-serif text-lg font-bold">Defendant received.</p>
      <p className="font-serif text-amber-100/80">Court convening shortly.</p>
    </div>
  );
}
