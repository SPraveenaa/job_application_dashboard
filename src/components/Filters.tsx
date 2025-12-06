import { useState } from "react";
import { Button } from "antd";
import "antd/dist/reset.css"; // make sure this is imported

interface FiltersProps {
  onFilterChange: (status: string) => void;
}

const Filters = ({ onFilterChange }: FiltersProps) => {
  const [selectedStatus, setSelectedStatus] = useState<string>("");

  const statuses = ["", "applied", "interview", "offer"];

  const handleChange = (status: string) => {
    setSelectedStatus(status);
    onFilterChange(status);
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "8px",
        flexWrap: "wrap",
        marginBottom: "24px",
        justifyContent: "center",
      }}
    >
      {statuses.map((status) => {
        const label = status === "" ? "All" : status.charAt(0).toUpperCase() + status.slice(1);

        return (
          <Button
            key={status || "all"}
            type={selectedStatus === status ? "primary" : "default"}
            onClick={() => handleChange(status)}
          >
            {label}
          </Button>
        );
      })}
    </div>
  );
};

export default Filters;
