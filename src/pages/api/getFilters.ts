import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import csv from "csv-parser";
import { CSVLog } from "@/types/Log";
import parseLogLine from "@/utils/parseLogLine";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const filterType = req.query.type?.toString();
    const filePath = path.join(process.cwd(), "weblog.csv");

    if (!filterType) {
      return res.status(400).json({ error: "Missing filter type" });
    }

    const uniqueValues = new Set<string>();
    const readStream = fs.createReadStream(filePath);

    readStream
      .pipe(csv())
      .on("data", (row: CSVLog) => {
        const parsedLog = parseLogLine(row.data);

        if (parsedLog && filterType in parsedLog) {
          const logType = (parsedLog as any)[filterType];
          uniqueValues.add(logType);
        }
      })
      .on("end", () => {
        res.status(200).json(Array.from(uniqueValues));
      });
  } catch (error) {
    res.status(500);
  }
}
