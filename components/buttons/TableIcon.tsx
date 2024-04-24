"use client";;
import { ChevronRight } from "@gravity-ui/icons";
import { Button, Icon, IconData } from "@gravity-ui/uikit";

interface ITableIcon { callBack: () => void, icon?: IconData }

export default function TableIcon({ callBack, icon = ChevronRight }: ITableIcon) {
  return (
    <Button onClick={callBack} view="flat-secondary" size="m">
      <Icon data={icon} size={16} />
    </Button>
  );
}
