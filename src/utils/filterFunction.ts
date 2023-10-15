import { ParsedLog } from "@/types/Log";

export function parseArrayQueryParam(
  param: string | string[] | undefined
): string[] {
  if (typeof param === "string") {
    return param.split(",");
  } else if (Array.isArray(param)) {
    return param;
  }
  return [];
}

export function isFiltered(
  log: ParsedLog,
  methods: string[],
  statusCodes: string[],
  ips: string[]
): boolean {
  const isMethodFiltered = methods.length === 0 || methods.includes(log.method);
  const isStatusCodeFiltered =
    statusCodes.length === 0 || statusCodes.includes(log.statusCode.toString());
  const isIpFiltered = ips.length === 0 || ips.includes(log.ipAddress);

  return isMethodFiltered && isStatusCodeFiltered && isIpFiltered;
}
