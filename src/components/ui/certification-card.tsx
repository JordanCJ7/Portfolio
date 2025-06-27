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
}) => (
  <div className="border rounded-lg p-4 space-y-3 hover:shadow-md transition-shadow flex flex-col items-center text-center">
    <a href={credentialUrl} target="_blank" rel="noopener noreferrer" className="group block w-20 h-20 mb-2 relative">
      <Image
        src={imageUrl}
        alt={name + ' logo'}
        fill
        className="object-contain rounded-lg border bg-white group-hover:scale-105 transition-transform"
        sizes="80px"
      />
      <span className="absolute bottom-1 right-1 bg-white/80 rounded-full p-1">
        <ExternalLink className="h-4 w-4 text-primary" />
      </span>
    </a>
    <h4 className="font-semibold text-sm text-foreground mt-2">{name}</h4>
    <p className="text-xs text-muted-foreground">{provider}</p>
    <Badge variant={statusVariant(status)} className="text-xs mt-1 mb-2">{date}</Badge>
    <p className="text-xs text-muted-foreground">{description}</p>
  </div>
);

export default CertificationCard;
