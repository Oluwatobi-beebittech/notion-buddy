import {
  AudioContextProvider,
  Badge,
  Box,
  AudioCard as CanvaAudioCard,
} from "@canva/app-ui-kit";
import * as React from "react";
import { getResourceMimeType } from "src/api";

import type { Tone } from "@canva/app-ui-kit/dist/cjs/ui/apps/developing/ui_kit/components/badge/badge";
import type { AudioCardProps } from "@canva/app-ui-kit/dist/cjs/ui/apps/developing/ui_kit/components/card/audio/audio";
import type { AudioMimeType } from "@canva/asset";

import styles from "./AudioCard.css";

type Props = Omit<AudioCardProps, "onClick" | "onDragStart"> & {
  badgeText: string;
  badgeTone: Tone;
  onClick: () => (mimeType: AudioMimeType) => void;
  onDragStart: (
    event: React.DragEvent<HTMLElement>
  ) => (mimeType: AudioMimeType) => void;
  badgeTooltipLabel?: string | undefined;
  loading?: boolean | undefined;
};
export const AudioCard: React.FC<Props> = ({
  ariaLabel,
  audioPreviewUrl,
  badgeText,
  badgeTone,
  badgeTooltipLabel,
  durationInSeconds,
  loading,
  onClick,
  onDragStart,
  thumbnailUrl,
  title,
}) => {
  const [mimeType, setMimeType] = React.useState<AudioMimeType>("audio/mp3");

  const getMimeType = async () => {
    const mime = await getResourceMimeType(audioPreviewUrl);
    setMimeType(mime as AudioMimeType);
  };

  React.useEffect(() => {
    getMimeType();
  }, []);

  return (
    <Box className={styles.audioCard}>
      <Box className={styles.actionRow}>
        <Badge
          tone={badgeTone}
          text={badgeText}
          tooltipLabel={badgeTooltipLabel}
        />
      </Box>
      <AudioContextProvider>
        <CanvaAudioCard
          title={title}

          durationInSeconds={durationInSeconds}
          audioPreviewUrl={audioPreviewUrl}
          loading={loading}
          ariaLabel={ariaLabel}
          thumbnailUrl={thumbnailUrl}
          onClick={() => {
            onClick()(mimeType);
          }}
          onDragStart={(event: React.DragEvent<HTMLElement>) => {
            onDragStart(event)(mimeType);
          }}
        />
      </AudioContextProvider>
    </Box>
  );
};
