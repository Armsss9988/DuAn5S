import React from "react";
import { Select, Box, FormControl, Text, CheckIcon } from "native-base";

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  value,
  onChange,
  label,
  placeholder,
  defaultValue,
  ...rest
}) => {
  return (
    <FormControl>
      <Select
        minWidth="200"
        selectedValue={value}
        accessibilityLabel={label || placeholder}
        placeholder={label || placeholder}
        onValueChange={onChange}
        defaultValue={defaultValue}
        _selectedItem={{
          bg: "teal.600",
          _icon: {
            color: "white",
          },
        }}
        {...rest}
      >
        {options.map((option) => (
          <Select.Item
            key={option.value}
            label={option.label}
            value={option.value}
          />
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomSelect;
