"use client";

import React, { useEffect, useState } from "react";
import GroupCheckbox from "./GroupCheckbox";
import { useRouter } from "next/navigation";
import { filterId, filterType } from "@/types/Filter";

const Filters = () => {
  const router = useRouter();
  const [filters, setFilters] = useState<filterType>({
    method: [],
    statusCode: [],
    ipAddress: [],
  });

  const toggleCheck = (id: filterId, value: string) => {
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };
      if (prevFilters[id].includes(value)) {
        updatedFilters[id] = prevFilters[id].filter((v) => v !== value);
      } else {
        updatedFilters[id] = [...prevFilters[id], value];
      }
      return updatedFilters;
    });
  };

  useEffect(() => {
    const urlParams = new URLSearchParams();

    for (const key in filters) {
      if (Array.isArray(filters[key]) && filters[key].length > 0) {
        const values = filters[key].join(",");
        urlParams.append(key, values);
      }
    }

    router.push(`/?${urlParams.toString()}`);
  }, [filters, router]);

  return (
    <div className="mx-4 md:mx-10">
      <GroupCheckbox
        id="method"
        title="Method"
        values={filters.method}
        onClick={toggleCheck}
      />
      <GroupCheckbox
        id="statusCode"
        title="Status Code"
        values={filters.statusCode}
        onClick={toggleCheck}
      />
      <GroupCheckbox
        id="ipAddress"
        title="IP"
        values={filters.ipAddress}
        onClick={toggleCheck}
      />
    </div>
  );
};

export default Filters;
