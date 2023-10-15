import React from "react";
import Filters from "@/components/Filters";
import LogBarChart from "@/components/LogBarChart";
import LogTable from "@/components/LogTable";

function Home() {
  return (
    <div className="my-8">
      <h1 className="text-2xl font-bold mb-4 text-center">Web Log</h1>
      <Filters />
      <LogBarChart />
      <LogTable />
    </div>
  );
}

export default Home;
