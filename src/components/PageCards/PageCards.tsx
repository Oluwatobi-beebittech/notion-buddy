import * as React from "react";
import { PageCard, PageCardSkeleton } from "../PageCard";
import { Grid } from "@canva/app-ui-kit";
import { searchProperty } from "src/utilities";
import { useNotionBuddyStore, State } from "src/store";

type Props = {
  pages: Array<any>;
  totalPages: number;
  onPageClick?: ((pageId: string) => void) | undefined;
};
export const PageCards: React.FC<Props> = ({
  onPageClick,
  totalPages,
  pages,
}): JSX.Element => {
  const { notionDetails } = useNotionBuddyStore<State>((state) => state);
  const { setNotionDetails } = notionDetails;
  
  if (totalPages === 0) {
    return (
      <Grid alignX="stretch" alignY="stretch" columns={2} spacing="1u">
        {Array.from({ length: 8 }).map(() => (
          <PageCardSkeleton />
        ))}
      </Grid>
    );
  }

  return (
    <Grid alignX="stretch" alignY="stretch" columns={2} spacing="1u">
      {totalPages > 0 &&
        pages.map((page) => {
          const { cover, icon, id } = page;
          const { title } = searchProperty(page, "type", "title");
          const iconType = icon?.type;
          const isIconEmoji = iconType?.toLowerCase() === "emoji";
          const iconImageUrl = icon?.[icon?.type]?.["url"];
          const isIconImage = Boolean(iconImageUrl);
          console.log({ page });

          let displayIcon: string | React.ReactNode = "";
          if (isIconEmoji) displayIcon = icon[iconType];
          if (isIconImage)
            displayIcon = (
              <img src={icon[iconType]["url"]} width={20} height={20} />
            );

          return (
            <PageCard
              icon={displayIcon}
              onClick={() => {
                onPageClick?.(id);
                setNotionDetails({ selectedPage: id });
              }}
              thumbnailUrl={cover?.external?.url}
              key={id}
              title={title?.[0]?.["plain_text"]}
            />
          );
        })}
    </Grid>
  );
};
