import { AppConfig } from "@/types/system";
import AppStoreView  from "@/components/apps/AppStore/AppStoreView";
import { APP_STORE_ITEMS } from "../menu/appStore";

export const appStoreApp: AppConfig = {
  id: "app-store",
  name: "App Store",
  icon: "/icons/appStore.png",
  category: "System",
  windowContent: AppStoreView,
  itemsMenu: APP_STORE_ITEMS,
  menu: {
    label: "App Store",
    items: [
      
    ],
  },
};