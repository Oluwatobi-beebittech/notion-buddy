import {
  Box,
  Column,
  Columns,
  SlidersIcon,
  Text,
} from "@canva/app-ui-kit";
import * as React from "react";

import { BlockTextContentFilter } from "./BlockTextContentFilter";
import { BlockTypeFilter } from "./BlockTypeFilter";
import { EmptyBlockTextContentFilter } from "./EmptyBlockTextContentFilter";
import styles from "./PageBlockFilter.css";

type Props = {
  disabled: boolean;
  selectedPageId: string;
};
export const PageBlockFilter: React.FC<Props> = ({
  disabled,
  selectedPageId,
}) => {
  return (
    <Box className={styles.pageBlockFilter}>
      <Columns spacing="1u">
        <Column width="content">
          <SlidersIcon />
        </Column>
        <Column width="content">
          <Text variant="bold" size="small">
            Filter
          </Text>
        </Column>
      </Columns>
      <BlockTypeFilter
        disabled={disabled}
        selectedPageId={selectedPageId}
      />
      <BlockTextContentFilter disabled={disabled} />
      <EmptyBlockTextContentFilter disabled={disabled} />
    </Box>
  );
};
