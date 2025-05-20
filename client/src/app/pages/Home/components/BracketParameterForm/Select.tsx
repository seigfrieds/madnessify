import React from "react";

type SelectProps = {
  label: string;
  options: Array<string>;
  optionValues: Array<any>;
  optionModifiers?: Array<Array<string>>;
  onChange: (e: any) => void;
};

function Select({
  label,
  options,
  optionValues,
  optionModifiers = [],
  onChange,
}: SelectProps): React.JSX.Element {
  return (
    <>
      <label>{label}</label>
      <select onChange={onChange}>
        {options.map((option, index) => {
          return (
            <option
              selected={
                index < optionModifiers.length && optionModifiers[index].includes("selected")
                  ? true
                  : false
              }
              disabled={
                index < optionModifiers.length && optionModifiers[index].includes("disabled")
                  ? true
                  : false
              }
              hidden={
                index < optionModifiers.length && optionModifiers[index].includes("hidden")
                  ? true
                  : false
              }
              key={index}
              value={optionValues[index]}
            >
              {option}
            </option>
          );
        })}
      </select>
    </>
  );
}

export default Select;
