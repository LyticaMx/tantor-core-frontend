/* eslint-disable @typescript-eslint/no-explicit-any */ // <- Encontrar tipos correctos
import { MessageDescriptor, useIntl } from "react-intl";
import {
  actionsMessages,
  apiMessages,
  formMessages,
  generalMessages,
  sidebarMessages,
} from "@/messages";

type useIntlResponse = (key: string, options?: any) => string;

export const useFormatMessage = (
  messages?: Record<string, MessageDescriptor>
): useIntlResponse => {
  const { formatMessage } = useIntl();

  return (key: string, options?: any): string => {
    if (messages && key in messages) {
      return formatMessage(messages[key], options);
    } else if (key in actionsMessages) {
      return formatMessage(actionsMessages[key], options);
    } else if (key in apiMessages) {
      return formatMessage(apiMessages[key], options);
    } else if (key in formMessages) {
      return formatMessage(formMessages[key], options);
    } else if (key in sidebarMessages) {
      return formatMessage(sidebarMessages[key], options);
    } else if (key in generalMessages) {
      return formatMessage(generalMessages[key], options);
    }
    return "";
  };
};
