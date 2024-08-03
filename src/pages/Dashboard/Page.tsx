import {
  ArrowLeftIcon,
  ReloadIcon,
  Box,
  Button,
  Rows,
} from "@canva/app-ui-kit";
import * as React from "react";
import { getPageBlocks } from "src/api";
import {
  NoResultsFound,
  PageBlock,
  PageBlockFilter,
  PageBlockLoading,
  PageWrapper,
} from "src/components";
import { useNotionBuddyStore } from "src/store";
import { SupportedNotionBlocks } from "src/utilities";

import type { PageBlockType } from "src/api";
import type { State } from "src/store";
import type { NotionBlock } from "src/utilities";

import styles from "./Page.css";
import { Connection404 } from "../Connection404";

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
  const [connectionErrorMessage, setConnectionErrorMessage] =
    React.useState<string>("");

  const getPageContent = async () => {
    try {
      const { results } = await getPageBlocks(selectedPage, canvaUserToken);
      const uniqueBlockTypes: NotionBlock[] = Array.from(
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

      const unsupportedBlocks: PageBlockType["results"] = results.filter(
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
    } catch (error: any) {
      const { message, internalStatusCode } = JSON.parse(error?.message);
      setConnectionErrorMessage(`${message} (${internalStatusCode})`);
      setIsPageBlocksReloading(false);
    }
  };

  const hasBlocks: boolean = Object.keys(pageBlocks).includes(selectedPage);
  const isLoading: boolean = !hasBlocks || isPageBlocksReloading;

  const getPageBlocksByFilters = React.useCallback(() => {
    if (isLoading) return [];

    const selectedPageBlocks = pageBlocks[selectedPage][selectedBlockType];
    if (blockSearchQuery === "") {
      return selectedPageBlocks.filter((block) => {
        const plainText: string | undefined =
          block[block.type]["rich_text"]?.[0]?.["plain_text"];
        const equationExpression: string | undefined =
          block[block.type]?.["expression"];
        const isTypographyBlockEmpty =
          plainText === "" || plainText === undefined;
        const isEquationBlockEmpty =
          equationExpression === "" || equationExpression === undefined;

        return showEmptyBlocks
          ? true
          : !isTypographyBlockEmpty || !isEquationBlockEmpty;
      });
    }

    return selectedPageBlocks.filter((block) => {
      const blockText: string | undefined =
        block[block.type]["rich_text"]?.[0]?.["plain_text"]?.toLowerCase();
      const equationBlockText: string | undefined =
        block[block.type]?.["expression"]?.toLowerCase();

      return (
        blockText?.includes(blockSearchQuery.toLowerCase()) ||
        equationBlockText?.includes(blockSearchQuery.toLowerCase())
      );
    });
  }, [blockSearchQuery, showEmptyBlocks, isLoading, selectedBlockType]);

  React.useEffect(() => {
    if (hasBlocks) return;
    getPageContent();
  }, []);

  const currentPageContentBlocks = getPageBlocksByFilters();
  const isCurrentPageContentBlocksEmpty =
    currentPageContentBlocks?.length === 0;

  if (connectionErrorMessage) {
    return <Connection404 errorMessage={connectionErrorMessage} />;
  }
  
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
        {isLoading &&
          Array.from({ length: 8 }).map(() => (
            <PageBlockLoading key={window.crypto.randomUUID()} />
          ))}
        {!isLoading && isCurrentPageContentBlocksEmpty && (
          <NoResultsFound
            action={onBack}
            actionButtonText="Go back to page listing"
            icon={ArrowLeftIcon}
            description={
              blockSearchQuery === "" && showEmptyBlocks
                ? "Create a content block on the page on Notion."
                : "Tweak the filter to display matching Notion content blocks."
            }
          />
        )}
        {!isLoading &&
          !isCurrentPageContentBlocksEmpty &&
          currentPageContentBlocks.map((pageBlock) => (
            <PageBlock block={pageBlock} key={pageBlock.id} />
          ))}
      </Rows>
    </PageWrapper>
  );
};
