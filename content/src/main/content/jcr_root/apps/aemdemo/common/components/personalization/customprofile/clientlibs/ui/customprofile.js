if (MyApp && MyApp.CustomProfile) {
    CQ_Analytics.CCM.addListener("configloaded", function() {
        //add to std clickstream cloud ui
        CQ_Analytics.ClickstreamcloudUI.register(
            this.getSessionStore(),
            CQ_Analytics.CCM.getUIConfig(this.getName()));

    }, MyApp.CustomProfile);
}
