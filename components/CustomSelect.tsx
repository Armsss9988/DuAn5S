import React from 'react';
import { Select, Box, FormControl, Text, CheckIcon } from 'native-base';

type Option = {
  label: string;
  value: string;
};

interface CustomSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  // Add other optional props as needed (e.g., disabled)
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  value,
  onChange,
  label,
  ...rest
}) => {
  return (
    <FormControl>
      <Select
        minWidth="200"
        selectedValue={value}
        accessibilityLabel={label || 'Choose Service'}
        placeholder={label || 'Choose Service'}
        onValueChange={onChange}
        _selectedItem={{
          bg: "teal.600",
          _icon: {
            color: "white",
          },
        }}
        {...rest}
      >
        {options.map((option) => (
          <Select.Item key={option.value} label={option.label} value={option.value} />
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomSelect;
