import React from "react";

const headers = [
  "Timestamp",
  "IP Address",
  "Method",
  "Endpoint",
  "Query",
  "Protocol",
  "Status Code",
];

const LogTableHeader = () => {
  return (
    <thead className="sticky top-0 bg-gray-100">
      <tr>
        {headers.map((header) => (
          <LogTh key={header} text={header} />
        ))}
      </tr>
    </thead>
  );
};

const LogTh = ({ text }: { text: string }) => (
  <th className="py-4 px-6 md:px-4">{text}</th>
);

export default LogTableHeader;
