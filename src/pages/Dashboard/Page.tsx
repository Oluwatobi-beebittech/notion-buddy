import * as React from "react";
import styles from "./Page.css";
import {
  ArrowLeftIcon,
  ReloadIcon,
  Badge,
  Box,
  Button,
  Rows,
  Text,
  TitlePlaceholder,
} from "@canva/app-ui-kit";
import { PageWrapper, TypographyCard } from "src/components";
import { getPageBlocks } from "src/api";
import { HumanFriendlyBlockName, SupportedNotionBlocks } from "src/utilities";
import { addNativeElement, ui } from "@canva/design";
import { useSelection } from "utils/use_selection_hook";

import { useNotionBuddyStore, State } from "src/store";

type Props = {
  onBack: () => void;
  selectedPage: string;
};
export const Page: React.FC<Props> = ({
  selectedPage,
  onBack,
}): JSX.Element => {
  const { userDetails } = useNotionBuddyStore<State>((state) => state);
  const { canvaUserToken } = userDetails;
  const [pageBlocks, setPageBlocks] = React.useState([]);

  const getPage = async () => {
    const { results } = await getPageBlocks(selectedPage, canvaUserToken);
    setPageBlocks(results);
    const unique = new Set(results.map(({ type }) => type));
    console.log({ results, u: Array.from(unique), unique });
  };

  React.useEffect(() => {
    getPage();
  }, []);

  function handleDragStart(event: React.DragEvent<HTMLElement>, textCollection: Array<string>) {
    ui.startDrag(event, {
      type: "TEXT",
      children: textCollection,
    });
  }

  if (pageBlocks.length === 0) {
    return (
      <>
        {Array.from({ length: 8 }).map(() => (
          <TitlePlaceholder size="medium" />
        ))}
      </>
    );
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
          />
        </Box>
        {pageBlocks.map((pageBlock: any) => {
          const text =
            pageBlock[pageBlock.type]["rich_text"]?.[0]?.["plain_text"] ?? "";
          return (
            <TypographyCard
              badgeTone={SupportedNotionBlocks.includes(pageBlock.type) ? "positive": "critical"}
              badgeText={HumanFriendlyBlockName[pageBlock.type]}
              onClick={() => {}}
              ariaLabel="Hello world"
              onDragStart={(event: React.DragEvent<HTMLElement>) => handleDragStart(event, [text])}
            >
              <Text lineClamp={2}>
                {pageBlock[pageBlock.type]["rich_text"]?.[0]?.["plain_text"] ??
                  ""}
              </Text>
            </TypographyCard>
          );
        })}
      </Rows>
    </PageWrapper>
  );
};
