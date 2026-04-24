export default function WhatsAppButton() {
  return (
    <div className="wa-float">
      <span className="wa-label">Chat with us</span>
      <a
        href="https://wa.me/919876543210?text=Hello%2C%20I%27m%20interested%20in%20your%20carpentry%20services."
        className="wa-btn"
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp us"
      >
        💬
      </a>
    </div>
  );
}
