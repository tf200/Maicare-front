const Checkbox = ({ id, label, onChange, isChecked }) => {
  const handleChange = () => {
    const newCheckedState = !isChecked;
    onChange(label, newCheckedState);
  };

  return (
    <div>
      <label
        htmlFor={id}
        className="flex items-center cursor-pointer select-none"
      >
        <div className="relative">
          <input
            type="checkbox"
            id={id}
            className="sr-only"
            checked={isChecked}
            onChange={handleChange}
          />
          <div
            className={`mr-4 flex h-5 w-5 items-center justify-center rounded-full border ${
              isChecked && "border-primary"
            }`}
          >
            <span
              className={`h-2.5 w-2.5 rounded-full bg-transparent ${
                isChecked && "!bg-primary"
              }`}
            ></span>
          </div>
        </div>
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
