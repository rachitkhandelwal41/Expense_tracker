import React from "react";

interface Props {
  title: string;
  value: string;
}

const SummaryCard: React.FC<Props> = ({ title, value }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-4 shadow text-center">
      <h3 className="text-sm text-gray-400">{title}</h3>
      <p className="text-xl font-bold mt-2">{value}</p>
    </div>
  );
};

export default SummaryCard;
