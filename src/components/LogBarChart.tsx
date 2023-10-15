"use client";
import React, { useEffect, useState } from "react";

import {
  BarChart,
  Brush,
  ReferenceLine,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Bar,
} from "recharts";
import CustomTooltip from "./CustomTooltip";
import useWindowSize from "@/hooks/useWindowSize";
import { ChartData } from "@/types/ChartData";
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";

export default function LogBarChart() {
  const searchParam = useSearchParams();
  const { width } = useWindowSize();
  const [chart, setChart] = useState<ChartData[]>();
  const [ips, setIps] = useState<string[]>();

  const fetchIpAddress = async () => {
    try {
      const ipAddress = await fetch(`/api/getFilters?type=ipAddress`);
      const ipAddressData = await ipAddress.json();
      setIps(ipAddressData);
    } catch (error) {
      console.error("Error fetching IP address data:", error);
    }
  };

  const fetchChartData = async (param: ReadonlyURLSearchParams | null) => {
    try {
      const chart = await fetch(`/api/getWebLogChartData?${param}`);
      const chartData: ChartData[] = await chart.json();
      setChart(chartData);
    } catch (error) {
      console.error("Error fetching chart data:", error);
    }
  };

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  useEffect(() => {
    fetchIpAddress();
  }, []);

  useEffect(() => {
    fetchChartData(searchParam);
  }, [searchParam]);

  return (
    <BarChart
      width={width}
      height={800}
      data={chart}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip content={<CustomTooltip />} />
      <Legend verticalAlign="top" wrapperStyle={{ lineHeight: "40px" }} />
      <ReferenceLine y={0} stroke="#000" />
      <Brush dataKey="name" height={30} stroke="#8884d8" />
      {ips?.map((ip) => (
        <Bar key={ip} dataKey={ip} fill={getRandomColor()} />
      ))}
    </BarChart>
  );
}
