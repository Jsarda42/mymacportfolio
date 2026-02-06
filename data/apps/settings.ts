import { AppConfig } from "@/types/system";
import { SettingsView } from "@/components/apps/Settings/SettingsView";

export const settingsApp: AppConfig = {
  id: "settings",
  name: "Settings",
  icon: "/icons/settings.png",
  windowContent: SettingsView,
  category: "System",
  menu: {
    label: "Settings",
    items: [
    ],
  },
};