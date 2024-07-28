import * as React from "react";
import { Box, Rows, SearchInputMenu, Text } from "@canva/app-ui-kit";
import { useNotionBuddyStore, State } from "src/store";

type Props = {
  disabled: boolean;
};
export const BlockTextContentFilter: React.FC<Props> = ({ disabled }) => {
  const { notionDetails } = useNotionBuddyStore<State>((state) => state);
  const { setNotionDetails } = notionDetails;


  return (
    <Rows spacing="0.5u">
      <Text variant="bold" size="small" tone="tertiary">
        Text content
      </Text>
      <SearchInputMenu
      onChange={(blockSearchQuery)=> setNotionDetails({blockSearchQuery})}
        placeholder="Filter by block text content"
        disabled={disabled}
      />
    </Rows>
  );
};
