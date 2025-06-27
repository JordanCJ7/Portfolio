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
  credentialUrl: string;
  aspect?: 'rect' | 'square';
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
}) => (
  <div className="border rounded-lg p-4 space-y-3 hover:shadow-md transition-shadow flex flex-col items-center text-center">
    <a href={credentialUrl} target="_blank" rel="noopener noreferrer" className={`group block w-64 ${aspect === 'square' ? 'aspect-square' : 'aspect-[4/3]'} mb-2 relative`}>
      <Image
        src={imageUrl}
        alt={name + ' logo'}
        fill
        className="object-contain rounded-lg group-hover:scale-105 transition-transform"
        sizes="256px"
        style={{background: 'none'}}
      />
      <span className="absolute bottom-2 right-2 bg-white/80 rounded-full p-1">
        <ExternalLink className="h-5 w-5 text-primary" />
      </span>
    </a>
    <h4 className="font-semibold text-sm text-foreground mt-2">{name}</h4>
    <p className="text-xs text-muted-foreground">{provider}</p>
    <Badge variant={statusVariant(status)} className="text-xs mt-1 mb-2">{date}</Badge>
    <p className="text-xs text-muted-foreground">{description}</p>
  </div>
);

export default CertificationCard;
