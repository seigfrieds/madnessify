import React from "react";

type InputProps = {
  label: string;
  onChange: (e: any) => void;
  onFocus: () => void;
};

function Input({ label, onChange, onFocus }: InputProps): React.JSX.Element {
  return (
    <>
      <label>{label}</label>
      <input type="text" onChange={onChange} onFocus={onFocus}></input>
    </>
  );
}

export default Input;
