import { Rows, Select, Text } from "@canva/app-ui-kit";
import * as React from "react";
import { useNotionBuddyStore } from "src/store";
import { HumanFriendlyBlockName } from "src/utilities";

import type { State } from "src/store";


type Props = {
  disabled: boolean;
  selectedPageId: string;
};
export const BlockTypeFilter: React.FC<Props> = ({
  disabled,
  selectedPageId,
}) => {
  const { notionDetails } = useNotionBuddyStore<State>((state) => state);
  const { pageBlocks, selectedBlockType, setNotionDetails } = notionDetails;
  const [filterOptions, setFilterOptions] = React.useState<any>([]);

  React.useEffect(() => {
    const hasPageBlocksLoaded: boolean =
      Object.keys(pageBlocks).includes(selectedPageId);
    if (!hasPageBlocksLoaded) return;

    const { all, unsupported, ...rest } = pageBlocks[selectedPageId];
    const otherBlockKeys = Object.keys(rest);
    const otherBlockOptions = otherBlockKeys.map((key) => ({
      label: HumanFriendlyBlockName[key],
      value: key,
    }));
    setFilterOptions(otherBlockOptions);
  }, [pageBlocks]);

  return (
    <Rows spacing="0.5u">
      <Text variant="bold" size="small" tone="tertiary">
        Type
      </Text>
      <Select
        disabled={disabled}
        value={selectedBlockType}
        onChange={(blockType) =>
          setNotionDetails({ selectedBlockType: blockType })
        }
        stretch
        options={[
          {
            label: "All",
            value: "all",
          },
          ...filterOptions,
          {
            label: "Unsupported",
            value: "unsupported",
          },
        ]}
      />
    </Rows>
  );
};
