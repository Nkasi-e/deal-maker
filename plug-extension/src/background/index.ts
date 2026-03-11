import { buildDealInsights } from "./api/index";
import type { DetectedContext } from "../types/pricing";

chrome.runtime.onMessage.addListener(
  (
    message: { type: string; payload?: DetectedContext },
    _sender: chrome.runtime.MessageSender,
    sendResponse: (response: unknown) => void
  ) => {
    if (message.type === "PRICE_DETECTED" && message.payload) {
      buildDealInsights(message.payload)
        .then((insights) => {
          sendResponse({ type: "INSIGHTS_READY", payload: insights });
        })
        .catch((err) => {
          sendResponse({
            type: "INSIGHTS_ERROR",
            error: err instanceof Error ? err.message : "Unknown error"
          });
        });
      return true;
    }

    if (message.type === "REQUEST_REFRESH") {
      sendResponse({ type: "REFRESH_ACK" });
      return false;
    }

    return false;
  }
);
