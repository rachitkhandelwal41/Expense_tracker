type InputBoxProps = {
  name: string;
  text?: string;
  value?: string;
  placeholder?: string;
  type?: string;
  onchange: (name: string, value: string) => void;
};

export function InputBox({
  name,
  
  value,
  placeholder,
  type = "text",
  onchange,
}: InputBoxProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onchange(name, e.target.value);
  };

  return (
    <div>
      <input
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        className="w-full text-center px-4 py-3 border border-white bg-transparent text-white placeholder-white rounded-xl focus:outline-none"
      />
    </div>
  );
}
