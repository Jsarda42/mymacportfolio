import PythonLearningApp from "@/components/apps/pythonEditor/PythonLearningApp";
import MailView from "@/components/mail/MailView";
import { AppConfig } from "@/types/system";

export const PythonEditorApp: AppConfig = {
  id: "PythonEditor-app",
  name: "Python Editor",
  icon: "/icons/python.png",
  category: "Editor Tool",
  isPreInstalled: true,
  windowContent: PythonLearningApp,
  menu: {
    label: "Editor",
    items: [
    ],
  },
};