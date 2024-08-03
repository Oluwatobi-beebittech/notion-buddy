import { Badge, Box, ImageCard as CanvaImageCard } from "@canva/app-ui-kit";
import * as React from "react";
import { getResourceMimeType } from "src/api";


import type { Tone } from "@canva/app-ui-kit/dist/cjs/ui/apps/developing/ui_kit/components/badge/badge";
import type { ImageCardProps } from "@canva/app-ui-kit/dist/cjs/ui/apps/developing/ui_kit/components/card/image/image";
import type { ImageMimeType } from "@canva/asset";

import styles from "./ImageCard.css";

type Props = Omit<ImageCardProps, "onClick" | "onDragStart"> & {
  badgeText: string;
  badgeTone: Tone;
  badgeTooltipLabel?: string | undefined;
  onClick: () => (mimeType: ImageMimeType) => void;
  onDragStart: (
    event: React.DragEvent<HTMLElement>
  ) => (mimeType: ImageMimeType) => void;
  loading?: boolean | undefined;
};
export const ImageCard: React.FC<Props> = ({
  ariaLabel,
  badgeText,
  badgeTone,
  badgeTooltipLabel,
  loading,
  onClick,
  onDragStart,
  thumbnailUrl,
}) => {
  const [mimeType, setMimeType] = React.useState<ImageMimeType>("image/jpeg");

  const getMimeType = async () => {
    const mime = await getResourceMimeType(thumbnailUrl);
    setMimeType(mime as ImageMimeType);
  };

  React.useEffect(() => {
    getMimeType();
  }, []);
  
  return (
    <Box className={styles.imageCard}>
      <Box className={styles.actionRow}>
        <Badge
          tone={badgeTone}
          text={badgeText}
          tooltipLabel={badgeTooltipLabel}
        />
      </Box>
      <CanvaImageCard
        borderRadius="standard"
        loading={loading}
        ariaLabel={ariaLabel}
        thumbnailUrl={thumbnailUrl}
        thumbnailHeight={150}
        onClick={() => {
          onClick()(mimeType);
        }}
        onDragStart={(event: React.DragEvent<HTMLElement>) => {
          onDragStart(event)(mimeType);
        }}
      />
    </Box>
  );
};
