"use client";

import { ParsedLog } from "@/types/Log";
import LogTableHeader from "./LogTableHeader";
import { useEffect, useState } from "react";
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";

const LogTable = () => {
  const searchParam = useSearchParams();
  const [data, setData] = useState<ParsedLog[]>([]);

  const fetchTableData = async (param: ReadonlyURLSearchParams | null) => {
    try {
      const log = await fetch(`/api/getWebLogList?${param}`);
      const logData: ParsedLog[] = await log.json();
      setData(logData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchTableData(searchParam);
  }, [searchParam]);

  return (
    <div className="mx-4 md:mx-10">
      <h3 className="text-2xl font-bold mb-4">Web Log Table</h3>
      <div className="shadow-lg rounded-lg overflow-x-auto overflow-y-scorll h-96">
        <table className="w-full">
          <LogTableHeader />
          <tbody className="h-96 overflow-y-hidden">
            {data.map((item, index) => (
              <LogTableRow key={index} item={item} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const LogTableRow = ({ item }: { item: ParsedLog }) => (
  <tr>
    <LogTd text={item.timestamp} />
    <LogTd text={item.ipAddress} />
    <LogTd text={item.method} />
    <LogTd text={item.endpoint} />
    <LogTd text={item.query} />
    <LogTd text={item.protocol} />
    <LogTd text={item.statusCode} />
  </tr>
);

const LogTd = ({ text }: { text: string | number | undefined }) => (
  <td className="py-4 px-6 md:px-4 text-center">{text}</td>
);

export default LogTable;
