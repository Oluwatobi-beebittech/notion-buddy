import { upload } from "@canva/asset";
import { addAudioTrack, ui } from "@canva/design";

import type { AudioMimeType} from "@canva/asset";

export const handleAudioClick = async (audioUrl: string, mimeType: AudioMimeType) => {
  if(mimeType.toString() === "") return;
  
    const audioAsset = await upload({
      type: "AUDIO",
      title: "Superbuddy uploaded audio",
      mimeType,
      durationMs: 86047,
      url: audioUrl,
    });

    addAudioTrack({
      ref: audioAsset.ref,
    });
  }

  export const handleAudioDragStart = (event: React.DragEvent<HTMLElement>, audioUrl: string, mimeType: AudioMimeType) => {
    if(mimeType.toString() === "") return;

    ui.startDrag(event, {
      type: "AUDIO",
      title: "Superbuddy uploaded audio",
      durationMs: 86047,
      resolveAudioRef: () => {
        return upload({
          type: "AUDIO",
          title: "Superbuddy uploaded audio",
          mimeType,
          durationMs: 86047,
          url: audioUrl,
        });
      },
    });
  }