import { motion } from 'framer-motion';
import { Download } from 'lucide-react';

/**
 * Reusable QR code component.
 * Renders a QR code image for the given URL with PostPilot branding.
 */
export function QRCode({ url, size = 200, showBranding = true }) {
  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(url)}`;

  const handleDownload = async () => {
    try {
      const response = await fetch(qrSrc);
      const blob = await response.blob();
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'postpilot-qr-code.png';
      link.click();
      URL.revokeObjectURL(link.href);
    } catch {
      window.open(qrSrc, '_blank');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="inline-flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-5 shadow-sm"
    >
      <img
        src={qrSrc}
        alt="QR Code"
        width={size}
        height={size}
        className="rounded-lg"
      />

      {showBranding && (
        <p className="text-xs font-medium text-muted-foreground">
          Powered by{' '}
          <span className="bg-gradient-to-r from-violet-500 to-pink-500 bg-clip-text text-transparent font-bold">
            PostPilot
          </span>
        </p>
      )}

      <button
        onClick={handleDownload}
        className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
      >
        <Download className="h-4 w-4" />
        Download QR
      </button>
    </motion.div>
  );
}
