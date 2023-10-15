import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import csv from "csv-parser";
import { CSVLog, ParsedLog } from "@/types/Log";
import parseLogLine from "@/utils/parseLogLine";
import { isFiltered, parseArrayQueryParam } from "@/utils/filterFunction";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ParsedLog[]>
) {
  try {
    const { method, statusCode, ipAddress } = req.query;

    const filePath = path.join(process.cwd(), "weblog.csv");
    const data: ParsedLog[] = [];

    const methods = parseArrayQueryParam(method);
    const statusCodes = parseArrayQueryParam(statusCode);
    const ips = parseArrayQueryParam(ipAddress);

    const readStream = fs.createReadStream(filePath);

    readStream
      .pipe(csv())
      .on("data", (row: CSVLog) => {
        const parselog = parseLogLine(row.data);

        if (parselog && isFiltered(parselog, methods, statusCodes, ips)) {
          data.push(parselog);
        }
      })
      .on("end", () => {
        res.status(200).json(data);
      });
  } catch (error) {
    res.status(500);
  }
}
