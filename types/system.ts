import { ComponentType } from "react";

export interface AppConfig {
  id: string;
  name: string;
  icon: string;
  windowContent: ComponentType<any>;
  isInstallable?: boolean;
  isPreInstalled?: boolean;
  description?: string;
  screenshots?: string[];
  menu: {
    label: string;
    items: MenuItem[];
  };
}

export interface MenuItem {
  id: string;
  label: string;
  type: "item" | "separator";
}