import * as React from "react";
import {
  Badge,
  Box,
  ImageCard as CanvaImageCard,
} from "@canva/app-ui-kit";
import { Tone } from "@canva/app-ui-kit/dist/cjs/ui/apps/developing/ui_kit/components/badge/badge";
import styles from "./ImageCard.css";
import { ImageCardProps } from "@canva/app-ui-kit/dist/cjs/ui/apps/developing/ui_kit/components/card/image/image";

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
  console.log({imageCard: "Image card"});
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
        loading={loading}
        ariaLabel={ariaLabel}
        thumbnailUrl={thumbnailUrl}
        onClick={onClick}
        onDragStart={onDragStart}
      />
    </Box>
  );
};
