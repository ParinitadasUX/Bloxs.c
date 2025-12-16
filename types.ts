import { LucideIcon } from 'lucide-react';

export interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  badge?: string;
}

export interface StepItemProps {
  id: number;
  text: string;
  active?: boolean;
}

export interface IntegrationLogoProps {
  name: string;
  className?: string;
}