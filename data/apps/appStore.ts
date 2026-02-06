import { AppConfig } from "@/types/system";
import AppStoreView  from "@/components/apps/AppStore/AppStoreView";

export const appStoreApp: AppConfig = {
  id: "app-store",
  name: "App Store",
  icon: "/icons/appStore.png",
  windowContent: AppStoreView,
  menu: {
    label: "App Store",
    items: [
    ],
  },
};