import * as React from "react";
import {
  Box,
  Column,
  Columns,
  SearchIcon,
  Select,
  SlidersIcon,
  Text,
} from "@canva/app-ui-kit";
import { BlockTypeFilter } from "./BlockTypeFilter";
import styles from "./PageBlockFilter.css";
import { BlockTextContentFilter } from "./BlockTextContentFilter";

type Props = {
    disabled: boolean;
}
export const PageBlockFilter: React.FC<Props> = ({ disabled }) => {
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
      <BlockTypeFilter disabled={disabled} />
      <BlockTextContentFilter disabled={disabled} />
    </Box>
  );
};
