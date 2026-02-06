import { AppConfig } from "@/types/system";
import { appStoreApp } from "./apps/appStore";
import { settingsApp } from "./apps/settings";
import { calculatorApp } from "./apps/calculator";
import { safariApp } from "./apps/safari";
import { spotifyApp } from "./apps/spotify";

export const ALL_APPS: AppConfig[] = [
  spotifyApp,
  appStoreApp,
  settingsApp,
  calculatorApp,
  safariApp,
];

export const getAppById = (id: string) => ALL_APPS.find(app => app.id === id);