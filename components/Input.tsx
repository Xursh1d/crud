import { InputControlSize, Text, TextInput } from "@gravity-ui/uikit";
import React from "react";

interface InputProps {
  label?: string;
  name: string;
  type?: "number" | "search" | "text" | "tel" | "url" | "email" | "password";
  required?: boolean;
  size?: InputControlSize;
  placeholder?: string;
  validationError?: string;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  value?: string | null;
  defaultValue?: string | null;
  rightContent?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({
  label,
  name,
  type = "text",
  required = false,
  size = "l",
  placeholder = "",
  validationError,
  onBlur,
  onChange,
  value = "",
  defaultValue = "",
  rightContent,
}) => {
  const labelContent = label && (
    <>
      <Text variant="body-1" color="primary">
        {label}
      </Text>
      {required && <span className="text-rose-600 text-[15px] font-normal leading-tight">*</span>}
    </>
  );

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={name} className="non-italic leading-8 flex items-center mb-2">
          {labelContent}
        </label>
      )}
      <TextInput
        id={name}
        type={type}
        size={size}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        value={value || ""}
        defaultValue={defaultValue || ""}
        validationState={validationError ? "invalid" : undefined}
        errorMessage={validationError}
        rightContent={rightContent}
      />
    </div>
  );
};

export default Input;
