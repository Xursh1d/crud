import { Button, ButtonSize, Icon, IconData } from "@gravity-ui/uikit";

interface ActionButtonProps {
  title: string;
  icon?: IconData | null;
  onClick: () => void;
  size?: ButtonSize | undefined;
  type?: "button" | "submit" | "reset" | undefined
  loading?: boolean
  disabled?: boolean
}

function ActionButton({
  title,
  icon = null,
  onClick,
  size = "l",
  type,
  loading,
  disabled
}: ActionButtonProps) {
  return (
    <Button loading={loading} onClick={onClick} view="action" disabled={disabled} size={size} type={type}>
      {icon && <Icon data={icon} />}
      {title}
    </Button>
  );
}

export default ActionButton;
