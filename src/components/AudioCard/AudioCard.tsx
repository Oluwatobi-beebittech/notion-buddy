import * as React from "react";
import {
  AudioContextProvider,
  Badge,
  Box,
  AudioCard as CanvaAudioCard,
} from "@canva/app-ui-kit";
import { Tone } from "@canva/app-ui-kit/dist/cjs/ui/apps/developing/ui_kit/components/badge/badge";
import styles from "./AudioCard.css";
import { getResourceMimeType } from "src/api";
import { AudioCardProps } from "@canva/app-ui-kit/dist/cjs/ui/apps/developing/ui_kit/components/card/audio/audio";

type Props = AudioCardProps & {
  badgeText: string;
  badgeTone: Tone;
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
  const [audioMimeType, setAudioMimeType] = React.useState<any>('audio/wav');
  const [isAudioLoading, setIsAudioLoading] = React.useState<
    boolean
  >(true);

  const getMimeType = async () => {
    const mimeType = await getResourceMimeType(audioPreviewUrl);
    setAudioMimeType(mimeType);
    setIsAudioLoading(false);
  };

  // React.useEffect(() => {
  //   getMimeType();
  // }, []);

  console.log({audioM: audioMimeType});

  return (
    <Box className={styles.audioCard}>
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
      <AudioContextProvider>
        <CanvaAudioCard
        // bottomEnd={<Badge text={audioMimeType.split("/")[1]} tone="contrast" />}
          title={title}
          durationInSeconds={durationInSeconds}
          audioPreviewUrl={audioPreviewUrl}
          loading={loading}
          ariaLabel={ariaLabel}
          thumbnailUrl={thumbnailUrl}
          onClick={onClick}
          onDragStart={onDragStart}
        />
      </AudioContextProvider>
    </Box>
  );
};
