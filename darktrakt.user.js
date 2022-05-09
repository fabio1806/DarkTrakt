// ==UserScript==
// @name         Dark Trakt
// @namespace    http://tampermonkey.net/
// @version      0.6.3
// @description  Dark theme for Trakt website
// @author       Fabio1806
// @match        https://trakt.tv/*
// @icon         https://trakt.tv/assets/logos/header@2x-d6926a2c93734bee72c5813819668ad494dbbda651457cd17d15d267bc75c657.png
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // ---------- User Data ----------------- //
    let username = 'thor1806';
    let userLen = username.length;
    // -------------------------------------- //


    console.log("DARK THEME FOR TRATK by Fabio1806")
    //setInterval(whereToWatchColor, 1000);

    // --------------------------------------------------------------------------------- //

    let num=0

    // --------------------------------------------------------------------------------- //
    if (document.URL == 'https://trakt.tv/dashboard'){
        changeDashboardColor();
    }

    else if (document.URL.slice(0,24) == 'https://trakt.tv/movies/'){
        changeMovieColor();
    }

    else if (document.URL.slice(0,23) == 'https://trakt.tv/shows/'){
       changeShowColor();
    }

    else if (document.URL.slice(0,23+userLen) == 'https://trakt.tv/users/'+username){
        changeUserColor();
    }

    else if (document.URL.slice(0,25) == 'https://trakt.tv/settings'){
        changeSettingsColor();
    }

    else {
        try{
            removeAll('#c7f7a-d7f72-wrapper');
            removeAll('#c7f7a-d7f72-a9686');
            removeAll('#e20df-f8539-wrapper');
            removeAll('#e20df-c7599-aa3b9-wrapper');
            removeAll('.grid-item.e20df-grid-item.col-xlg-3.col-md-4.col-sm-6')
            removeAll('.c7f7a-grid-item');

            changeBgColor('#info-wrapper', '#1d1d1d');
            changeColor('#info-wrapper', '#fff');

            document.querySelectorAll('.shade').forEach((x) => x.style.backgroundImage =
                               'linear-gradient(to bottom,rgba(241,241,241,0) 0%,#484848 100%)');
        }
        catch(err){
            console.warn("Error removing ads");
            num = num+1;
            checkError(num);
        }
    }

    // --------------------------------------------------------------------------------- //

    function changeDashboardColor() {

        // Change BG for all the sections
        try {
            removeAll('#c7f7a-d7f72-wrapper');
            removeAll('#e20df-f8539-wrapper');
            removeAll('#e20df-c7599-aa3b9-wrapper');
            removeAll('.vip')

            changeBgColor('#ondeck-wrapper', '#1d1d1d');
            changeBgColor('#schedule-wrapper', '#1d1d1d');
            changeBgColor('#charts-wrapper', '#1d1d1d');
            changeBgColor('#activity-wrapper', '#1d1d1d');
            changeBgColor('#network-wrapper', '#1d1d1d');


            document.querySelector('body').style.color = '#ffffff';
            document.querySelector('#header-search').style.color = '#000000';

            changeArrColor('.ellipsify', '#fafafa');
            changeArrColor('.genre-bars.light .bar label', '#fafafa');
        }
        catch(err){
            console.error("ERROR: dashboard dark theme failed")
            num = num+1;
            checkError(num);
        }
        finally{
            setTimeout(changeDashboardColor, 1000);
        }
    }

    // --------------------------------------------------------------------------------- //

    function changeMovieColor() {

        try{
            if(!document.URL.includes('/trending')){
                removeAll('#c7f7a-d7f72-wrapper');
                removeAll('#c7f7a-d7f72-a9686');
                removeAll('#e20df-f8539-wrapper');
                removeAll('#e20df-c7599-aa3b9-wrapper');

                changeBgColor('#info-wrapper', '#1d1d1d');

                // Change list button background only if not selected
                buttonList();

                changeArrColor('.btn-list-subscribe', '#ffffff');
                changeArrColor('.btn-list-progress', '#ffffff');


                document.querySelector('body').style.color = '#ffffff';
                document.querySelector('#header-search').style.color = '#000000';

                // change comments bg color
                commentList();
            }

            else{
                removeAll('#c7f7a-d7f72-wrapper');
                removeAll('#c7f7a-d7f72-a9686');
                removeAll('#e20df-f8539-wrapper');
                removeAll('.c7f7a-grid-item');
                removeAll('#e20df-c7599-aa3b9-wrapper');
            }
        }
        catch(err){
            console.error("ERROR: movie dark theme failed")
            num = num+1;
            checkError(num);
        }
        finally{
            setTimeout(changeMovieColor, 1000);
        }
    }

    // --------------------------------------------------------------------------------- //

    function changeShowColor() {
        try{
            removeAll('#e20df-f8539-wrapper');
            removeAll('#e20df-c7599-aa3b9-wrapper');

            changeBgColor('#info-wrapper', '#1d1d1d');
            changeBgColor('.subnav-wrapper', '#484848');

            buttonList();
            changeArrColor('.btn-list-subscribe', '#ffffff');
            changeArrColor('.btn-list-progress', '#ffffff');

            document.querySelector('body').style.color = '#ffffff';
            document.querySelector('#header-search').style.color = '#000000';

            commentList();
        }
        catch(err){
            console.error("ERROR: show dark theme failed");
            num = num+1;
            checkError(num);
        }
        finally{
            setTimeout(changeShowColor, 1000);
        }

    }

    // --------------------------------------------------------------------------------- //

    function changeUserColor() {

        try{

            // Progress page
            if(document.URL.slice(23,24+8+userLen) == username+'/progress'){

                // Remove ads
                removeAll('#c7f7a-content-page');

                changeBgColor('#progress-wrapper', '#1d1d1d');
                changeBgColor('.comment-wrapper.list.subnav.wider.hidden-xs', '#262626');

                changeArrBgColor('.seasons', '#262626');
                changeArrBgColor('.subnav-wrapper', '#1d1d1d');

                changeColor('body', '#fff');
            }

            else if (document.URL.slice(23,24+userLen+'/lists'.length) == username+'/lists'){

                 removeAll('#c7f7a-content-page');

                 // Create an array to select the last section to change bg
                 let sections = document.querySelectorAll('section');
                 sections[sections.length-1].style.background = '#1d1d1d';

                 changeArrBgColor('.subnav-wrapper', '#1d1d1d');
                 changeArrBgColor('.comment-wrapper.list', '#262626');
                 changeArrBgColor('h4', '#262626');

                 // Text colors
                 changeArrColor('a.username.emojis-supported.emojis-converted', '#fff');
                 changeColor('body', '#fff');
            }

            else {
                removeAll('#c7f7a-content-page');
            }
        }
        catch(err){
            console.error("ERROR: user dark theme failed");
            num = num+1;
            checkError(num);
        }
        finally{
            setTimeout(changeUserColor, 1000);
        }
    }

    // --------------------------------------------------------------------------------- //

    function changeSettingsColor() {
        try{
            changeArrBgColor('.container', '#1d1d1d');
            changeArrBgColor('.panel-default', '#262626');
            changeArrBgColor('.panel-heading', '#1d1d1d');
            changeArrBgColor('.instructions', '#111111');

            changeBgColor('#main-settings', '#1d1d1d');

            changeColor('body', '#fff');

            changeArrColor('.panel-heading', '#fff');
        }
        catch(err){
            console.error("ERROR: settings dark theme failed");
            num = num+1;
            checkError(num);
        }
        finally{
            setTimeout(changeSettingsColor, 1000);
        }
    }

    // --------------------------------------------------------------------------------- //

    function whereToWatchColor() {
        if(document.querySelector('#watch-now-modal') && document.querySelector('#watch-now-modal').ariaHidden == 'false'){
            try{
                changeBgColor('#watch-now-modal', '#1d1d1d')
            }
            catch(err){
                console.alert("No window found")
            }
        }
    }

    function buttonList() {
        if (!btnSelected('.btn-watch')){
                    changeBgColor('.btn-watch', '#484848'); }
                if (!btnSelected('.btn-collect')){
                    changeBgColor('.btn-collect', '#484848'); }
                if (!btnSelected('.btn-list')){
                    changeBgColor('.btn-list', '#484848'); }
                if (!btnSelected('.btn-recommendations')){
                    changeBgColor('.btn-recommendations', '#484848'); }
                if (!btnSelected('.btn-comment')){
                    changeBgColor('.btn-comment', '#484848'); }
    }

    function commentList() {
        changeArrBgColor('.comment-wrapper', '#484848');
                changeArrBgColor('.above-comment', '#1d1d1d');
                document.querySelectorAll('.shade').forEach((x) => x.style.backgroundImage =
                               'linear-gradient(to bottom,rgba(241,241,241,0) 0%,#484848 100%)');
    }

    // --------------------------------------------------------------------------------- //

    function changeColor(str, clr) {
        document.querySelector(str).style.color = clr;
    }

    function changeArrColor(str, clr) {
        document.querySelectorAll(str).forEach((x) => x.style.color = clr);
    }

    function changeBgColor(str, clr) {
        document.querySelector(str).style.background = clr;
    }

    function changeArrBgColor(str, clr) {
        document.querySelectorAll(str).forEach((x) => x.style.background = clr);
    }

    function removeAll(str){
        document.querySelectorAll(str).forEach((x) => x.remove());
    }

    function btnSelected(str){
        return document.querySelector(str) == document.querySelector(str+'.selected')
    }

    // --------------------------------------------------------------------------------- //

    function checkError(num){
        if (num>5){
            setTimeout(location.reload(), 5000)
            console.error("Error. Reload page...")
        }
        else{
            console.log("Attempt n° "+num)
        }
    }

})();
