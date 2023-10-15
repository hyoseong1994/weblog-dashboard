import { filterId } from "@/types/Filter";
import { useEffect, useState } from "react";

interface GroupCheckboxProps {
  id: filterId;
  title: string;
  values: string[];
  onClick: (id: filterId, value: string) => void;
}

const GroupCheckbox = ({ id, title, values, onClick }: GroupCheckboxProps) => {
  const [checkboxs, setCheckbox] = useState<string[]>([]);

  const fetchFilterData = async (type: string) => {
    try {
      const response = await fetch(`/api/getFilters?type=${type}`);
      if (response.ok) {
        const filtersData = await response.json();
        setCheckbox(filtersData);
      } else {
        console.error(`Error fetching data. Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchFilterData(id);
  }, [id]);

  return (
    <div>
      <h2>{title}</h2>
      {checkboxs?.map((checkbox) => (
        <label className="mx-4" key={checkbox}>
          <input
            type="checkbox"
            value={checkbox}
            checked={values.includes(checkbox)}
            onChange={() => onClick(id, checkbox)}
          />
          &nbsp;{checkbox}
        </label>
      ))}
    </div>
  );
};

export default GroupCheckbox;
