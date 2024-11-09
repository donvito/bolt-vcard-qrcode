import { VCardData } from '../types/VCardData';

export const parseVCardString = (vcardString: string): Partial<VCardData> => {
  const result: Partial<VCardData> = {};
  const lines = vcardString.split('\n');

  for (const line of lines) {
    if (line.startsWith('N:')) {
      result.name = line.substring(2);
    } else if (line.startsWith('ORG:')) {
      result.org = line.substring(4);
    } else if (line.startsWith('TITLE:')) {
      result.title = line.substring(6);
    } else if (line.startsWith('TEL:')) {
      result.tel = line.substring(4);
    } else if (line.startsWith('URL:')) {
      result.url = line.substring(4);
    } else if (line.startsWith('EMAIL:')) {
      result.email = line.substring(6);
    } else if (line.startsWith('ADR:')) {
      result.adr = line.substring(4);
    } else if (line.startsWith('NOTE:')) {
      result.note = line.substring(5);
    } else if (line.startsWith('X-SOCIALPROFILE;TYPE=')) {
      const [type, value] = line.substring(19).split(':');
      switch (type.toLowerCase()) {
        case 'twitter':
          result.twitter = value;
          break;
        case 'linkedin':
          result.linkedin = value;
          break;
      }
    }
  }

  return result;
};