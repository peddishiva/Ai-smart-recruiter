export interface KpiData {
  id: string;
  title: string;
  value: string | number;
  change: number;
  icon: string;
  color: string;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  fill?: string;
  [key: string]: string | number | undefined;
}

export interface Alert {
  id: string;
  title: string;
  message: string;
  time: string;
  priority: 'high' | 'medium' | 'low';
  read: boolean;
}
