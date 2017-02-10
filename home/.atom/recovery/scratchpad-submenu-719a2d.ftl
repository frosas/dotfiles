<#import "macro.ftl" as mac/>
<#assign uitk = JspTaglibs["/WEB-INF/uitk.tld"]>
<#assign isIdentifiedUser = "false" >
<#assign isSUAUser = "false" >
<#assign b = JspTaglibs["http://expedia.com/bundling"]>
<#assign siteid = activity["siteid"]>

<#include "/default/includes/ispos.ftl" />
<#-- <#assign userIsNudgeEnrolled = stcs["com.expedia.www.domain.services.travelgraph.config.TravelGraphConfiguration"].isAuthUsersNotificationToggleEnabled(defaultStripingContext)/>
<#if userIsNudgeEnrolled >
  <script>alert('Nudge on!');</script>
<#else>
  <script>alert('Nudge off!');</script>
</#if>
 -->
<#assign hasUserModel = model.getUserModel?? && model.getUserModel()?? />

<#global userName = "">
<#if hasUserModel && model.getUserModel().isSignedIn()>
    <#global userName><#if model.getUserModel().getUserName()??>${model.getUserModel().getUserName()?trim}</#if></#global>
<#-- Truncate user name -->
    <#if userName?length gt 20>
        <#global userName = userName?substring(0, 17) + "...">
    <#elseif userName == "">
        <#global userName><@loc.msg id="guest"/></#global>
    </#if>

    <#if model.getUserModel().isSingleUseAccount()>
        <#assign isGuestUser = true />
    </#if>
<#else>
    <#assign isGuestUser = true />
</#if>

<#if isGuestUser?? && isGuestUser>
    <#assign isResendItineraryEmailShow = stcs["com.expedia.www.shared.ui.header.config.HeaderConfiguration"].isResendItineraryEmailShow(defaultStripingContext) />
</#if>

<#if hasUserModel && model.getUserModel().isRegisteredAndIdentified()>
    <#assign isIdentifiedUser = "true" >
</#if>

<#if hasUserModel && model.getUserModel().isSingleUseAccount()>
    <#assign isSUAUser = "true" >
</#if>

<#assign ttBucket = abacus.evaluateExperimentAndLog(7793, Request) />
<#assign brandingBucket = abacus.evaluateExperimentAndLog(12372, Request) />

<#assign iconOn = (ttBucket = 4 || ttBucket = 5 || ttBucket = 6) />
<#assign ctaAsButton = (ttBucket = 7) />

<#if pageName?? && pageName=="page.Flight-Search-Roundtrip.Out">
  <#assign ab11903status = abacus.evaluateExperimentAndLog(11903, Request) />
 <#else> 
  <#assign ab11903status = 0 />
 </#if>

<#if (brandingBucket gt 0)>
    <#assign searchMessageLocalizationKey = "searchIsSaved_" + brandingBucket />
    <#assign hotelMessageLocalizationKey = "hotelIsSaved_" + brandingBucket />
    <#assign flightMessageLocalizationKey = "flightIsSaved_" + brandingBucket />
    <#assign searchMessageContent><@loc.msg id=searchMessageLocalizationKey/></#assign>
    <#assign hotelMessageContent><@loc.msg id=hotelMessageLocalizationKey/></#assign>
    <#assign flightMessageContent><@loc.msg id=flightMessageLocalizationKey/></#assign>
<#elseif (ttBucket = 3 || ttBucket = 6)>
    <#assign searchMessageContent><@loc.msg id="searchSavedShort"/></#assign>
    <#assign hotelMessageContent><@loc.msg id="hotelSavedShort"/></#assign>
    <#assign flightMessageContent><@loc.msg id="flightSavedShort"/></#assign>
<#else>
    <#assign searchMessageContent><@loc.msg id="searchIsSaved"/></#assign>
    <#assign hotelMessageContent><@loc.msg id="hotelIsSaved"/></#assign>
    <#assign flightMessageContent><@loc.msg id="flightIsSaved"/></#assign>
</#if>

