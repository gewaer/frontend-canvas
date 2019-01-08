<template>
    <div id="app" :class="{ 'full-height' : !$route.meta.requiresAuth }">
        <notifications/>
        <unsaved-changes-modal />
        <after-signup-wizard />
        <basic-modal/>
        <app-sidebar
            v-if="$route.meta.requiresAuth"
            :show-sidebar="showSidebar"
            @handleSidebar="handleSidebar"
        />
        <div class="page-container">
            <app-header
                v-if="$route.meta.requiresAuth"
                :show-sidebar="showSidebar"
                @handleSidebar="handleSidebar"
            />
            <div class="page-content-wrapper animated">
                <div class="content sm-gutter">
                    <free-trial-bar v-if="$route.meta.requiresAuth"/>
                    <router-view class="container-fluid container-fixed-lg" transition="fade" transition-mode="out-in"/>
                </div>
            </div>
        </div>

        <!-- START: All of this code will eventually be removed. -->
        <!--START QUICKVIEW -->
        <div id="quickview" class="quickview-wrapper" data-pages="quickview">
            <!-- Nav tabs -->
            <ul class="nav nav-tabs" role="tablist">
                <li class="">
                    <a
                        href="#quickview-notes"
                        data-target="#quickview-notes"
                        data-toggle="tab"
                        role="tab">Notes</a>
                </li>
                <li>
                    <a
                        href="#quickview-alerts"
                        data-target="#quickview-alerts"
                        data-toggle="tab"
                        role="tab">Alerts</a>
                </li>
                <li class="">
                    <a
                        class="active"
                        href="#quickview-chat"
                        data-toggle="tab"
                        role="tab">Chat</a>
                </li>
            </ul>
            <a class="btn-link quickview-toggle" data-toggle-element="#quickview" data-toggle="quickview"><i class="pg-close"/></a>
            <!-- Tab panes -->
            <div class="tab-content">
                <!-- BEGIN Notes !-->
                <div id="quickview-notes" class="tab-pane no-padding">
                    <div id="note-views" class="view-port clearfix quickview-notes">
                        <!-- BEGIN Note List !-->
                        <div id="quick-note-list" class="view list">
                            <div class="toolbar clearfix">
                                <ul class="pull-right ">
                                    <li>
                                        <a href="#" class="delete-note-link"><i class="fa fa-trash-o"/></a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            class="new-note-link"
                                            data-navigate="view"
                                            data-view-port="#note-views"
                                            data-view-animation="push"><i class="fa fa-plus"/></a>
                                    </li>
                                </ul>
                                <button class="btn-remove-notes btn btn-xs btn-block hide"><i class="fa fa-times"/> Delete</button>
                            </div>
                            <ul>
                                <!-- BEGIN Note Item !-->
                                <li data-noteid="1">
                                    <div class="left">
                                        <!-- BEGIN Note Action !-->
                                        <div class="checkbox check-warning no-margin">
                                            <input id="qncheckbox1" type="checkbox" value="1">
                                            <label for="qncheckbox1"/>
                                        </div>
                                        <!-- END Note Action !-->
                                        <!-- BEGIN Note Preview Text !-->
                                        <p class="note-preview">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
                                        <!-- BEGIN Note Preview Text !-->
                                    </div>
                                    <!-- BEGIN Note Details !-->
                                    <div class="right pull-right">
                                        <!-- BEGIN Note Date !-->
                                        <span class="date">12/12/14</span>
                                        <a
                                            href="#"
                                            data-navigate="view"
                                            data-view-port="#note-views"
                                            data-view-animation="push"><i class="fa fa-chevron-right"/></a>
                                            <!-- END Note Date !-->
                                    </div>
                                    <!-- END Note Details !-->
                                </li>
                                <!-- END Note List !-->
                                <!-- BEGIN Note Item !-->
                                <li data-noteid="2">
                                    <div class="left">
                                        <!-- BEGIN Note Action !-->
                                        <div class="checkbox check-warning no-margin">
                                            <input id="qncheckbox2" type="checkbox" value="1">
                                            <label for="qncheckbox2"/>
                                        </div>
                                        <!-- END Note Action !-->
                                        <!-- BEGIN Note Preview Text !-->
                                        <p class="note-preview">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
                                        <!-- BEGIN Note Preview Text !-->
                                    </div>
                                    <!-- BEGIN Note Details !-->
                                    <div class="right pull-right">
                                        <!-- BEGIN Note Date !-->
                                        <span class="date">12/12/14</span>
                                        <a href="#"><i class="fa fa-chevron-right"/></a>
                                        <!-- END Note Date !-->
                                    </div>
                                    <!-- END Note Details !-->
                                </li>
                                <!-- END Note List !-->
                                <!-- BEGIN Note Item !-->
                                <li data-noteid="2">
                                    <div class="left">
                                        <!-- BEGIN Note Action !-->
                                        <div class="checkbox check-warning no-margin">
                                            <input id="qncheckbox3" type="checkbox" value="1">
                                            <label for="qncheckbox3"/>
                                        </div>
                                        <!-- END Note Action !-->
                                        <!-- BEGIN Note Preview Text !-->
                                        <p class="note-preview">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
                                        <!-- BEGIN Note Preview Text !-->
                                    </div>
                                    <!-- BEGIN Note Details !-->
                                    <div class="right pull-right">
                                        <!-- BEGIN Note Date !-->
                                        <span class="date">12/12/14</span>
                                        <a href="#"><i class="fa fa-chevron-right"/></a>
                                        <!-- END Note Date !-->
                                    </div>
                                    <!-- END Note Details !-->
                                </li>
                                <!-- END Note List !-->
                                <!-- BEGIN Note Item !-->
                                <li data-noteid="3">
                                    <div class="left">
                                        <!-- BEGIN Note Action !-->
                                        <div class="checkbox check-warning no-margin">
                                            <input id="qncheckbox4" type="checkbox" value="1">
                                            <label for="qncheckbox4"/>
                                        </div>
                                        <!-- END Note Action !-->
                                        <!-- BEGIN Note Preview Text !-->
                                        <p class="note-preview">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
                                        <!-- BEGIN Note Preview Text !-->
                                    </div>
                                    <!-- BEGIN Note Details !-->
                                    <div class="right pull-right">
                                        <!-- BEGIN Note Date !-->
                                        <span class="date">12/12/14</span>
                                        <a href="#"><i class="fa fa-chevron-right"/></a>
                                        <!-- END Note Date !-->
                                    </div>
                                    <!-- END Note Details !-->
                                </li>
                                <!-- END Note List !-->
                                <!-- BEGIN Note Item !-->
                                <li data-noteid="4">
                                    <div class="left">
                                        <!-- BEGIN Note Action !-->
                                        <div class="checkbox check-warning no-margin">
                                            <input id="qncheckbox5" type="checkbox" value="1">
                                            <label for="qncheckbox5"/>
                                        </div>
                                        <!-- END Note Action !-->
                                        <!-- BEGIN Note Preview Text !-->
                                        <p class="note-preview">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
                                        <!-- BEGIN Note Preview Text !-->
                                    </div>
                                    <!-- BEGIN Note Details !-->
                                    <div class="right pull-right">
                                        <!-- BEGIN Note Date !-->
                                        <span class="date">12/12/14</span>
                                        <a href="#"><i class="fa fa-chevron-right"/></a>
                                        <!-- END Note Date !-->
                                    </div>
                                    <!-- END Note Details !-->
                                </li>
                                <!-- END Note List !-->
                            </ul>
                        </div>
                        <!-- END Note List !-->
                        <div id="quick-note" class="view note">
                            <div>
                                <ul class="toolbar">
                                    <li><a href="#" class="close-note-link"><i class="pg-arrow_left"/></a>
                                    </li>
                                    <li><a href="#" data-action="Bold" class="fs-12"><i class="fa fa-bold"/></a>
                                    </li>
                                    <li><a href="#" data-action="Italic" class="fs-12"><i class="fa fa-italic"/></a>
                                    </li>
                                    <li><a href="#" class="fs-12"><i class="fa fa-link"/></a>
                                    </li>
                                </ul>
                                <div class="body">
                                    <div>
                                        <div class="top">
                                            <span>21st april 2014 2:13am</span>
                                        </div>
                                        <div class="content">
                                            <div class="quick-note-editor full-width full-height js-input" contenteditable="true"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- END Notes !-->
                <!-- BEGIN Alerts !-->
                <div id="quickview-alerts" class="tab-pane no-padding">
                    <div id="alerts" class="view-port clearfix">
                        <!-- BEGIN Alerts View !-->
                        <div class="view bg-white">
                            <!-- BEGIN View Header !-->
                            <div class="navbar navbar-default navbar-sm">
                                <div class="navbar-inner">
                                    <!-- BEGIN Header Controler !-->
                                    <a
                                        href="javascript:;"
                                        class="inline action p-l-10 link text-master"
                                        data-navigate="view"
                                        data-view-port="#chat"
                                        data-view-animation="push-parrallax">
                                        <i class="pg-more"/>
                                    </a>
                                    <!-- END Header Controler !-->
                                    <div class="view-heading">
                                        Notications
                                    </div>
                                    <!-- BEGIN Header Controler !-->
                                    <a href="#" class="inline action p-r-10 pull-right link text-master">
                                        <i class="pg-search"/>
                                    </a>
                                    <!-- END Header Controler !-->
                                </div>
                            </div>
                            <!-- END View Header !-->
                            <!-- BEGIN Alert List !-->
                            <div data-init-list-view="ioslist" class="list-view boreded no-top-border">
                                <!-- BEGIN List Group !-->
                                <div class="list-view-group-container">
                                    <!-- BEGIN List Group Header!-->
                                    <div class="list-view-group-header text-uppercase">
                                        Calendar
                                    </div>
                                    <!-- END List Group Header!-->
                                    <ul>
                                        <!-- BEGIN List Group Item!-->
                                        <li class="alert-list">
                                            <!-- BEGIN Alert Item Set Animation using data-view-animation !-->
                                            <a
                                                href="javascript:;"
                                                class="align-items-center"
                                                data-navigate="view"
                                                data-view-port="#chat"
                                                data-view-animation="push-parrallax">
                                                <p class="">
                                                    <span class="text-warning fs-10"><i class="fa fa-circle"/></span>
                                                </p>
                                                <p class="p-l-10 overflow-ellipsis fs-12">
                                                    <span class="text-master">David Nester Birthday</span>
                                                </p>
                                                <p class="p-r-10 ml-auto fs-12 text-right">
                                                    <span class="text-warning">Today <br></span>
                                                    <span class="text-master">All Day</span>
                                                </p>
                                            </a>
                                            <!-- END Alert Item!-->
                                            <!-- BEGIN List Group Item!-->
                                        </li>
                                        <!-- END List Group Item!-->
                                        <!-- BEGIN List Group Item!-->
                                        <li class="alert-list">
                                            <!-- BEGIN Alert Item Set Animation using data-view-animation !-->
                                            <a
                                                href="#"
                                                class="align-items-center"
                                                data-navigate="view"
                                                data-view-port="#chat"
                                                data-view-animation="push-parrallax">
                                                <p class="">
                                                    <span class="text-warning fs-10"><i class="fa fa-circle"/></span>
                                                </p>
                                                <p class="p-l-10 overflow-ellipsis fs-12">
                                                    <span class="text-master">Meeting at 2:30</span>
                                                </p>
                                                <p class="p-r-10 ml-auto fs-12 text-right">
                                                    <span class="text-warning">Today</span>
                                                </p>
                                            </a>
                                            <!-- END Alert Item!-->
                                        </li>
                                        <!-- END List Group Item!-->
                                    </ul>
                                </div>
                                <!-- END List Group !-->
                                <div class="list-view-group-container">
                                    <!-- BEGIN List Group Header!-->
                                    <div class="list-view-group-header text-uppercase">
                                        Social
                                    </div>
                                    <!-- END List Group Header!-->
                                    <ul>
                                        <!-- BEGIN List Group Item!-->
                                        <li class="alert-list">
                                            <!-- BEGIN Alert Item Set Animation using data-view-animation !-->
                                            <a
                                                href="javascript:;"
                                                class="p-t-10 p-b-10 align-items-center"
                                                data-navigate="view"
                                                data-view-port="#chat"
                                                data-view-animation="push-parrallax">
                                                <p class="">
                                                    <span class="text-complete fs-10"><i class="fa fa-circle"/></span>
                                                </p>
                                                <p class="col overflow-ellipsis fs-12 p-l-10">
                                                    <span class="text-master link">Jame Smith commented on your status<br></span>
                                                    <span class="text-master">“Perfection Simplified - Company Revox"</span>
                                                </p>
                                            </a>
                                            <!-- END Alert Item!-->
                                        </li>
                                        <!-- END List Group Item!-->
                                        <!-- BEGIN List Group Item!-->
                                        <li class="alert-list">
                                            <!-- BEGIN Alert Item Set Animation using data-view-animation !-->
                                            <a
                                                href="javascript:;"
                                                class="p-t-10 p-b-10 align-items-center"
                                                data-navigate="view"
                                                data-view-port="#chat"
                                                data-view-animation="push-parrallax">
                                                <p class="">
                                                    <span class="text-complete fs-10"><i class="fa fa-circle"/></span>
                                                </p>
                                                <p class="col overflow-ellipsis fs-12 p-l-10">
                                                    <span class="text-master link">Jame Smith commented on your status<br></span>
                                                    <span class="text-master">“Perfection Simplified - Company Revox"</span>
                                                </p>
                                            </a>
                                            <!-- END Alert Item!-->
                                        </li>
                                        <!-- END List Group Item!-->
                                    </ul>
                                </div>
                                <div class="list-view-group-container">
                                    <!-- BEGIN List Group Header!-->
                                    <div class="list-view-group-header text-uppercase">
                                        Sever Status
                                    </div>
                                    <!-- END List Group Header!-->
                                    <ul>
                                        <!-- BEGIN List Group Item!-->
                                        <li class="alert-list">
                                            <!-- BEGIN Alert Item Set Animation using data-view-animation !-->
                                            <a
                                                href="#"
                                                class="p-t-10 p-b-10 align-items-center"
                                                data-navigate="view"
                                                data-view-port="#chat"
                                                data-view-animation="push-parrallax">
                                                <p class="">
                                                    <span class="text-danger fs-10"><i class="fa fa-circle"/></span>
                                                </p>
                                                <p class="col overflow-ellipsis fs-12 p-l-10">
                                                    <span class="text-master link">12:13AM GTM, 10230, ID:WR174s<br></span>
                                                    <span class="text-master">Server Load Exceeted. Take action</span>
                                                </p>
                                            </a>
                                            <!-- END Alert Item!-->
                                        </li>
                                        <!-- END List Group Item!-->
                                    </ul>
                                </div>
                            </div>
                            <!-- END Alert List !-->
                        </div>
                    <!-- EEND Alerts View !-->
                    </div>
                </div>
                <!-- END Alerts !-->
                <div id="quickview-chat" class="tab-pane active no-padding">
                    <div id="chat" class="view-port clearfix">
                        <div class="view bg-white">
                            <!-- BEGIN View Header !-->
                            <div class="navbar navbar-default">
                                <div class="navbar-inner">
                                    <!-- BEGIN Header Controler !-->
                                    <a
                                        href="javascript:;"
                                        class="inline action p-l-10 link text-master"
                                        data-navigate="view"
                                        data-view-port="#chat"
                                        data-view-animation="push-parrallax">
                                        <i class="pg-plus"/>
                                    </a>
                                    <!-- END Header Controler !-->
                                    <div class="view-heading">
                                        Chat List
                                        <div class="fs-11">Show All</div>
                                    </div>
                                    <!-- BEGIN Header Controler !-->
                                    <a href="#" class="inline action p-r-10 pull-right link text-master">
                                        <i class="pg-more"/>
                                    </a>
                                    <!-- END Header Controler !-->
                                </div>
                            </div>
                            <!-- END View Header !-->
                            <div data-init-list-view="ioslist" class="list-view boreded no-top-border">
                                <div class="list-view-group-container">
                                    <div class="list-view-group-header text-uppercase">
                                        a</div>
                                    <ul>
                                        <!-- BEGIN Chat User List Item  !-->
                                        <li class="chat-user-list clearfix">
                                            <a
                                                data-view-animation="push-parrallax"
                                                data-view-port="#chat"
                                                data-navigate="view"
                                                class=""
                                                href="#">
                                                <span class="thumbnail-wrapper d32 circular bg-success">
                                                    <img
                                                        width="34"
                                                        height="34"
                                                        alt=""
                                                        data-src-retina="assets/img/profiles/1x.jpg"
                                                        data-src="assets/img/profiles/1.jpg"
                                                        src="assets/img/profiles/1x.jpg"
                                                        class="col-top">
                                                </span>
                                                <p class="p-l-10 ">
                                                    <span class="text-master">ava flores</span>
                                                    <span class="block text-master hint-text fs-12">Hello there</span>
                                                </p>
                                            </a>
                                        </li>
                                        <!-- END Chat User List Item  !-->
                                    </ul>
                                </div>
                                <div class="list-view-group-container">
                                    <div class="list-view-group-header text-uppercase">b</div>
                                    <ul>
                                        <!-- BEGIN Chat User List Item  !-->
                                        <li class="chat-user-list clearfix">
                                            <a
                                                data-view-animation="push-parrallax"
                                                data-view-port="#chat"
                                                data-navigate="view"
                                                class=""
                                                href="#">
                                                <span class="thumbnail-wrapper d32 circular bg-success">
                                                    <img
                                                        width="34"
                                                        height="34"
                                                        alt=""
                                                        data-src-retina="assets/img/profiles/2x.jpg"
                                                        data-src="assets/img/profiles/2.jpg"
                                                        src="assets/img/profiles/2x.jpg"
                                                        class="col-top">
                                                </span>
                                                <p class="p-l-10 ">
                                                    <span class="text-master">bella mccoy</span>
                                                    <span class="block text-master hint-text fs-12">Hello there</span>
                                                </p>
                                            </a>
                                        </li>
                                        <!-- END Chat User List Item  !-->
                                        <!-- BEGIN Chat User List Item  !-->
                                        <li class="chat-user-list clearfix">
                                            <a
                                                data-view-animation="push-parrallax"
                                                data-view-port="#chat"
                                                data-navigate="view"
                                                class=""
                                                href="#">
                                                <span class="thumbnail-wrapper d32 circular bg-success">
                                                    <img
                                                        width="34"
                                                        height="34"
                                                        alt=""
                                                        data-src-retina="assets/img/profiles/3x.jpg"
                                                        data-src="assets/img/profiles/3.jpg"
                                                        src="assets/img/profiles/3x.jpg"
                                                        class="col-top">
                                                </span>
                                                <p class="p-l-10 ">
                                                    <span class="text-master">bob stephens</span>
                                                    <span class="block text-master hint-text fs-12">Hello there</span>
                                                </p>
                                            </a>
                                        </li>
                                        <!-- END Chat User List Item  !-->
                                    </ul>
                                </div>
                                <div class="list-view-group-container">
                                    <div class="list-view-group-header text-uppercase">c</div>
                                    <ul>
                                        <!-- BEGIN Chat User List Item  !-->
                                        <li class="chat-user-list clearfix">
                                            <a
                                                data-view-animation="push-parrallax"
                                                data-view-port="#chat"
                                                data-navigate="view"
                                                class=""
                                                href="#">
                                                <span class="thumbnail-wrapper d32 circular bg-success">
                                                    <img
                                                        width="34"
                                                        height="34"
                                                        alt=""
                                                        data-src-retina="assets/img/profiles/4x.jpg"
                                                        data-src="assets/img/profiles/4.jpg"
                                                        src="assets/img/profiles/4x.jpg"
                                                        class="col-top">
                                                </span>
                                                <p class="p-l-10 ">
                                                    <span class="text-master">carole roberts</span>
                                                    <span class="block text-master hint-text fs-12">Hello there</span>
                                                </p>
                                            </a>
                                        </li>
                                        <!-- END Chat User List Item  !-->
                                        <!-- BEGIN Chat User List Item  !-->
                                        <li class="chat-user-list clearfix">
                                            <a
                                                data-view-animation="push-parrallax"
                                                data-view-port="#chat"
                                                data-navigate="view"
                                                class=""
                                                href="#">
                                                <span class="thumbnail-wrapper d32 circular bg-success">
                                                    <img
                                                        width="34"
                                                        height="34"
                                                        alt=""
                                                        data-src-retina="assets/img/profiles/5x.jpg"
                                                        data-src="assets/img/profiles/5.jpg"
                                                        src="assets/img/profiles/5x.jpg"
                                                        class="col-top">
                                                </span>
                                                <p class="p-l-10 ">
                                                    <span class="text-master">christopher perez</span>
                                                    <span class="block text-master hint-text fs-12">Hello there</span>
                                                </p>
                                            </a>
                                        </li>
                                        <!-- END Chat User List Item  !-->
                                    </ul>
                                </div>
                                <div class="list-view-group-container">
                                    <div class="list-view-group-header text-uppercase">d</div>
                                    <ul>
                                        <!-- BEGIN Chat User List Item  !-->
                                        <li class="chat-user-list clearfix">
                                            <a
                                                data-view-animation="push-parrallax"
                                                data-view-port="#chat"
                                                data-navigate="view"
                                                class=""
                                                href="#">
                                                <span class="thumbnail-wrapper d32 circular bg-success">
                                                    <img
                                                        width="34"
                                                        height="34"
                                                        alt=""
                                                        data-src-retina="assets/img/profiles/6x.jpg"
                                                        data-src="assets/img/profiles/6.jpg"
                                                        src="assets/img/profiles/6x.jpg"
                                                        class="col-top">
                                                </span>
                                                <p class="p-l-10 ">
                                                    <span class="text-master">danielle fletcher</span>
                                                    <span class="block text-master hint-text fs-12">Hello there</span>
                                                </p>
                                            </a>
                                        </li>
                                        <!-- END Chat User List Item  !-->
                                        <!-- BEGIN Chat User List Item  !-->
                                        <li class="chat-user-list clearfix">
                                            <a
                                                data-view-animation="push-parrallax"
                                                data-view-port="#chat"
                                                data-navigate="view"
                                                class=""
                                                href="#">
                                                <span class="thumbnail-wrapper d32 circular bg-success">
                                                    <img
                                                        width="34"
                                                        height="34"
                                                        alt=""
                                                        data-src-retina="assets/img/profiles/7x.jpg"
                                                        data-src="assets/img/profiles/7.jpg"
                                                        src="assets/img/profiles/7x.jpg"
                                                        class="col-top">
                                                </span>
                                                <p class="p-l-10 ">
                                                    <span class="text-master">david sutton</span>
                                                    <span class="block text-master hint-text fs-12">Hello there</span>
                                                </p>
                                            </a>
                                        </li>
                                        <!-- END Chat User List Item  !-->
                                    </ul>
                                </div>
                                <div class="list-view-group-container">
                                    <div class="list-view-group-header text-uppercase">e</div>
                                    <ul>
                                        <!-- BEGIN Chat User List Item  !-->
                                        <li class="chat-user-list clearfix">
                                            <a
                                                data-view-animation="push-parrallax"
                                                data-view-port="#chat"
                                                data-navigate="view"
                                                class=""
                                                href="#">
                                                <span class="thumbnail-wrapper d32 circular bg-success">
                                                    <img
                                                        width="34"
                                                        height="34"
                                                        alt=""
                                                        data-src-retina="assets/img/profiles/8x.jpg"
                                                        data-src="assets/img/profiles/8.jpg"
                                                        src="assets/img/profiles/8x.jpg"
                                                        class="col-top">
                                                </span>
                                                <p class="p-l-10 ">
                                                    <span class="text-master">earl hamilton</span>
                                                    <span class="block text-master hint-text fs-12">Hello there</span>
                                                </p>
                                            </a>
                                        </li>
                                        <!-- END Chat User List Item  !-->
                                        <!-- BEGIN Chat User List Item  !-->
                                        <li class="chat-user-list clearfix">
                                            <a
                                                data-view-animation="push-parrallax"
                                                data-view-port="#chat"
                                                data-navigate="view"
                                                class=""
                                                href="#">
                                                <span class="thumbnail-wrapper d32 circular bg-success">
                                                    <img
                                                        width="34"
                                                        height="34"
                                                        alt=""
                                                        data-src-retina="assets/img/profiles/9x.jpg"
                                                        data-src="assets/img/profiles/9.jpg"
                                                        src="assets/img/profiles/9x.jpg"
                                                        class="col-top">
                                                </span>
                                                <p class="p-l-10 ">
                                                    <span class="text-master">elaine lawrence</span>
                                                    <span class="block text-master hint-text fs-12">Hello there</span>
                                                </p>
                                            </a>
                                        </li>
                                        <!-- END Chat User List Item  !-->
                                        <!-- BEGIN Chat User List Item  !-->
                                        <li class="chat-user-list clearfix">
                                            <a
                                                data-view-animation="push-parrallax"
                                                data-view-port="#chat"
                                                data-navigate="view"
                                                class=""
                                                href="#">
                                                <span class="thumbnail-wrapper d32 circular bg-success">
                                                    <img
                                                        width="34"
                                                        height="34"
                                                        alt=""
                                                        data-src-retina="assets/img/profiles/1x.jpg"
                                                        data-src="assets/img/profiles/1.jpg"
                                                        src="assets/img/profiles/1x.jpg"
                                                        class="col-top">
                                                </span>
                                                <p class="p-l-10 ">
                                                    <span class="text-master">ellen grant</span>
                                                    <span class="block text-master hint-text fs-12">Hello there</span>
                                                </p>
                                            </a>
                                        </li>
                                        <!-- END Chat User List Item  !-->
                                        <!-- BEGIN Chat User List Item  !-->
                                        <li class="chat-user-list clearfix">
                                            <a
                                                data-view-animation="push-parrallax"
                                                data-view-port="#chat"
                                                data-navigate="view"
                                                class=""
                                                href="#">
                                                <span class="thumbnail-wrapper d32 circular bg-success">
                                                    <img
                                                        width="34"
                                                        height="34"
                                                        alt=""
                                                        data-src-retina="assets/img/profiles/2x.jpg"
                                                        data-src="assets/img/profiles/2.jpg"
                                                        src="assets/img/profiles/2x.jpg"
                                                        class="col-top">
                                                </span>
                                                <p class="p-l-10 ">
                                                    <span class="text-master">erik taylor</span>
                                                    <span class="block text-master hint-text fs-12">Hello there</span>
                                                </p>
                                            </a>
                                        </li>
                                        <!-- END Chat User List Item  !-->
                                        <!-- BEGIN Chat User List Item  !-->
                                        <li class="chat-user-list clearfix">
                                            <a
                                                data-view-animation="push-parrallax"
                                                data-view-port="#chat"
                                                data-navigate="view"
                                                class=""
                                                href="#">
                                                <span class="thumbnail-wrapper d32 circular bg-success">
                                                    <img
                                                        width="34"
                                                        height="34"
                                                        alt=""
                                                        data-src-retina="assets/img/profiles/3x.jpg"
                                                        data-src="assets/img/profiles/3.jpg"
                                                        src="assets/img/profiles/3x.jpg"
                                                        class="col-top">
                                                </span>
                                                <p class="p-l-10 ">
                                                    <span class="text-master">everett wagner</span>
                                                    <span class="block text-master hint-text fs-12">Hello there</span>
                                                </p>
                                            </a>
                                        </li>
                                        <!-- END Chat User List Item  !-->
                                    </ul>
                                </div>
                                <div class="list-view-group-container">
                                    <div class="list-view-group-header text-uppercase">f</div>
                                    <ul>
                                        <!-- BEGIN Chat User List Item  !-->
                                        <li class="chat-user-list clearfix">
                                            <a
                                                data-view-animation="push-parrallax"
                                                data-view-port="#chat"
                                                data-navigate="view"
                                                class=""
                                                href="#">
                                                <span class="thumbnail-wrapper d32 circular bg-success">
                                                    <img
                                                        width="34"
                                                        height="34"
                                                        alt=""
                                                        data-src-retina="assets/img/profiles/4x.jpg"
                                                        data-src="assets/img/profiles/4.jpg"
                                                        src="assets/img/profiles/4x.jpg"
                                                        class="col-top">
                                                </span>
                                                <p class="p-l-10 ">
                                                    <span class="text-master">freddie gomez</span>
                                                    <span class="block text-master hint-text fs-12">Hello there</span>
                                                </p>
                                            </a>
                                        </li>
                                        <!-- END Chat User List Item  !-->
                                    </ul>
                                </div>
                                <div class="list-view-group-container">
                                    <div class="list-view-group-header text-uppercase">g</div>
                                    <ul>
                                        <!-- BEGIN Chat User List Item  !-->
                                        <li class="chat-user-list clearfix">
                                            <a
                                                data-view-animation="push-parrallax"
                                                data-view-port="#chat"
                                                data-navigate="view"
                                                class=""
                                                href="#">
                                                <span class="thumbnail-wrapper d32 circular bg-success">
                                                    <img
                                                        width="34"
                                                        height="34"
                                                        alt=""
                                                        data-src-retina="assets/img/profiles/5x.jpg"
                                                        data-src="assets/img/profiles/5.jpg"
                                                        src="assets/img/profiles/5x.jpg"
                                                        class="col-top">
                                                </span>
                                                <p class="p-l-10 ">
                                                    <span class="text-master">glen jensen</span>
                                                    <span class="block text-master hint-text fs-12">Hello there</span>
                                                </p>
                                            </a>
                                        </li>
                                        <!-- END Chat User List Item  !-->
                                        <!-- BEGIN Chat User List Item  !-->
                                        <li class="chat-user-list clearfix">
                                            <a
                                                data-view-animation="push-parrallax"
                                                data-view-port="#chat"
                                                data-navigate="view"
                                                class=""
                                                href="#">
                                                <span class="thumbnail-wrapper d32 circular bg-success">
                                                    <img
                                                        width="34"
                                                        height="34"
                                                        alt=""
                                                        data-src-retina="assets/img/profiles/6x.jpg"
                                                        data-src="assets/img/profiles/6.jpg"
                                                        src="assets/img/profiles/6x.jpg"
                                                        class="col-top">
                                                </span>
                                                <p class="p-l-10 ">
                                                    <span class="text-master">gwendolyn walker</span>
                                                    <span class="block text-master hint-text fs-12">Hello there</span>
                                                </p>
                                            </a>
                                        </li>
                                        <!-- END Chat User List Item  !-->
                                    </ul>
                                </div>
                                <div class="list-view-group-container">
                                    <div class="list-view-group-header text-uppercase">j</div>
                                    <ul>
                                        <!-- BEGIN Chat User List Item  !-->
                                        <li class="chat-user-list clearfix">
                                            <a
                                                data-view-animation="push-parrallax"
                                                data-view-port="#chat"
                                                data-navigate="view"
                                                class=""
                                                href="#">
                                                <span class="thumbnail-wrapper d32 circular bg-success">
                                                    <img
                                                        width="34"
                                                        height="34"
                                                        alt=""
                                                        data-src-retina="assets/img/profiles/7x.jpg"
                                                        data-src="assets/img/profiles/7.jpg"
                                                        src="assets/img/profiles/7x.jpg"
                                                        class="col-top">
                                                </span>
                                                <p class="p-l-10 ">
                                                    <span class="text-master">janet romero</span>
                                                    <span class="block text-master hint-text fs-12">Hello there</span>
                                                </p>
                                            </a>
                                        </li>
                                        <!-- END Chat User List Item  !-->
                                    </ul>
                                </div>
                                <div class="list-view-group-container">
                                    <div class="list-view-group-header text-uppercase">k</div>
                                    <ul>
                                        <!-- BEGIN Chat User List Item  !-->
                                        <li class="chat-user-list clearfix">
                                            <a
                                                data-view-animation="push-parrallax"
                                                data-view-port="#chat"
                                                data-navigate="view"
                                                class=""
                                                href="#">
                                                <span class="thumbnail-wrapper d32 circular bg-success">
                                                    <img
                                                        width="34"
                                                        height="34"
                                                        alt=""
                                                        data-src-retina="assets/img/profiles/8x.jpg"
                                                        data-src="assets/img/profiles/8.jpg"
                                                        src="assets/img/profiles/8x.jpg"
                                                        class="col-top">
                                                </span>
                                                <p class="p-l-10 ">
                                                    <span class="text-master">kim martinez</span>
                                                    <span class="block text-master hint-text fs-12">Hello there</span>
                                                </p>
                                            </a>
                                        </li>
                                        <!-- END Chat User List Item  !-->
                                    </ul>
                                </div>
                                <div class="list-view-group-container">
                                    <div class="list-view-group-header text-uppercase">l</div>
                                    <ul>
                                        <!-- BEGIN Chat User List Item  !-->
                                        <li class="chat-user-list clearfix">
                                            <a
                                                data-view-animation="push-parrallax"
                                                data-view-port="#chat"
                                                data-navigate="view"
                                                class=""
                                                href="#">
                                                <span class="thumbnail-wrapper d32 circular bg-success">
                                                    <img
                                                        width="34"
                                                        height="34"
                                                        alt=""
                                                        data-src-retina="assets/img/profiles/9x.jpg"
                                                        data-src="assets/img/profiles/9.jpg"
                                                        src="assets/img/profiles/9x.jpg"
                                                        class="col-top">
                                                </span>
                                                <p class="p-l-10 ">
                                                    <span class="text-master">lawrence white</span>
                                                    <span class="block text-master hint-text fs-12">Hello there</span>
                                                </p>
                                            </a>
                                        </li>
                                        <!-- END Chat User List Item  !-->
                                        <!-- BEGIN Chat User List Item  !-->
                                        <li class="chat-user-list clearfix">
                                            <a
                                                data-view-animation="push-parrallax"
                                                data-view-port="#chat"
                                                data-navigate="view"
                                                class=""
                                                href="#">
                                                <span class="thumbnail-wrapper d32 circular bg-success">
                                                    <img
                                                        width="34"
                                                        height="34"
                                                        alt=""
                                                        data-src-retina="assets/img/profiles/1x.jpg"
                                                        data-src="assets/img/profiles/1.jpg"
                                                        src="assets/img/profiles/1x.jpg"
                                                        class="col-top">
                                                </span>
                                                <p class="p-l-10 ">
                                                    <span class="text-master">leroy bell</span>
                                                    <span class="block text-master hint-text fs-12">Hello there</span>
                                                </p>
                                            </a>
                                        </li>
                                        <!-- END Chat User List Item  !-->
                                        <!-- BEGIN Chat User List Item  !-->
                                        <li class="chat-user-list clearfix">
                                            <a
                                                data-view-animation="push-parrallax"
                                                data-view-port="#chat"
                                                data-navigate="view"
                                                class=""
                                                href="#">
                                                <span class="thumbnail-wrapper d32 circular bg-success">
                                                    <img
                                                        width="34"
                                                        height="34"
                                                        alt=""
                                                        data-src-retina="assets/img/profiles/2x.jpg"
                                                        data-src="assets/img/profiles/2.jpg"
                                                        src="assets/img/profiles/2x.jpg"
                                                        class="col-top">
                                                </span>
                                                <p class="p-l-10 ">
                                                    <span class="text-master">letitia carr</span>
                                                    <span class="block text-master hint-text fs-12">Hello there</span>
                                                </p>
                                            </a>
                                        </li>
                                        <!-- END Chat User List Item  !-->
                                        <!-- BEGIN Chat User List Item  !-->
                                        <li class="chat-user-list clearfix">
                                            <a
                                                data-view-animation="push-parrallax"
                                                data-view-port="#chat"
                                                data-navigate="view"
                                                class=""
                                                href="#">
                                                <span class="thumbnail-wrapper d32 circular bg-success">
                                                    <img
                                                        width="34"
                                                        height="34"
                                                        alt=""
                                                        data-src-retina="assets/img/profiles/3x.jpg"
                                                        data-src="assets/img/profiles/3.jpg"
                                                        src="assets/img/profiles/3x.jpg"
                                                        class="col-top">
                                                </span>
                                                <p class="p-l-10 ">
                                                    <span class="text-master">lucy castro</span>
                                                    <span class="block text-master hint-text fs-12">Hello there</span>
                                                </p>
                                            </a>
                                        </li>
                                        <!-- END Chat User List Item  !-->
                                    </ul>
                                </div>
                                <div class="list-view-group-container">
                                    <div class="list-view-group-header text-uppercase">m</div>
                                    <ul>
                                        <!-- BEGIN Chat User List Item  !-->
                                        <li class="chat-user-list clearfix">
                                            <a
                                                data-view-animation="push-parrallax"
                                                data-view-port="#chat"
                                                data-navigate="view"
                                                class=""
                                                href="#">
                                                <span class="thumbnail-wrapper d32 circular bg-success">
                                                    <img
                                                        width="34"
                                                        height="34"
                                                        alt=""
                                                        data-src-retina="assets/img/profiles/4x.jpg"
                                                        data-src="assets/img/profiles/4.jpg"
                                                        src="assets/img/profiles/4x.jpg"
                                                        class="col-top">
                                                </span>
                                                <p class="p-l-10 ">
                                                    <span class="text-master">mae hayes</span>
                                                    <span class="block text-master hint-text fs-12">Hello there</span>
                                                </p>
                                            </a>
                                        </li>
                                        <!-- END Chat User List Item  !-->
                                        <!-- BEGIN Chat User List Item  !-->
                                        <li class="chat-user-list clearfix">
                                            <a
                                                data-view-animation="push-parrallax"
                                                data-view-port="#chat"
                                                data-navigate="view"
                                                class=""
                                                href="#">
                                                <span class="thumbnail-wrapper d32 circular bg-success">
                                                    <img
                                                        width="34"
                                                        height="34"
                                                        alt=""
                                                        data-src-retina="assets/img/profiles/5x.jpg"
                                                        data-src="assets/img/profiles/5.jpg"
                                                        src="assets/img/profiles/5x.jpg"
                                                        class="col-top">
                                                </span>
                                                <p class="p-l-10 ">
                                                    <span class="text-master">marilyn owens</span>
                                                    <span class="block text-master hint-text fs-12">Hello there</span>
                                                </p>
                                            </a>
                                        </li>
                                        <!-- END Chat User List Item  !-->
                                        <!-- BEGIN Chat User List Item  !-->
                                        <li class="chat-user-list clearfix">
                                            <a
                                                data-view-animation="push-parrallax"
                                                data-view-port="#chat"
                                                data-navigate="view"
                                                class=""
                                                href="#">
                                                <span class="thumbnail-wrapper d32 circular bg-success">
                                                    <img
                                                        width="34"
                                                        height="34"
                                                        alt=""
                                                        data-src-retina="assets/img/profiles/6x.jpg"
                                                        data-src="assets/img/profiles/6.jpg"
                                                        src="assets/img/profiles/6x.jpg"
                                                        class="col-top">
                                                </span>
                                                <p class="p-l-10 ">
                                                    <span class="text-master">marlene cole</span>
                                                    <span class="block text-master hint-text fs-12">Hello there</span>
                                                </p>
                                            </a>
                                        </li>
                                        <!-- END Chat User List Item  !-->
                                        <!-- BEGIN Chat User List Item  !-->
                                        <li class="chat-user-list clearfix">
                                            <a
                                                data-view-animation="push-parrallax"
                                                data-view-port="#chat"
                                                data-navigate="view"
                                                class=""
                                                href="#">
                                                <span class="thumbnail-wrapper d32 circular bg-success">
                                                    <img
                                                        width="34"
                                                        height="34"
                                                        alt=""
                                                        data-src-retina="assets/img/profiles/7x.jpg"
                                                        data-src="assets/img/profiles/7.jpg"
                                                        src="assets/img/profiles/7x.jpg"
                                                        class="col-top">
                                                </span>
                                                <p class="p-l-10 ">
                                                    <span class="text-master">marsha warren</span>
                                                    <span class="block text-master hint-text fs-12">Hello there</span>
                                                </p>
                                            </a>
                                        </li>
                                        <!-- END Chat User List Item  !-->
                                        <!-- BEGIN Chat User List Item  !-->
                                        <li class="chat-user-list clearfix">
                                            <a
                                                data-view-animation="push-parrallax"
                                                data-view-port="#chat"
                                                data-navigate="view"
                                                class=""
                                                href="#">
                                                <span class="thumbnail-wrapper d32 circular bg-success">
                                                    <img
                                                        width="34"
                                                        height="34"
                                                        alt=""
                                                        data-src-retina="assets/img/profiles/8x.jpg"
                                                        data-src="assets/img/profiles/8.jpg"
                                                        src="assets/img/profiles/8x.jpg"
                                                        class="col-top">
                                                </span>
                                                <p class="p-l-10 ">
                                                    <span class="text-master">marsha dean</span>
                                                    <span class="block text-master hint-text fs-12">Hello there</span>
                                                </p>
                                            </a>
                                        </li>
                                        <!-- END Chat User List Item  !-->
                                        <!-- BEGIN Chat User List Item  !-->
                                        <li class="chat-user-list clearfix">
                                            <a
                                                data-view-animation="push-parrallax"
                                                data-view-port="#chat"
                                                data-navigate="view"
                                                class=""
                                                href="#">
                                                <span class="thumbnail-wrapper d32 circular bg-success">
                                                    <img
                                                        width="34"
                                                        height="34"
                                                        alt=""
                                                        data-src-retina="assets/img/profiles/9x.jpg"
                                                        data-src="assets/img/profiles/9.jpg"
                                                        src="assets/img/profiles/9x.jpg"
                                                        class="col-top">
                                                </span>
                                                <p class="p-l-10 ">
                                                    <span class="text-master">mia diaz</span>
                                                    <span class="block text-master hint-text fs-12">Hello there</span>
                                                </p>
                                            </a>
                                        </li>
                                        <!-- END Chat User List Item  !-->
                                    </ul>
                                </div>
                                <div class="list-view-group-container">
                                    <div class="list-view-group-header text-uppercase">n</div>
                                    <ul>
                                        <!-- BEGIN Chat User List Item  !-->
                                        <!-- BEGIN Chat User List Item  !-->
                                        <li class="chat-user-list clearfix">
                                            <a
                                                data-view-animation="push-parrallax"
                                                data-view-port="#chat"
                                                data-navigate="view"
                                                class=""
                                                href="#">
                                                <span class="thumbnail-wrapper d32 circular bg-success">
                                                    <img
                                                        width="34"
                                                        height="34"
                                                        alt=""
                                                        data-src-retina="assets/img/profiles/1x.jpg"
                                                        data-src="assets/img/profiles/1.jpg"
                                                        src="assets/img/profiles/1x.jpg"
                                                        class="col-top">
                                                </span>
                                                <p class="p-l-10 ">
                                                    <span class="text-master">noah elliott</span>
                                                    <span class="block text-master hint-text fs-12">Hello there</span>
                                                </p>
                                            </a>
                                        </li>
                                        <!-- END Chat User List Item  !-->
                                    </ul>
                                </div>
                                <div class="list-view-group-container">
                                    <div class="list-view-group-header text-uppercase">p</div>
                                    <ul>
                                        <!-- BEGIN Chat User List Item  !-->
                                        <li class="chat-user-list clearfix">
                                            <a
                                                data-view-animation="push-parrallax"
                                                data-view-port="#chat"
                                                data-navigate="view"
                                                class=""
                                                href="#">
                                                <span class="thumbnail-wrapper d32 circular bg-success">
                                                    <img
                                                        width="34"
                                                        height="34"
                                                        alt=""
                                                        data-src-retina="assets/img/profiles/2x.jpg"
                                                        data-src="assets/img/profiles/2.jpg"
                                                        src="assets/img/profiles/2x.jpg"
                                                        class="col-top">
                                                </span>
                                                <p class="p-l-10 ">
                                                    <span class="text-master">phyllis hamilton</span>
                                                    <span class="block text-master hint-text fs-12">Hello there</span>
                                                </p>
                                            </a>
                                        </li>
                                        <!-- END Chat User List Item  !-->
                                    </ul>
                                </div>
                                <div class="list-view-group-container">
                                    <div class="list-view-group-header text-uppercase">r</div>
                                    <ul>
                                        <!-- BEGIN Chat User List Item  !-->
                                        <li class="chat-user-list clearfix">
                                            <a
                                                data-view-animation="push-parrallax"
                                                data-view-port="#chat"
                                                data-navigate="view"
                                                class=""
                                                href="#">
                                                <span class="thumbnail-wrapper d32 circular bg-success">
                                                    <img
                                                        width="34"
                                                        height="34"
                                                        alt=""
                                                        data-src-retina="assets/img/profiles/3x.jpg"
                                                        data-src="assets/img/profiles/3.jpg"
                                                        src="assets/img/profiles/3x.jpg"
                                                        class="col-top">
                                                </span>
                                                <p class="p-l-10 ">
                                                    <span class="text-master">raul rodriquez</span>
                                                    <span class="block text-master hint-text fs-12">Hello there</span>
                                                </p>
                                            </a>
                                        </li>
                                        <!-- END Chat User List Item  !-->
                                        <!-- BEGIN Chat User List Item  !-->
                                        <li class="chat-user-list clearfix">
                                            <a
                                                data-view-animation="push-parrallax"
                                                data-view-port="#chat"
                                                data-navigate="view"
                                                class=""
                                                href="#">
                                                <span class="thumbnail-wrapper d32 circular bg-success">
                                                    <img
                                                        width="34"
                                                        height="34"
                                                        alt=""
                                                        data-src-retina="assets/img/profiles/4x.jpg"
                                                        data-src="assets/img/profiles/4.jpg"
                                                        src="assets/img/profiles/4x.jpg"
                                                        class="col-top">
                                                </span>
                                                <p class="p-l-10 ">
                                                    <span class="text-master">rhonda barnett</span>
                                                    <span class="block text-master hint-text fs-12">Hello there</span>
                                                </p>
                                            </a>
                                        </li>
                                        <!-- END Chat User List Item  !-->
                                        <!-- BEGIN Chat User List Item  !-->
                                        <li class="chat-user-list clearfix">
                                            <a
                                                data-view-animation="push-parrallax"
                                                data-view-port="#chat"
                                                data-navigate="view"
                                                class=""
                                                href="#">
                                                <span class="thumbnail-wrapper d32 circular bg-success">
                                                    <img
                                                        width="34"
                                                        height="34"
                                                        alt=""
                                                        data-src-retina="assets/img/profiles/5x.jpg"
                                                        data-src="assets/img/profiles/5.jpg"
                                                        src="assets/img/profiles/5x.jpg"
                                                        class="col-top">
                                                </span>
                                                <p class="p-l-10 ">
                                                    <span class="text-master">roberta king</span>
                                                    <span class="block text-master hint-text fs-12">Hello there</span>
                                                </p>
                                            </a>
                                        </li>
                                        <!-- END Chat User List Item  !-->
                                    </ul>
                                </div>
                                <div class="list-view-group-container">
                                    <div class="list-view-group-header text-uppercase">s</div>
                                    <ul>
                                        <!-- BEGIN Chat User List Item  !-->
                                        <li class="chat-user-list clearfix">
                                            <a
                                                data-view-animation="push-parrallax"
                                                data-view-port="#chat"
                                                data-navigate="view"
                                                class=""
                                                href="#">
                                                <span class="thumbnail-wrapper d32 circular bg-success">
                                                    <img
                                                        width="34"
                                                        height="34"
                                                        alt=""
                                                        data-src-retina="assets/img/profiles/6x.jpg"
                                                        data-src="assets/img/profiles/6.jpg"
                                                        src="assets/img/profiles/6x.jpg"
                                                        class="col-top">
                                                </span>
                                                <p class="p-l-10 ">
                                                    <span class="text-master">scott armstrong</span>
                                                    <span class="block text-master hint-text fs-12">Hello there</span>
                                                </p>
                                            </a>
                                        </li>
                                        <!-- END Chat User List Item  !-->
                                        <!-- BEGIN Chat User List Item  !-->
                                        <li class="chat-user-list clearfix">
                                            <a
                                                data-view-animation="push-parrallax"
                                                data-view-port="#chat"
                                                data-navigate="view"
                                                class=""
                                                href="#">
                                                <span class="thumbnail-wrapper d32 circular bg-success">
                                                    <img
                                                        width="34"
                                                        height="34"
                                                        alt=""
                                                        data-src-retina="assets/img/profiles/7x.jpg"
                                                        data-src="assets/img/profiles/7.jpg"
                                                        src="assets/img/profiles/7x.jpg"
                                                        class="col-top">
                                                </span>
                                                <p class="p-l-10 ">
                                                    <span class="text-master">sebastian austin</span>
                                                    <span class="block text-master hint-text fs-12">Hello there</span>
                                                </p>
                                            </a>
                                        </li>
                                        <!-- END Chat User List Item  !-->
                                        <!-- BEGIN Chat User List Item  !-->
                                        <li class="chat-user-list clearfix">
                                            <a
                                                data-view-animation="push-parrallax"
                                                data-view-port="#chat"
                                                data-navigate="view"
                                                class=""
                                                href="#">
                                                <span class="thumbnail-wrapper d32 circular bg-success">
                                                    <img
                                                        width="34"
                                                        height="34"
                                                        alt=""
                                                        data-src-retina="assets/img/profiles/8x.jpg"
                                                        data-src="assets/img/profiles/8.jpg"
                                                        src="assets/img/profiles/8x.jpg"
                                                        class="col-top">
                                                </span>
                                                <p class="p-l-10 ">
                                                    <span class="text-master">sofia davis</span>
                                                    <span class="block text-master hint-text fs-12">Hello there</span>
                                                </p>
                                            </a>
                                        </li>
                                        <!-- END Chat User List Item  !-->
                                    </ul>
                                </div>
                                <div class="list-view-group-container">
                                    <div class="list-view-group-header text-uppercase">t</div>
                                    <ul>
                                        <!-- BEGIN Chat User List Item  !-->
                                        <li class="chat-user-list clearfix">
                                            <a
                                                data-view-animation="push-parrallax"
                                                data-view-port="#chat"
                                                data-navigate="view"
                                                class=""
                                                href="#">
                                                <span class="thumbnail-wrapper d32 circular bg-success">
                                                    <img
                                                        width="34"
                                                        height="34"
                                                        alt=""
                                                        data-src-retina="assets/img/profiles/9x.jpg"
                                                        data-src="assets/img/profiles/9.jpg"
                                                        src="assets/img/profiles/9x.jpg"
                                                        class="col-top">
                                                </span>
                                                <p class="p-l-10 ">
                                                    <span class="text-master">terrance young</span>
                                                    <span class="block text-master hint-text fs-12">Hello there</span>
                                                </p>
                                            </a>
                                        </li>
                                        <!-- END Chat User List Item  !-->
                                        <!-- BEGIN Chat User List Item  !-->
                                        <li class="chat-user-list clearfix">
                                            <a
                                                data-view-animation="push-parrallax"
                                                data-view-port="#chat"
                                                data-navigate="view"
                                                class=""
                                                href="#">
                                                <span class="thumbnail-wrapper d32 circular bg-success">
                                                    <img
                                                        width="34"
                                                        height="34"
                                                        alt=""
                                                        data-src-retina="assets/img/profiles/1x.jpg"
                                                        data-src="assets/img/profiles/1.jpg"
                                                        src="assets/img/profiles/1x.jpg"
                                                        class="col-top">
                                                </span>
                                                <p class="p-l-10 ">
                                                    <span class="text-master">theodore woods</span>
                                                    <span class="block text-master hint-text fs-12">Hello there</span>
                                                </p>
                                            </a>
                                        </li>
                                        <!-- END Chat User List Item  !-->
                                        <!-- BEGIN Chat User List Item  !-->
                                        <li class="chat-user-list clearfix">
                                            <a
                                                data-view-animation="push-parrallax"
                                                data-view-port="#chat"
                                                data-navigate="view"
                                                class=""
                                                href="#">
                                                <span class="thumbnail-wrapper d32 circular bg-success">
                                                    <img
                                                        width="34"
                                                        height="34"
                                                        alt=""
                                                        data-src-retina="assets/img/profiles/2x.jpg"
                                                        data-src="assets/img/profiles/2.jpg"
                                                        src="assets/img/profiles/2x.jpg"
                                                        class="col-top">
                                                </span>
                                                <p class="p-l-10 ">
                                                    <span class="text-master">todd wood</span>
                                                    <span class="block text-master hint-text fs-12">Hello there</span>
                                                </p>
                                            </a>
                                        </li>
                                        <!-- END Chat User List Item  !-->
                                        <!-- BEGIN Chat User List Item  !-->
                                        <li class="chat-user-list clearfix">
                                            <a
                                                data-view-animation="push-parrallax"
                                                data-view-port="#chat"
                                                data-navigate="view"
                                                class=""
                                                href="#">
                                                <span class="thumbnail-wrapper d32 circular bg-success">
                                                    <img
                                                        width="34"
                                                        height="34"
                                                        alt=""
                                                        data-src-retina="assets/img/profiles/3x.jpg"
                                                        data-src="assets/img/profiles/3.jpg"
                                                        src="assets/img/profiles/3x.jpg"
                                                        class="col-top">
                                                </span>
                                                <p class="p-l-10 ">
                                                    <span class="text-master">tommy jenkins</span>
                                                    <span class="block text-master hint-text fs-12">Hello there</span>
                                                </p>
                                            </a>
                                        </li>
                                        <!-- END Chat User List Item  !-->
                                    </ul>
                                </div>
                                <div class="list-view-group-container">
                                    <div class="list-view-group-header text-uppercase">w</div>
                                    <ul>
                                        <!-- BEGIN Chat User List Item  !-->
                                        <li class="chat-user-list clearfix">
                                            <a
                                                data-view-animation="push-parrallax"
                                                data-view-port="#chat"
                                                data-navigate="view"
                                                class=""
                                                href="#">
                                                <span class="thumbnail-wrapper d32 circular bg-success">
                                                    <img
                                                        width="34"
                                                        height="34"
                                                        alt=""
                                                        data-src-retina="assets/img/profiles/4x.jpg"
                                                        data-src="assets/img/profiles/4.jpg"
                                                        src="assets/img/profiles/4x.jpg"
                                                        class="col-top">
                                                </span>
                                                <p class="p-l-10 ">
                                                    <span class="text-master">wilma hicks</span>
                                                    <span class="block text-master hint-text fs-12">Hello there</span>
                                                </p>
                                            </a>
                                        </li>
                                        <!-- END Chat User List Item  !-->
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <!-- BEGIN Conversation View  !-->
                        <div class="view chat-view bg-white clearfix">
                            <!-- BEGIN Header  !-->
                            <div class="navbar navbar-default">
                                <div class="navbar-inner">
                                    <a
                                        href="javascript:;"
                                        class="link text-master inline action p-l-10 p-r-10"
                                        data-navigate="view"
                                        data-view-port="#chat"
                                        data-view-animation="push-parrallax">
                                        <i class="pg-arrow_left"/>
                                    </a>
                                    <div class="view-heading">
                                        John Smith
                                        <div class="fs-11 hint-text">Online</div>
                                    </div>
                                    <a href="#" class="link text-master inline action p-r-10 pull-right ">
                                        <i class="pg-more"/>
                                    </a>
                                </div>
                            </div>
                            <!-- END Header  !-->
                            <!-- BEGIN Conversation  !-->
                            <div id="my-conversation" class="chat-inner">
                                <!-- BEGIN From Me Message  !-->
                                <div class="message clearfix">
                                    <div class="chat-bubble from-me">
                                        Hello there
                                    </div>
                                </div>
                                <!-- END From Me Message  !-->
                                <!-- BEGIN From Them Message  !-->
                                <div class="message clearfix">
                                    <div class="profile-img-wrapper m-t-5 inline">
                                        <img
                                            class="col-top"
                                            width="30"
                                            height="30"
                                            src="assets/img/profiles/avatar_small.jpg"
                                            alt=""
                                            data-src="assets/img/profiles/avatar_small.jpg"
                                            data-src-retina="assets/img/profiles/avatar_small2x.jpg">
                                    </div>
                                    <div class="chat-bubble from-them">
                                        Hey
                                    </div>
                                </div>
                                <!-- END From Them Message  !-->
                                <!-- BEGIN From Me Message  !-->
                                <div class="message clearfix">
                                    <div class="chat-bubble from-me">
                                        Did you check out Pages framework ?
                                    </div>
                                </div>
                                <!-- END From Me Message  !-->
                                <!-- BEGIN From Me Message  !-->
                                <div class="message clearfix">
                                    <div class="chat-bubble from-me">
                                        Its an awesome chat
                                    </div>
                                </div>
                                <!-- END From Me Message  !-->
                                <!-- BEGIN From Them Message  !-->
                                <div class="message clearfix">
                                    <div class="profile-img-wrapper m-t-5 inline">
                                        <img
                                            class="col-top"
                                            width="30"
                                            height="30"
                                            src="assets/img/profiles/avatar_small.jpg"
                                            alt=""
                                            data-src="assets/img/profiles/avatar_small.jpg"
                                            data-src-retina="assets/img/profiles/avatar_small2x.jpg">
                                    </div>
                                    <div class="chat-bubble from-them">
                                        Yea
                                    </div>
                                </div>
                                <!-- END From Them Message  !-->
                            </div>
                            <!-- BEGIN Conversation  !-->
                            <!-- BEGIN Chat Input  !-->
                            <div class="b-t b-grey bg-white clearfix p-l-10 p-r-10">
                                <div class="row">
                                    <div class="col-1 p-t-15">
                                        <a href="#" class="link text-master"><i class="fa fa-plus-circle"/></a>
                                    </div>
                                    <div class="col-8 no-padding">
                                        <input
                                            type="text"
                                            class="form-control chat-input"
                                            data-chat-input=""
                                            data-chat-conversation="#my-conversation"
                                            placeholder="Say something">
                                    </div>
                                    <div class="col-2 link text-master m-l-10 m-t-15 p-l-10 b-l b-grey col-top">
                                        <a href="#" class="link text-master"><i class="pg-camera"/></a>
                                    </div>
                                </div>
                            </div>
                            <!-- END Chat Input  !-->
                        </div>
                    <!-- END Conversation View  !-->
                    </div>
                </div>
            </div>
        </div>
        <!-- END QUICKVIEW-->
        <!-- END: All of this code will eventually be removed. -->
    </div>
