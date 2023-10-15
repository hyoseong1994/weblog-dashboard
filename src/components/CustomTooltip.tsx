import React from "react";
import { TooltipProps } from "recharts";

const CustomTooltip = ({
  payload,
  label,
  active,
}: TooltipProps<string, string>) => {
  if (!active) {
    return null;
  }

  return (
    <div className="custom-tooltip bg-white border border-gray-300 shadow-md p-2">
      <p className="label text-gray-700">{label}</p>
      {payload?.map((item) => (
        <p key={item.dataKey} className="label text-gray-700">
          {`${item.dataKey} : ${item.value}회`}
        </p>
      ))}
    </div>
  );
};

export default CustomTooltip;
