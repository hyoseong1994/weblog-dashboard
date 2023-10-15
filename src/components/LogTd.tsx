import React from "react";

const LogTd = ({ text }: { text: string | number | undefined }) => (
  <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
    {text}
  </td>
);

export default React.memo(LogTd);
