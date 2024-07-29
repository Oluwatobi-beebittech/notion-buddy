import { upload } from "@canva/asset";
import { addAudioTrack, ui } from "@canva/design";

export const handleAudioClick = async (audioUrl: string) => {
    const audioAsset = await upload({
      type: "AUDIO",
      title: "Example audio",
      mimeType: "audio/mp3",
      durationMs: 86047,
      url: audioUrl,
    });

    addAudioTrack({
      ref: audioAsset.ref,
    });
  }

  export const handleAudioDragStart = (event: React.DragEvent<HTMLElement>, audioUrl: string) => {
    ui.startDrag(event, {
      type: "AUDIO",
      title: "Example audio",
      durationMs: 86047,
      resolveAudioRef: () => {
        return upload({
          type: "AUDIO",
          title: "Example audio",
          mimeType: "audio/mp3",
          durationMs: 86047,
          url: audioUrl,
        });
      },
    });
  }