</template>

<script>
import { mapState } from "vuex";
import { AbilityBuilder } from "@casl/ability";
import AppHeader from "@/views/layout/header.vue";
import AppSidebar from "@/views/layout/side-bar.vue";
import FreeTrialBar from "@/views/layout/free-trial-banner.vue"
import AfterSignupWizard from "@/components/modals/after-signup-wizard.vue";
import UnsavedChangesModal from "@/components/modals/unsaved-changes.vue";
import BasicModal from "@/components/modals/basic-modal.vue";

export default {
    components: {
        AppHeader,
        AppSidebar,
        FreeTrialBar,
        AfterSignupWizard,
        UnsavedChangesModal,
        BasicModal
    },
    data() {
        return {
            appBaseColor: "#61c2cc",
            appSecondaryColor: "#9ee5b5",
            showSidebar: false
        };
    },
    computed: {
        ...mapState({
            accessList: state => state.User.data.access_list
        })
    },
    watch: {
        accessList(permissions) {
            if (permissions) {
                const ability = AbilityBuilder.define((can, cannot) => {
                    can("manage", "all");

                    Object.keys(permissions).forEach((resource) => {
                        Object.keys(permissions[resource]).forEach((action) => {
                            cannot(action, resource);
                        });
                    });
                });

                this.$ability.update(ability.rules);
            }
        },
        "$route.path"() {
            this.$nextTick(() => {
                $.Pages.init();
            });
        }
    },
    mounted() {
        this.appInitialize();

        $.Pages.init();
    },
    methods: {
        appInitialize() {
            document.body.style.setProperty("--base-color", this.appBaseColor);
            document.body.style.setProperty("--secondary-color", this.appSecondaryColor);

            $.Pages.init();
        },
        handleSidebar(state) {
            this.showSidebar = state;
        }
    }
}
</script>
<style lang="scss">
.v--modal-overlay {
    z-index: 99999 !important;
}

