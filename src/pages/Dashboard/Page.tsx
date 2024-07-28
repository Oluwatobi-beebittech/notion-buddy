import * as React from "react";
import styles from "./Page.css";
import {
  ArrowLeftIcon,
  ReloadIcon,
  Box,
  Button,
  Rows,
} from "@canva/app-ui-kit";
import {
  PageBlock,
  PageBlockFilter,
  PageBlockLoading,
  PageWrapper,
} from "src/components";
import { getPageBlocks } from "src/api";

import { useNotionBuddyStore, State } from "src/store";
import { SupportedNotionBlocks } from "src/utilities";

type Props = {
  onBack: () => void;
  selectedPage: string;
};
export const Page: React.FC<Props> = ({
  selectedPage,
  onBack,
}): JSX.Element => {
  const { userDetails, notionDetails } = useNotionBuddyStore<State>(
    (state) => state
  );
  const { canvaUserToken } = userDetails;
  const {
    blockSearchQuery,
    pageBlocks,
    selectedBlockType,
    setNotionPageBlocks,
    showEmptyBlocks,
  } = notionDetails;
  const [isPageBlocksReloading, setIsPageBlocksReloading] =
    React.useState<boolean>(false);

  const getPageContent = async () => {
    const { results } = await getPageBlocks(selectedPage, canvaUserToken);
    const uniqueBlockTypes: Array<string> = Array.from(
      new Set(results.map(({ type }) => type))
    );
    let pageBlockFilters = {};
    uniqueBlockTypes.forEach((blockType) => {
      const blockTypeCollection = results.filter(
        ({ type }) => type === blockType
      );
      pageBlockFilters = {
        ...pageBlockFilters,
        [blockType]: blockTypeCollection,
      };
    });

    const unsupportedBlocks = results.filter(
      ({ type }) => !SupportedNotionBlocks.includes(type)
    );

    setNotionPageBlocks({
      [selectedPage]: {
        all: results,
        ...pageBlockFilters,
        unsupported: unsupportedBlocks,
      },
    });
    setIsPageBlocksReloading(false);
  };

  const hasBlocks: boolean = Object.keys(pageBlocks).includes(selectedPage);
  const isLoading: boolean = !hasBlocks || isPageBlocksReloading;

  const getPageBlocksBySearchQuery = React.useCallback(() => {
    const selectedPageBlocks = pageBlocks[selectedPage][selectedBlockType];
    if (blockSearchQuery === "") {
      console.log({selectedPageBlocks});
      return selectedPageBlocks.filter((block) =>
        showEmptyBlocks
          ? true
          : block[block.type]["rich_text"]?.[0]?.["plain_text"] !== ("" || undefined)
      );
    }

    return selectedPageBlocks.filter((block) => {
      const blockText =
        block[block.type]["rich_text"]?.[0]?.["plain_text"]?.toLowerCase();

      return blockText?.includes(blockSearchQuery.toLowerCase());
    });
  }, [blockSearchQuery, showEmptyBlocks, isLoading, selectedBlockType]);

  React.useEffect(() => {
    if (hasBlocks) return;
    getPageContent();
  }, []);

  return (
    <PageWrapper>
      <Rows spacing="3u">
        <Box className={styles.pageActionRow}>
          <Button variant="tertiary" icon={ArrowLeftIcon} onClick={onBack}>
            Back
          </Button>
          <Button
            variant="primary"
            icon={ReloadIcon}
            tooltipLabel="Refresh page content"
            disabled={!hasBlocks || isPageBlocksReloading}
            loading={isPageBlocksReloading}
            onClick={() => {
              setIsPageBlocksReloading(true);
              getPageContent();
            }}
          />
        </Box>
        <PageBlockFilter
          disabled={!hasBlocks || isPageBlocksReloading}
          selectedPageId={selectedPage}
        />
        {isLoading && Array.from({ length: 8 }).map(() => <PageBlockLoading key={window.crypto.randomUUID()} />)}
        {!isLoading &&
          getPageBlocksBySearchQuery().map((pageBlock: any) => (
            <PageBlock block={pageBlock} key={pageBlock.id} />
          ))}
      </Rows>
    </PageWrapper>
  );
};
