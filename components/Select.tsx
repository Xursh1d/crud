import { Select, SelectOption, SelectOptionGroup, SelectSize, Text } from "@gravity-ui/uikit";

interface SelectProps {
  label?: string | null;
  name?: string;
  required?: boolean;
  value?: string[];
  size?: SelectSize;
  disabled?: boolean;
  loading?: boolean;
  errorMessage?: string;
  placeholder?: string;
  onChange?: (value: string[]) => void;
  onBlur?: (e: React.FocusEvent) => void;
  options?: (SelectOption | SelectOptionGroup)[];
}

export default function SelectField({
  label,
  name,
  value,
  size = "l",
  onChange,
  onBlur,
  errorMessage,
  options,
  placeholder,
  loading,
  disabled = false,
  required = false,
}: SelectProps) {
  return (
    <div className="flex flex-col w-full">
      {label && (
        <label
          htmlFor={name}
          className="flex items-center mb-2 leading-8 non-italic"
        >
          <Text variant="body-1" color="primary">
            {label}
          </Text>
          {required && (
            <span className="text-rose-600 text-[15px] font-normal leading-tight">
              *
            </span>
          )}
        </label>
      )}
      <Select
        onUpdate={onChange}
        onBlur={onBlur}
        width={"max"}
        placeholder={placeholder}
        size={size}
        value={value}
        options={options}
        disabled={disabled}
        loading={loading}
        hasClear
        validationState={errorMessage ? "invalid" : undefined}
        errorMessage={errorMessage}
      />
    </div>
  );
}
