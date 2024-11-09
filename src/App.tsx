import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { VCardForm } from './components/VCardForm';
import { QRCodeDisplay } from './components/QRCodeDisplay';
import { RawEditor } from './components/RawEditor';
import { ThemeToggle } from './components/ThemeToggle';
import { ActionButtons } from './components/ActionButtons';
import { Footer } from './components/Footer';
import { generateVCardString } from './utils/vcard';
import { parseVCardString } from './utils/vcardParser';
import { generateQRWithLogo } from './utils/qrcode';
import { VCardData } from './types/VCardData';
import { sampleData } from './data/sampleData';
import { useTheme } from './hooks/useTheme';

const initialVCardData: VCardData = {
  name: '',
  org: '',
  title: '',
  tel: '',
  url: '',
  email: '',
  adr: '',
  note: '',
  linkedin: '',
  twitter: ''
};

function App() {
  const { isDark, toggleTheme } = useTheme();
  const [vcardData, setVcardData] = useState<VCardData>(initialVCardData);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [showRawEditor, setShowRawEditor] = useState(false);
  const [customLogo, setCustomLogo] = useState<string | null>(null);

  useEffect(() => {
    const generateQR = async () => {
      try {
        const vcardString = generateVCardString(vcardData);
        const url = await generateQRWithLogo(vcardString, customLogo);
        setQrCodeUrl(url);
      } catch (err) {
        console.error(err);
      }
    };
    generateQR();
  }, [vcardData, customLogo]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setVcardData(prev => ({ ...prev, [name]: value }));
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.download = 'vcard-qr.png';
    link.href = qrCodeUrl;
    link.click();
  };

  const handleCopyVCard = () => {
    navigator.clipboard.writeText(generateVCardString(vcardData));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRawVCardChange = (vcardString: string) => {
    try {
      const parsedData = parseVCardString(vcardString);
      setVcardData(prev => ({ ...prev, ...parsedData }));
    } catch (err) {
      console.error('Failed to parse VCard string:', err);
    }
  };

  const handleLogoChange = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setCustomLogo(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 p-6 transition-colors">
      <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
      <div className="max-w-4xl mx-auto">
        <Header />
        
        <ActionButtons
          onLoadSample={() => setVcardData(sampleData)}
          onReset={() => {
            setVcardData(initialVCardData);
            setCustomLogo(null);
          }}
          onToggleRawEditor={() => setShowRawEditor(!showRawEditor)}
          showRawEditor={showRawEditor}
        />

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-8">
            <VCardForm
              vcardData={vcardData}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-8">
            <QRCodeDisplay
              qrCodeUrl={qrCodeUrl}
              onDownload={handleDownload}
              onCopy={handleCopyVCard}
              onLogoChange={handleLogoChange}
              copied={copied}
            />
            
            {showRawEditor && (
              <RawEditor
                vcardString={generateVCardString(vcardData)}
                onChange={handleRawVCardChange}
              />
            )}
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default App;