<#assign ttContent>
<div class="hotel-saved-default"><span><@loc.msg id="hotelIsSaved"/></span></div>
<div class="search-saved-default"><span><@loc.msg id="searchIsSaved"/></span></div>
<div class="flight-saved-default"><span><@loc.msg id="flightIsSaved"/></span></div>
<div class="hotel-saved-cta"><span>${hotelMessageContent}</span></div>
<div class="search-saved-cta"><span>${searchMessageContent}</span></div>
<div class="flight-saved-cta"><span>${flightMessageContent}</span></div>
</#assign>

<#if ttBucket = 7 >
    <#assign ttColor = 'blue' />
<#else>
    <#assign ttColor = 'yellow' />
</#if>


<#assign ab7661status = abacus.evaluateExperimentAndLog(7661, Request) />
<#assign ab4077status = abacus.evaluateExperimentAndLog(4077, Request) />
<#assign ab4939status = abacus.evaluateExperimentAndLog(4939, Request) />
<#assign ab6051status = abacus.evaluateExperimentAndLog(6051, Request) />

<#assign ab5538status = abacus.evaluateExperimentAndLog(5538, Request) />
<#assign ab6007status = abacus.evaluateExperimentAndLog(6007, Request) />
<#assign ab6008status = abacus.evaluateExperimentAndLog(6008, Request) />
<#assign ab9878status = abacus.evaluateExperimentAndLog(9878, Request) />

<#assign ab12372status = abacus.evaluateExperimentAndLog(12372, Request) />

<#assign blockFSRTooltip = ((ab5538status == 2) || (ab6007status == 2) || (ab6008status == 2)) />

<#assign isHotelSearchAvgTotal = stcs["com.expedia.www.domain.services.travelgraph.config.TravelGraphConfiguration"].isHotelSearchAvgTotal(defaultStripingContext)/>
<#assign avgLocString =""/>

<#if isHotelSearchAvgTotal>
    <#assign avgLocString><@loc.msg id="hotelSearchAvgTotalRate"/></#assign>
<#else>
    <#assign avgLocString><@loc.msg id="hotelSearchAvgPerNight"/></#assign>
</#if>
<#assign activityTimeAltText><@loc.msg id="Duration"/></#assign>

