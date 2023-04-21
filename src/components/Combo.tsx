import React from 'react';
import Select, { SingleValue } from 'react-select';

type Option = {
  value: string;
  label: string;
};
interface Props {
  options: Option[];
  handleChange: (newValue: SingleValue<Option>) => void;
  value: Option['value'];
  className: string;
}

const Combo: React.FC<Props> = ({
  options,
  handleChange,
  value,
  className,
}) => {
  const currentOption = options.find((option) => option.value === value);
  return (
    <Select
      options={options}
      value={currentOption}
      onChange={handleChange}
      placeholder="Currency"
      className={className}
    />
  );
};

export default Combo;
