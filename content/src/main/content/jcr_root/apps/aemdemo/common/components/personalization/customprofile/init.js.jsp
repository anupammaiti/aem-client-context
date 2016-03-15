<%@page session="false"%>
<%@ page contentType="text/javascript" %>
<%@ include file="/libs/foundation/global.jsp" %>

if (MyApp && MyApp.CustomProfile) {
    // MyApp.CustomProfile is initialized when CQ_Analytics.CCM.register(this) is done in customprofile.js.  So, this has the
    // effect of initializing it a second time which we don't need (or want) to do.
    //
    // We are leaving this here in case somebody looks at how the oob profiledata store works and decides to 'fix'
    // this to work in the same broken way that it does.
    //
    // MyApp.CustomProfile.init();
}
