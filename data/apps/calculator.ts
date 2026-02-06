import { AppConfig } from "@/types/system";
import Calculator from "@/components/apps/Calculator";

export const calculatorApp: AppConfig = {
  id: "calculator-app",
  name: "Calculator",
  icon: "/icons/calculator.webp",
  windowContent: Calculator,
  menu: {
    label: "Calculator",
    items: [
    ],
  },
};