import Spotify from "@/components/apps/spotify/Spotify";
import { AppConfig } from "@/types/system";

export const spotifyApp: AppConfig = {
  id: "spotify",
  name: "Spotify",
  icon: "/icons/spotify.svg",
  windowContent: Spotify,
  menu: {
    label: "Spotify",
    items: [
    ],
  },
};