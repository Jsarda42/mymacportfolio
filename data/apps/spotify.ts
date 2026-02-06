import Spotify from "@/components/apps/spotify/Spotify";
import { AppConfig } from "@/types/system";

export const spotifyApp: AppConfig = {
  id: "spotify",
  name: "Spotify",
  icon: "/icons/spotify.svg",
  windowContent: Spotify,
  category: "Entertainment",
  menu: {
    label: "Spotify",
    items: [
    ],
  },
};