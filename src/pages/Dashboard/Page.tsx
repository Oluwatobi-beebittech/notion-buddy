import * as React from "react";
import styles from "./Page.css";
import {
  ArrowLeftIcon,
  ReloadIcon,
  Box,
  Button,
  Rows,
} from "@canva/app-ui-kit";
import { PageBlock, PageBlockFilter, PageBlockLoading, PageWrapper } from "src/components";
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
  const { pageBlocks, setNotionPageBlocks } = notionDetails;
  const [isPageBlocksReloading, setIsPageBlocksReloading] = React.useState<boolean>(false);

  const getPageContent = async () => {
    const { results } = await getPageBlocks(selectedPage, canvaUserToken);
    const uniqueBlockTypes: Array<string> = Array.from(new Set(results.map(({ type }) => type)));
    let pageBlockFilters = {};
    uniqueBlockTypes.forEach(blockType => {
      const blockTypeCollection = results.filter(({type}) => type === blockType);
      pageBlockFilters = {
        ...pageBlockFilters,
        [blockType]: blockTypeCollection
      }
    })

    const unsupportedBlocks = results.filter(({type}) => !SupportedNotionBlocks.includes(type));
    
    setNotionPageBlocks({ [selectedPage]: {all: results, ...pageBlockFilters, unsupported: unsupportedBlocks} });
    setIsPageBlocksReloading(false);
  };

  const hasBlocks: boolean = Object.keys(pageBlocks).includes(selectedPage);
  const isLoading: boolean = !hasBlocks || isPageBlocksReloading;

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
            onClick={()=> {
              setIsPageBlocksReloading(true);
              getPageContent();
            }}
          />
        </Box>
        <PageBlockFilter disabled={!hasBlocks || isPageBlocksReloading}/>
        {isLoading &&
          Array.from({ length: 8 }).map(() => <PageBlockLoading />)}
        {!isLoading &&
          pageBlocks[selectedPage]['all'].map((pageBlock: any) => (
            <PageBlock block={pageBlock} />
          ))}
      </Rows>
    </PageWrapper>
  );
};
