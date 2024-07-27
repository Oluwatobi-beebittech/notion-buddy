import * as React from "react";
import { Box, Rows, SearchInputMenu, Text } from "@canva/app-ui-kit";

type Props = {
  disabled: boolean;
};
export const BlockTextContentFilter: React.FC<Props> = ({ disabled }) => (
  <Rows spacing="0.5u">
    <Text variant="bold" size="small" tone="tertiary">
      Block text content
    </Text>
    <SearchInputMenu
      placeholder="Filter by block text content"
      disabled={disabled}
    />
  </Rows>
);
