import { Grid } from "@canva/app-ui-kit";
import * as React from "react";
import { useNotionBuddyStore } from "src/store";
import { defaultImagePlaceholder, searchProperty } from "src/utilities";

import type { State } from "src/store";

import { PageCard, PageCardSkeleton } from "../PageCard";

type Props = {
  pages: any[];
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
          <PageCardSkeleton key={window.crypto.randomUUID()}/>
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
          const displayIcon = isIconEmoji ? icon[iconType] : '';
        
          return (
            <PageCard
              icon={displayIcon}
              onClick={() => {
                onPageClick?.(id);
                setNotionDetails({ selectedPage: id });
              }}
              thumbnailUrl={cover?.external?.url ?? defaultImagePlaceholder}
              key={id}
              title={title?.[0]?.["plain_text"]}
            />
          );
        })}
    </Grid>
  );
};
