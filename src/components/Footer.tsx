export function Footer() {
  return (
    <footer
      id="contact"
      className="mt-16 border-t px-6 py-10"
      style={{
        borderColor: "rgba(255,255,255,0.1)",
        background: "rgba(10,8,30,0.55)",
        backdropFilter: "blur(14px)",
      }}
    >
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
        <div>
          <h3 className="mb-2 font-display text-2xl text-white">🌌 Space Kids</h3>
          <p className="text-sm text-white/70">
            A colorful playground for little astronauts learning about our
            Solar System.
          </p>
        </div>
        <div id="about">
          <h4 className="mb-2 text-sm font-bold uppercase tracking-wider text-white/80">
            About Us
          </h4>
          <p className="text-sm text-white/70">
            We turn big space ideas into tiny, fun adventures. Made with love
            for curious kids everywhere.
          </p>
        </div>
        <div>
          <h4 className="mb-2 text-sm font-bold uppercase tracking-wider text-white/80">
            Contact Us
          </h4>
          <p className="text-sm text-white/70">hello@spacekids.example</p>
          <p className="text-sm text-white/70">🚀 123 Milky Way Lane</p>
        </div>
      </div>
      <p className="mt-8 text-center text-xs text-white/50">
        © {new Date().getFullYear()} Space Kids · Reach for the stars ✨
      </p>
    </footer>
  );
}
