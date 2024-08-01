import {
  Badge,
  Box,
  ImageCard as CanvaImageCard,
} from "@canva/app-ui-kit";
import * as React from "react";

import type { Tone } from "@canva/app-ui-kit/dist/cjs/ui/apps/developing/ui_kit/components/badge/badge";
import type { ImageCardProps } from "@canva/app-ui-kit/dist/cjs/ui/apps/developing/ui_kit/components/card/image/image";

import styles from "./ImageCard.css";

type Props = ImageCardProps & {
  badgeText: string;
  badgeTone: Tone;
  badgeTooltipLabel?: string | undefined;
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
  thumbnailUrl
}) => {
  
  return (
    <Box className={styles.imageCard}>
      <Box className={styles.actionRow}>
        <Badge
          tone={badgeTone}
          text={badgeText}
          tooltipLabel={badgeTooltipLabel}
        />
        <Box className={styles.groupButton}>
          {/* <Button
            icon={GridIcon}
            onClick={() => {}}
            variant="tertiary"
            tooltipLabel="Group items"
            disabled={loading}
          /> */}
        </Box>
      </Box>
      <CanvaImageCard
      borderRadius="standard"
        loading={loading}
        ariaLabel={ariaLabel}
        thumbnailUrl={thumbnailUrl}
        thumbnailHeight={150}
        onClick={onClick}
        onDragStart={onDragStart}
      />
    </Box>
  );
};
