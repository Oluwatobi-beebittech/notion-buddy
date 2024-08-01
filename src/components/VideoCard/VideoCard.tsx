import { Badge, Box, VideoCard as CanvaVideoCard } from "@canva/app-ui-kit";
import * as React from "react";

import type { Tone } from "@canva/app-ui-kit/dist/cjs/ui/apps/developing/ui_kit/components/badge/badge";
import type { VideoCardProps } from "@canva/app-ui-kit/dist/cjs/ui/apps/developing/ui_kit/components/card/video/video";

import styles from "./VideoCard.css";

type Props = VideoCardProps & {
  alt: string;
  badgeText: string;
  badgeTone: Tone;
  videoUrl: string;
  videoPreviewUrl: string;
  badgeTooltipLabel?: string | undefined;
  loading?: boolean | undefined;
};
export const VideoCard: React.FC<Props> = ({
  alt,
  ariaLabel,
  badgeText,
  badgeTone,
  badgeTooltipLabel,
  loading,
  mimeType,
  onClick,
  onDragStart,
  thumbnailUrl,
  videoPreviewUrl
}) => {
  
  return (
    <Box className={styles.videoCard}>
      <Box className={styles.actionRow}>
        <Badge
          tone={badgeTone}
          text={badgeText}
          tooltipLabel={badgeTooltipLabel}
        />
      </Box>
      <CanvaVideoCard
        borderRadius="standard"
        mimeType={mimeType as any}
        videoPreviewUrl={videoPreviewUrl}
        durationInSeconds={8}
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
