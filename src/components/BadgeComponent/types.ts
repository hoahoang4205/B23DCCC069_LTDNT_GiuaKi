export type BadgeTone = 'high' | 'medium' | 'low' | 'overdue' | 'neutral' | 'success';
export type BadgeVariant = 'soft' | 'solid';

export interface BadgeComponentProps {
  label: string;
  tone: BadgeTone;
  variant?: BadgeVariant;
  showDot?: boolean;
}
