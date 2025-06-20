import { useState } from "react";

type DropdownProps = {
  items: string[];
  text:string
  name:string
  onSelect?: (name: string, selected: string) => void;
};

const Dropdown = ({ items, onSelect,text,name }: DropdownProps) => {
  const [selectedItem, setSelectedItem] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedItem(value);
    if (onSelect) {
      onSelect(name, value);
    }
  };

  return (
    <div className="relative w-full">
  <select
    value={selectedItem}
    onChange={handleChange}
    className="w-full border border-white text-white bg-black rounded-xl px-12   py-3.5 text-sm focus:outline-none focus:ring focus:border-white text-center appearance-none"
  >
    <option className=""value="" disabled>
      {text}
    </option>
    {items.map((item, idx) => (
      <option key={idx} value={item}>
        {item}
      </option>
    ))}
  </select>


  <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-white">
    ▼
  </div>
</div>

  );
};

export default Dropdown;