.fade-enter-active, .fade-leave-active {
    transition: opacity .2s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
}

.btn-primary {
    background-color: var(--base-color);
    border-color: var(--base-color);
}

.btn-primary.active,
.btn-primary.active:focus,
.btn-primary:not(:disabled):not(.disabled):active,
.btn-primary:not(:disabled):not(.disabled):active:focus,
.btn-primary:not(:disabled):not(.disabled):active:hover,
.show .dropdown-toggle.btn-primary
.btn-primary.hover,
.btn-primary:hover {
    background-color: var(--base-color);
    border-color: var(--base-color);
}

.full-height {
    height: 100%;

    .page-container {
        padding-left: 0;

        .content.sm-gutter {
            height: 100%;
            padding-top: 0;
            position: absolute;
            width: 100%;

            .login-wrapper   {
                width: initial;
                padding: 0;
                background-color: var(--base-color);
            }
        }
    }
}

[data-toggle-pin=sidebar]>i:before {
    content: "\f111";
}

.page-sidebar .sidebar-header .sidebar-header-controls {
    transform: translate3d(-18px,0,0);
}

body.sidebar-visible .page-sidebar .sidebar-header .sidebar-header-controls {
    transform: translate3d(38px,0,0);
}

.wizard-component ul li {
    padding-left: 0 !important;
}

.table.table-condensed tbody tr td :not(.dropdown-default) {
    overflow: visible;
}

.multiselect {
    .multiselect__placeholder {
        margin-bottom: 8px;
        padding-top: 0;
    }
}

@media only screen and (min-width: 980px) {
    body.menu-pin .page-sidebar {
        width: 280px;
    }
}
</style>
