import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

function init() {
  Sentry.init({
    dsn:
      "https://ed04d7f60a934e678f4530cf24edcc9e@o450527.ingest.sentry.io/5435059",
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 1.0,
  });
}

export default {
  init,
};
