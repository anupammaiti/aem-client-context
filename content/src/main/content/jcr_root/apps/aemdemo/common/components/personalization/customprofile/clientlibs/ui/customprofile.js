if (MyApp && MyApp.CustomProfile) {
    // As soon as CMM has loaded the config "configloaded" event is fired.
    CQ_Analytics.CCM.addListener("configloaded", function() {
        //add to std clickstream cloud ui
        CQ_Analytics.ClickstreamcloudUI.register(
            this.getSessionStore(),
            // CCM gives the initial config of the store.
            CQ_Analytics.CCM.getUIConfig(this.getName()));
    }, MyApp.CustomProfile);
}
