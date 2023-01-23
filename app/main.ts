// this import should be first in order to load some required settings (like globals and reflect-metadata)
import {platformNativeScriptDynamic} from "nativescript-angular/platform";
import {enableProdMode} from '@angular/core';

require('nativescript-platform-css')
let sizeGroupings = require('nativescript-platform-css').sizeGroupings;
sizeGroupings([1280, 1024, 800, 600, 540, 480, 420, 410, 400, 380, 360, 320]);


import {AppModule} from "./app.module";

import * as app from "tns-core-modules/application";
import * as trace from 'tns-core-modules/trace';
import {TraceSentry} from 'nativescript-trace-sentry';
import * as Sentry from '@sentry/browser';
import {isIOS} from "@nativescript/core";


app.on(app.launchEvent, (args: app.ApplicationEventData) => {
  let sentryDsn = "https://303fdf08c0de41bb99b853f25fe1a43e@o692759.ingest.sentry.io/5774710";

  if (sentryDsn === "[YOUR SENTRY.IO DSN KEY]") {
    let msg = "You must provide your own Sentry.io DSN key in app.ts to initialize this demo. Visit Sentry.io to get a key.";
    throw new Error(msg);
  }
  if (isIOS) {
    sentryDsn = 'https://dccf98819f8548c09a7a26ad98c4ffbc@o692759.ingest.sentry.io/5774769'
  }

  trace.setCategories(trace.categories.concat(trace.categories.Error, trace.categories.Debug));
  // Uncomment the line below to remove `console` TraceWriter before adding new Sentry TraceWriter
  // NOTE: It's okay to keep console writer. Will just additional breadcrumbs in Sentry logs.
  // trace.clearWriters();
  trace.addWriter(new TraceSentry(sentryDsn, "debug"));
  trace.enable();
});

app.on(app.uncaughtErrorEvent, (args: app.ApplicationEventData) => {
  if (app.android) {
    console.log("** Android Error Detected **");
    // For Android applications, args.android is an NativeScriptError.
    Sentry.captureException(args.android);
  } else if (app.ios) {
    console.log("** iOS Error Detected **");
    // For iOS applications, args.ios is NativeScriptError.
    Sentry.captureException(args.ios);
  }
});


enableProdMode();
platformNativeScriptDynamic().bootstrapModule(AppModule);
