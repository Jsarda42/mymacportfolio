import { AppConfig } from "@/types/system";
import Calculator from "@/components/apps/Calculator/Calculator";

export const calculatorApp: AppConfig = {
  id: "calculator-app",
  name: "Calculator",
  icon: "/icons/calculator.webp",
  category: "Utilities",
  isFeature: true,
  windowContent: Calculator,
  menu: {
    label: "Calculator",
    items: [
    ],
  },
};