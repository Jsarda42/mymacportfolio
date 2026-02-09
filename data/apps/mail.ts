import MailView from "@/components/mail/MailView";
import { AppConfig } from "@/types/system";

export const MailApp: AppConfig = {
  id: "mail-app",
  name: "Mail",
  icon: "/icons/mail.png",
  category: "Communication",
  isPreInstalled: true,
  windowContent: MailView,
  menu: {
    label: "Mail",
    items: [
    ],
  },
};