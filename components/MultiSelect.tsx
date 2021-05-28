import Select, { OptionsType, StylesConfig } from "react-select";

export type SelectOption<ValueType> = {
  label: string;
  value: ValueType;
};

type Props<ValueType> = {
  id: string;
  disabled?: boolean;
  options: SelectOption<ValueType>[];
  onChange: (selectedOptions: OptionsType<SelectOption<ValueType>>) => void;
};

export default function MultiSelect<ValueType>({
  id,
  disabled = false,
  options,
  onChange,
}: Props<ValueType>) {
  const selectStyles: StylesConfig<SelectOption<ValueType>, true> = {
    control: (provided, state) => {
      return {
        ...provided,
        "&:hover": undefined,
        padding: 0,
        border: "1px solid var(--grey-700)",
        backgroundColor: state.isDisabled ? "var(--grey-100)" : "white",
        borderRadius: "4px",
      };
    },
    valueContainer: (provided) => {
      return {
        ...provided,
        padding: "5px 8px",
      };
    },
    placeholder: (provided) => {
      return {
        ...provided,
        color: "var(--grey-700)",
      };
    },
    input: (provided) => {
      return {
        ...provided,
        height: "32px",
        input: {
          height: "auto",
        },
      };
    },
    option: (provided, state) => {
      return {
        ...provided,
        backgroundColor: state.isFocused ? "var(--grey-300)" : "transparent",
        ":active": {
          backgroundColor: "var(--grey-400)",
        },
      };
    },
    multiValue: (provided) => {
      return {
        ...provided,
        backgroundColor: "var(--grey-300)",
      };
    },
    multiValueRemove: (provided) => {
      return {
        ...provided,
        ":hover": {
          color: "white",
          backgroundColor: "red",
        },
      };
    },
    clearIndicator: (provided) => {
      return {
        ...provided,
        color: "var(--grey-700)",
        transition: "none",
        ":hover": {
          color: "white",
          backgroundColor: "red",
        },
      };
    },
    indicatorSeparator: () => {
      return {
        display: "none",
      };
    },
    dropdownIndicator: (provided) => {
      return {
        ...provided,
        ":hover": undefined,
        transition: "none",
        color: "var(--grey-700)",
      };
    },
  };

  return (
    <Select
      styles={selectStyles}
      inputId={id}
      isDisabled={disabled}
      isMulti={true}
      closeMenuOnSelect={false}
      options={options}
      onChange={(selectedOptions) => {
        onChange(selectedOptions);
      }}
    />
  );
}
