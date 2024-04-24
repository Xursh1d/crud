"use client"
import { Magnifier } from "@gravity-ui/icons";
import { Button, Icon, InputControlSize, TextInput } from "@gravity-ui/uikit";

interface ISearchFieldProps {
  value?: string;
  placeholder?: string;
  size?: InputControlSize | undefined;
  handleChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  handleKeyPress?: React.KeyboardEventHandler<HTMLInputElement> | undefined;
  searchCallBack: () => void
};

function SearchField({
  value,
  handleChange,
  handleKeyPress,
  searchCallBack,
  size = "l",
  placeholder = "Search",
}: ISearchFieldProps) {
  return (
    <TextInput
      size={size}
      value={value}
      className="w-full"
      placeholder={placeholder}
      onChange={handleChange}
      onKeyPress={handleKeyPress}
      rightContent={
        <Button view="flat" onClick={searchCallBack}>
          <Icon data={Magnifier} size={16} />
        </Button>}
    />
  );
}

export default SearchField;
