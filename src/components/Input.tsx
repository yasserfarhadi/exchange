import React from 'react';

interface Props {
  value: number;
  changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className: string;
}

const Input: React.FC<Props> = ({ value, changeHandler, className }) => {
  return (
    <input
      className={className}
      type="number"
      value={value}
      onChange={changeHandler}
    />
  );
};

export default Input;
