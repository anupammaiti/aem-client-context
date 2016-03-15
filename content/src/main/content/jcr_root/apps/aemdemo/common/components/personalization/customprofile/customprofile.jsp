<%@include file="/libs/foundation/global.jsp"%>
<%@taglib prefix="personalization" uri="http://www.day.com/taglibs/cq/personalization/1.0" %>

<c:set var="store" value="customprofile" />
<c:set var="props" value="<%= properties.get("properties", new String[0]) %>" />

<div class="cq-cc-store">
    <div class="cq-cc-content">
        <c:forEach items="${props}" var="item" varStatus="loop">
            <div class="cq-cc-store-property cq-cc-store-property-level${loop.index}"><personalization:storePropertyTag propertyName="${item}" store="${store}" defaultValue=""/></div>
        </c:forEach>
    </div>
    <div class="cq-cc-clear"></div>
</div>
