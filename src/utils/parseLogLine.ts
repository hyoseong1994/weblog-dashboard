import { ParsedLog } from "@/types/Log";

export default function parseLogLine(logLine: string): ParsedLog | null {
  const matches = logLine.split(" ");
  if (!matches || matches.length < 6) {
    return null;
  }

  const [
    ipAddress,
    timestamp,
    method,
    endpointWithQuery,
    protocol,
    statusCode,
  ] = matches;

  return {
    timestamp: timestamp.replace("[", ""),
    ipAddress,
    method,
    endpoint: endpointWithQuery.split("?")[0],
    query: endpointWithQuery.split("?")[1],
    protocol,
    statusCode: parseInt(statusCode, 10),
  };
}
