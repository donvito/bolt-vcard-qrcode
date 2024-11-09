import QRCode from 'qrcode';

const LOGO_SIZE_RATIO = 0.3; // Logo will take 30% of QR code size

// Simple profile icon as a data URL to avoid CORS issues
const DEFAULT_LOGO = `data:image/svg+xml,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
  <circle cx="12" cy="7" r="4"></circle>
</svg>
`)}`;

export const generateQRWithLogo = async (
  data: string,
  logoUrl: string = DEFAULT_LOGO
): Promise<string> => {
  try {
    // Generate QR code with higher error correction level
    const qrCanvas = document.createElement('canvas');
    await QRCode.toCanvas(qrCanvas, data, {
      errorCorrectionLevel: 'H', // High error correction to ensure QR works with logo
      margin: 1,
      width: 400,
      color: {
        dark: '#000000',
        light: '#ffffff',
      },
    });

    // Create final canvas for composition
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Could not get canvas context');

    // Set canvas size
    canvas.width = qrCanvas.width;
    canvas.height = qrCanvas.height;

    // Draw QR code
    ctx.drawImage(qrCanvas, 0, 0);

    // Load and draw logo
    const logo = new Image();
    
    try {
      await new Promise((resolve, reject) => {
        logo.onload = resolve;
        logo.onerror = reject;
        logo.crossOrigin = 'anonymous'; // Enable CORS
        logo.src = logoUrl;
      });

      // Calculate logo size and position
      const logoSize = Math.floor(qrCanvas.width * LOGO_SIZE_RATIO);
      const logoX = (qrCanvas.width - logoSize) / 2;
      const logoY = (qrCanvas.height - logoSize) / 2;

      // Create circular clip for logo
      ctx.save();
      ctx.beginPath();
      ctx.arc(
        logoX + logoSize / 2,
        logoY + logoSize / 2,
        logoSize / 2,
        0,
        Math.PI * 2
      );
      ctx.closePath();
      ctx.clip();

      // Draw white background for logo
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(logoX, logoY, logoSize, logoSize);

      // Draw logo
      ctx.drawImage(logo, logoX, logoY, logoSize, logoSize);
      ctx.restore();
    } catch (logoError) {
      console.warn('Failed to load logo, falling back to QR code without logo:', logoError);
    }

    return canvas.toDataURL('image/png');
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw error;
  }
};