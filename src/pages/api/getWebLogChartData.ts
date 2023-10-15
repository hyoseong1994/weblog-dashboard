import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import csv from "csv-parser";
import { CSVLog, ParsedLog } from "@/types/Log";
import { ChartData } from "@/types/ChartData";
import parseLogLine from "@/utils/parseLogLine";
import { isFiltered, parseArrayQueryParam } from "@/utils/filterFunction";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ChartData[]>
) {
  try {
    const param = req.query;
    const filePath = path.join(process.cwd(), "weblog.csv");
    const methods = parseArrayQueryParam(param.method);
    const statusCodes = parseArrayQueryParam(param.statusCode);
    const ips = parseArrayQueryParam(param.ipAddress);

    const transformedData: Record<string, ChartData> = {};
    const readStream = fs.createReadStream(filePath);

    readStream
      .pipe(csv())
      .on("data", (row: CSVLog) => {
        const parselog = parseLogLine(row.data);

        if (parselog && isFiltered(parselog, methods, statusCodes, ips)) {
          const { method, endpoint, ipAddress, protocol, statusCode } =
            parselog;
          const name = `${method} ${endpoint} ${protocol} ${statusCode}`;

          if (!transformedData[name]) {
            transformedData[name] = {
              name: name,
              [ipAddress]: 1,
            };
          } else if (!transformedData[name][ipAddress]) {
            transformedData[name][ipAddress] = 1;
          } else {
            // Ensure that the value is treated as a number
            transformedData[name][ipAddress] =
              Number(transformedData[name][ipAddress]) + 1;
          }
        }
      })
      .on("end", () => {
        res.status(200).json(Object.values(transformedData));
      });
  } catch (error) {
    res.status(500);
  }
}
