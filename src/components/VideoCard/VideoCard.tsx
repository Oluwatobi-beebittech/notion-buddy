import { Badge, Box, VideoCard as CanvaVideoCard } from "@canva/app-ui-kit";
import * as React from "react";
import { getResourceMimeType } from "src/api";

import type { Tone } from "@canva/app-ui-kit/dist/cjs/ui/apps/developing/ui_kit/components/badge/badge";
import type { VideoCardProps } from "@canva/app-ui-kit/dist/cjs/ui/apps/developing/ui_kit/components/card/video/video";
import type { VideoMimeType } from "@canva/asset";

import styles from "./VideoCard.css";

type Props = Omit<VideoCardProps, "mimeType" | "onClick" | "onDragStart"> & {
  alt: string;
  badgeText: string;
  badgeTone: Tone;
  videoUrl: string;
  videoPreviewUrl: string;
  onClick: () => (mimeType: VideoMimeType) => void;
  onDragStart: (
    event: React.DragEvent<HTMLElement>
  ) => (mimeType: VideoMimeType) => void;
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
  onClick,
  onDragStart,
  thumbnailUrl,
  videoPreviewUrl,
  videoUrl
}) => {
  const [mimeType, setMimeType] = React.useState<VideoMimeType>("video/mp4");

  const getMimeType = async () => {
    const mime = await getResourceMimeType(videoUrl);
    setMimeType((mime ?? "video/mp4") as VideoMimeType);
  };

  React.useEffect(() => {
    getMimeType();
  }, []);
  
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
