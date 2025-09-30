export default function SiteFooter() {
  return (
    <footer className="border-t border-white/20 bg-black text-white">
      <div className="container mx-auto px-4 py-8 grid gap-4 sm:grid-cols-2">
        <div>
          <h3 className="font-headSecondary text-lg">Agency #990</h3>
          <p className="font-body text-sm text-white/70">Full stack creative agency</p>
        </div>
        <div className="flex items-center sm:justify-end gap-4 font-body text-sm">
          <a href="/#contact" className="underline">Contact</a>
          <a href="/pricing" className="underline">Pricing</a>
        </div>
      </div>
      <div className="text-center py-4 text-xs text-white/70 font-body">
        © {new Date().getFullYear()} Agency #990. All rights reserved.
      </div>
    </footer>
  );
}
