export default function Footer() {
  return (
    <footer className="mt-10 flex flex-col gap-3 border-t border-stone-200/70 py-6 text-sm text-stone-600 md:flex-row md:items-center md:justify-between">
      <p>No pets were emotionally harmed. Probably.</p>
      <div className="flex flex-wrap items-center gap-4">
        <a href="https://www.instagram.com" target="_blank" rel="noreferrer" className="hover:text-stone-950">Instagram</a>
        <a href="https://www.tiktok.com" target="_blank" rel="noreferrer" className="hover:text-stone-950">TikTok</a>
        <a href="https://twitter.com/intent/tweet?text=My%20pet%20was%20judged%20by%20Pawndora" target="_blank" rel="noreferrer" className="hover:text-stone-950">X</a>
      </div>
    </footer>
  );
}
