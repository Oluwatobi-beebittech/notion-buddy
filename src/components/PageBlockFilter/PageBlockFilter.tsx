import * as React from "react";
import {
  Box,
  Column,
  Columns,
  SlidersIcon,
  Text,
} from "@canva/app-ui-kit";
import { BlockTypeFilter } from "./BlockTypeFilter";
import styles from "./PageBlockFilter.css";
import { BlockTextContentFilter } from "./BlockTextContentFilter";
import { EmptyBlockTextContentFilter } from "./EmptyBlockTextContentFilter";

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