<#-- These globals are temporary for LOC placeholders -->
<#global custEmailPlaceHolder>fakemail@noitsbad.com</#global>
<#global totalUserHistoryForLoc>15</#global>
<#global locPricePlaceholder>15.00</#global>
<#global singularPronoun>other</#global>
<#global pluralPronoun>others</#global>
<#global integerForLoc>3</#global>
<#global dateForLoc>1/2/03</#global>
<#global packageItemForLoc>Something that could be in a package</#global>
<script>
  window.scratchpadNudgeAllowed = ${isUS?string};
  window.scratchpadBadgeFlareTLFlag = ${ab4077status?c};
  window.scratchpad2ColTrayTestBucket = ${ab4939status?c};
  window.scratchpadUseLiveAlertsAsNews = ${ab6051status?c};
  window.showActivityItemsInTray = ${ab9878status?c};
  window.scratchpadBlockFSRTooltip = (${blockFSRTooltip?string} === "true");
  window.accessibleTrayBadgeOne = "<@loc.msg id = 'spTrayBadgeOne'/>";
  window.accessibleTrayBadgePlural = "<@loc.msg id = 'spTrayBadgePlural' comment='#### represents an integer'/>";
  window.disableTrayTest = ${ab11903status?c};
  window.scratchpadBrandingTest = ${ab12372status?c};
  window.scratchpadLocStrings = {
    scratchpadName: '<@loc.msg id="scratchpadpagename"/>',
    seePrice: '<@loc.msg id="seePrice"/>',
    asOfDate: '<@loc.msg id="whenseenprefix" comment="#### represents a date"/>',
    asOfTime: '<@loc.msg id="whenseentimeprefix" comment="#### represents a time"/>',
    from: '<@loc.msg id="pricefrom" comment="#### represents a price"/>',
    oneWay: '<@loc.msg id="oneway"/>',
    roundTrip: '<@loc.msg id="roundtrip"/>',
    fromTo: '<@loc.msg id="fromto" comment="#### represents an airport code"/>',
    others: '<@loc.msg id="pluralotherpeople" comment="#### represents an integer"/>',
    other: '<@loc.msg id="singularotherpeople"/>',
    plus: '<@loc.msg id="thing1PlusThing2" comment="#### represents a single item in a package, plus sign to be displayed"/>',
    included: '<@loc.msg id="thing1AndThing2" comment="#### represents a single item in a package"/>',
    notesConfirmation: '<@loc.msg id="emailconfirmationstring"/>',
    defaultHeaderMessage: '<@loc.msg id="saveconfirmationstring"/>',
    getUpdates: '<@loc.msg id="emailaskstring"/>',
    thingsSavedHere: '<@loc.msg id="shortsaveinfostring"/>',
    viewScratchpad: '<@loc.msg id="viewscratchpad"/>',
    viewAllItems: '<@loc.msg id="viewallitems" comment="#### represents an integer"/>',
    searchIsSaved: '<@loc.msg id="savesuccessstring"/>',
    sendNotesTo: '<@loc.msg id="sendNotesTo" comment="#### represents an email"/>',
    pageGetUpdates: '<@loc.msg id="pageupdatesoffer"/>',
    notAvailable: '<@loc.msg id="notavailable"/>',
    findOutWhy: '<@loc.msg id="findoutwhy"/>',
    room: '<@loc.msg id="oneRoomLeft"/>',
    roomShort: '<@loc.msg id="oneRoomLeftShort"/>',
    rooms: '<@loc.msg id="pluralRoomsLeft" comment="#### represents an integer"/>',
    roomsShort: '<@loc.msg id="pluralRoomsLeftShort" comment="#### represents an integer"/>',
    packages: '<@loc.msg id="flightPackageComponent" comment="#### represents a destination"/>',
    flight: '<@loc.msg id="flightPackageItem"/>',
    hotel: '<@loc.msg id="hotelPackageItem"/>',
    car: '<@loc.msg id="carPackageItem"/>' ,
    othersSearching: '<@loc.msg id="otherSearchingNow" comment="#### represents an integer"/>' ,
    hotels: '<@loc.msg id="hotels"/>' ,
    fromToHyphen: '<@loc.msg id="fromToHyphen" comment="#### represents date strings"/>',
    hotelSearchAvgPerNight:  '${avgLocString}',
    personBooked: '<@loc.msg id="personBookedHotel"/>',
    peopleBooked: '<@loc.msg id="peopleBookedHotel" comment="#### represents an integer"/>',
    perPerson: '<@loc.msg id="perPerson"/>',
    detachedBanner: '<@loc.msg id="detachedBanner" />',
    friendlyOptInConfirmationOn: '<@loc.msg id="toolTipOnJS" />',
    friendlyOptInConfirmationOff: '<@loc.msg id="toolTipOff" />',
    airlineLogoAltText: '<@loc.msg id="airlineLogoAltText"/>',
    multipleAirlinesLogoAltText: '<@loc.msg id="multipleAirlinesLogoAltText"/>',
    charRemaining: '<@loc.msg id="charRemaining" />',
    charsRemaining: '<@loc.msg id="charsRemaining" />',
    priceUpDot: '<@loc.msg id="priceUp" />',
    priceDownDot: '<@loc.msg id="priceDown" />',
    peopleBookedDot: '<@loc.msg id="peopleBooked" />',
    personBookedDot: '<@loc.msg id="personBooked" />',
    daily: '<@loc.msg id="daily" />',
    carsAt: "<@loc.msg id="carsAt" />",
    carsNear: "<@loc.msg id="carsNear" />",
    personBookedMinified: '<@loc.msg id="personBookedMinified" />',
    peopleBookedMinified: '<@loc.msg id="peopleBookedMinified" />',
    peopleBookedDated: '<@loc.msg id="peopleBookedDated" />',
    personBookedDated: '<@loc.msg id="personBookedDated" />',
    allDestinations : '<@loc.msg id="allDestinations" />',
    allMonths : '<@loc.msg id="allMonths" />',
    avgPerNight: '<@loc.msg id="avgPerNight" />',
    timeRange: '<@loc.msg id="timeRange" />',
    perPerson: '<@loc.msg id="priceIsPerPerson" />',
    perTraveler: '<@loc.msg id="perTraveler" />',
    duration: '<@loc.msg id="Duration" />',
    perPersonHBS: '<@loc.msg id="perPersonHBS" />',
    viewScratchpad_1: '<@loc.msg id="viewscratchpadlink_1"/>',
    viewScratchpad_2: '<@loc.msg id="viewscratchpadlink_2"/>',
    viewScratchpad_3: '<@loc.msg id="viewscratchpadlink_3"/>'
  };
