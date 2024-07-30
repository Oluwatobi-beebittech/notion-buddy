import { Badge, Box, VideoCard as CanvaVideoCard } from "@canva/app-ui-kit";
import * as React from "react";
import { getResourceMimeType } from "src/api";

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
  videoUrl,
  videoPreviewUrl
}) => {
  const [videoMimeType, setVideoMimeType] = React.useState<any>(mimeType);
  const [isVideoLoading, setIsVideoLoading] = React.useState<
    boolean
  >(true);

  const getMimeType = async () => {
    const mimeType = await getResourceMimeType(videoUrl);
    setVideoMimeType(mimeType);
    setIsVideoLoading(false);
  };

  // React.useEffect(() => {
  //   getMimeType();
  // }, []);

  console.log({videoMimeType});
  
  return (
    <Box className={styles.videoCard}>
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
      <CanvaVideoCard
        borderRadius="standard"
        //bottomEnd={<Badge text={videoMimeType.split("/")[1]} tone="contrast" />}
        mimeType={videoMimeType}
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
