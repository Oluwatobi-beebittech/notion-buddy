import { Rows, Switch, Text } from "@canva/app-ui-kit";
import * as React from "react";
import { useNotionBuddyStore } from "src/store";

import type { State } from "src/store";


type Props = {
  disabled: boolean;
};
export const EmptyBlockTextContentFilter: React.FC<Props> = ({ disabled }) => {
  const { notionDetails } = useNotionBuddyStore<State>((state) => state);
  const { blockSearchQuery, showEmptyBlocks, setNotionDetails } = notionDetails;

  return (
    <Rows spacing="0.5u">
      <Text variant="bold" size="small" tone="tertiary">
        Show non-text & empty text blocks
      </Text>
      <Switch
        disabled={disabled || blockSearchQuery !== ""}
        value={showEmptyBlocks}
        onChange={(shouldShowEmptyBlocks) =>
          setNotionDetails({ showEmptyBlocks: shouldShowEmptyBlocks })
        }
      />
    </Rows>
  );
};