</script>
<script>
  if (!window.define || !window.require) {
    window.define = function(){ return false }
    window.require = function(){ return false }
  }
</script>
<@b.attributes bundleName="scratchpad-tray-templates" groupName="scratchpad-header" />
<@b.bundle bundleName='scratchpad-tray-templates' groupName='scratchpad-header' type='script'/>

<li class="user-history-tab scratchpad udpTT" data-control="tooltip" data-trigger="" data-content='${ttContent}' data-arrow="true" data-fade="out" data-width="250" data-js-theme="urgency" data-tt-color="${ttColor}">
    <a id="header-history" data-tid="header-history" target="_top" href="<@mac.formatUrl url='/scratchpad'/>" class="nav-tab" rel="nofollow" data-onclick="xp.nav.trackAnalytics(this,'a','Header.SP.Tray.Interaction')" data-identifieduser="${isIdentifiedUser}" data-guestuser="${isSUAUser}" role="button">
        <#if hasUserModel && model.getUserModel().isArranger()>
          <#if ab12372status gt 0>
            <#assign arrangeeLocValue = "arrangeeScratchpad_" + ab12372status />
            <@loc.msg id=arrangeeLocValue/>
          <#else>
            <@loc.msg id="arrangeeScratchpad"/>
          </#if>
        <#else>
          <#if ab12372status gt 0>
            <#assign historyNameLocValue = "historyNamePosessive_" + ab12372status />
            <@loc.msg id=historyNameLocValue/>
          <#else>
            <@loc.msg id="historyNamePosessive"/>
        </#if>
        </#if>
        <span class="scratchpad-flare"></span>
        <span id="scratchpad-badge" class="badge badge-urgent badge-secondary badge-notification visuallyhidden" aria-hidden="true"></span>
        <span id="accessibleTrayBadge" class="visuallyhidden"></span>
    </a>
    <div class="scratchpad-arrow">&nbsp;</div>
    <div class="menu double-wide">
        <div class="scratchpad-menu-wrapper">
            <div class="menu-header">
                <#if ab12372status gt 0>
                    <#assign loadingScratchpadLocValue = "loadingScratchpad_" + ab12372status />
                    <p class="greeting-message loading-message"><@loc.msg id=loadingScratchpadLocValue/></p>
                <#else>
                    <p class="greeting-message loading-message"><@loc.msg id="loadingScratchpad"/></p>
                </#if>
                <p class="greeting-message default-message" style="display:none;" ><@loc.msg id="scratchpadStandardGreeting"/></p>
            </div>

            <div class="loading-wrapper" aria-hidden="true">
                <@uitk.loader classes="loading" />
            </div>
            <ul class='item-list' style="display:none;" ></ul>

            <div class="scratchpad-item last-tray-item">
                <#if ab12372status gt 0>
                    <#assign viewScratchpadLinkLocValue = "viewscratchpadlink_" + ab12372status />
                    <a href="/scratchpad?rfrr=SP.Tray.SP" class="view-all-history item-link"><@loc.msg id=viewScratchpadLinkLocValue/></a>
                <#else>
                <a href="/scratchpad?rfrr=SP.Tray.SP" class="view-all-history item-link"><@loc.msg id="viewscratchpadlink"/></a>
                </#if>
              </div>
        </div>
    </div>
</li>
