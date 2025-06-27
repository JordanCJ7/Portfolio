import React from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { ExternalLink } from 'lucide-react';

interface CertificationCardProps {
  name: string;
  provider: string;
  date: string;
  status: string;
  description: string;
  imageUrl: string;
  credentialUrl?: string;
  aspect?: 'rect' | 'square';
  width?: number;
  height?: number;
  showLinkIcon?: boolean;
}

const statusVariant = (status: string) => {
  if (status === 'completed') return 'default';
  if (status === 'scheduled') return 'secondary';
  return 'outline';
};

const CertificationCard: React.FC<CertificationCardProps> = ({
  name,
  provider,
  date,
  status,
  description,
  imageUrl,
  credentialUrl,
  aspect = 'rect',
  width,
  height,
  showLinkIcon = true,
}) => {
  // Defaults
  const defaultRect = { w: 300, h: 200 };
  const defaultSquare = { w: 200, h: 200 };
  const imgW = width || (aspect === 'square' ? defaultSquare.w : defaultRect.w);
  const imgH = height || (aspect === 'square' ? defaultSquare.h : defaultRect.h);
  return (
    <div className="border rounded-lg p-4 space-y-3 hover:shadow-md transition-shadow flex flex-col items-center text-center">
      <a href={credentialUrl || undefined} target={credentialUrl ? "_blank" : undefined} rel={credentialUrl ? "noopener noreferrer" : undefined} className="group block mb-2 relative" style={{ width: imgW, height: imgH }}>
        <Image
          src={imageUrl}
          alt={name + ' logo'}
          width={imgW}
          height={imgH}
          className="object-contain rounded-lg group-hover:scale-105 transition-transform"
          style={{background: 'none', width: imgW, height: imgH, maxWidth: imgW, maxHeight: imgH}}
        />
        {showLinkIcon && credentialUrl && (
          <span className="absolute bottom-2 right-2 bg-white/80 rounded-full p-1">
            <ExternalLink className="h-5 w-5 text-primary" />
          </span>
        )}
      </a>
      <h4 className="font-semibold text-sm text-foreground mt-2">{name}</h4>
      <p className="text-xs text-muted-foreground">{provider}</p>
      <Badge variant={statusVariant(status)} className="text-xs mt-1 mb-2">{date}</Badge>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  );
};

export default CertificationCard;
