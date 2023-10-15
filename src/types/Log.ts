export interface ParsedLog {
  timestamp: string;
  ipAddress: string;
  method: string;
  endpoint: string;
  query?: string;
  protocol: string;
  statusCode: number;
}

export interface CSVLog {
  data: string;
  label: string;
}
