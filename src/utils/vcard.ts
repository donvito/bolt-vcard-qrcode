import { VCardData } from '../types/VCardData';

export const generateVCardString = (data: VCardData): string => {
  const socialUrls = [
    data.twitter && `X-SOCIALPROFILE;TYPE=twitter:${data.twitter}`,
    data.linkedin && `X-SOCIALPROFILE;TYPE=linkedin:${data.linkedin}`,
  ].filter(Boolean);

  return `BEGIN:VCARD
VERSION:3.0
N:${data.name}
ORG:${data.org}
TITLE:${data.title}
TEL:${data.tel}
URL:${data.url}
EMAIL:${data.email}
ADR:${data.adr}
NOTE:${data.note}
${socialUrls.join('\n')}
END:VCARD`;
}