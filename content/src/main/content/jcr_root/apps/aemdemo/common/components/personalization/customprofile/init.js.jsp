<%@page session="false"%>
<%@ page contentType="text/javascript" %>
<%@ include file="/libs/foundation/global.jsp" %>

if (MyApp && MyApp.CustomProfile) {
    // MyApp.CustomProfile is initialized when CQ_Analytics.CCM.register(this) is done in customprofile.js.
    // So, this has the effect of initializing it a second time which we don't need (or want) to do.
    // That is the reason below code is no re-initializing and commented there to show the fix.
    //
    // MyApp.CustomProfile.init();
}
