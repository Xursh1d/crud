"use client"
import { TEXT_VARIANTS, Text } from "@gravity-ui/uikit";

interface PageTitleProps {
  textType?: (typeof TEXT_VARIANTS)[number];
  title: string;
}

function PageTitle({ title, textType = "header-2" }: PageTitleProps) {
  return (
    <Text variant={textType} color="primary">
      {title}
    </Text>
  );
}

export default PageTitle;
