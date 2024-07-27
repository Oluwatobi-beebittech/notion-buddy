import * as React from "react";
import { Box, Rows, Select, Text } from "@canva/app-ui-kit";

type Props = {
    disabled: boolean;
}
export const BlockTypeFilter: React.FC<Props> = ({ disabled }) => (
  <Rows spacing="0.5u">
    <Text variant="bold" size="small" tone="tertiary">
      Block type
    </Text>
    <Select
    disabled={disabled}
      stretch
      placeholder="Filter"
      options={[
        {
          label: "All",
          value: "alls",
        },
        {
          label: "Blueberry",
          value: "blueberry",
        },
        {
          label: "Strawberry",
          value: "strawberry",
        },
        {
          description:
            "Why pick a single fruit when you can have a fruit salad?",
          label: "Fruit Salad",
          value: "fruit salad",
        },
      ]}
    />
  </Rows>
);
