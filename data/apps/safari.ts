import Safari from "@/components/apps/Safari/Safari";
import { AppConfig } from "@/types/system";

export const safariApp: AppConfig = {
  id: "safari-app",
  name: "Safari",
  icon: "/icons/safari.svg",
  category: "Productivity",
  windowContent: Safari,
  isPreInstalled: true,
   menu: {
    label: "Safari",
    items: [
      
    ],
  },
};
