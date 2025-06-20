import { useState } from "react";

const DateSelector = ({ onSelect }: { onSelect: (name: string, value: string) => void }) => {
  const [selectedDate, setSelectedDate] = useState("");

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
    onSelect("date", e.target.value); // pass name + value
  };


  return (
    <div className="w-full">
    
      <input
        type="date"
        value={selectedDate}
        onChange={handleDateChange}
        className="w-full  text-center border  text-black bg-sky-400 rounded-xl px-12 py-3.5 text-sm focus:outline-none focus:ring focus:border-white"
      />
    </div>
  );
};

export default DateSelector;
