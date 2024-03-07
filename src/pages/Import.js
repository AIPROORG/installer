/* global chrome */
import React, {useState, useEffect } from 'react'
// import AuthContext from '../context/AuthContext';
import {Link} from 'react-router-dom';
import { endpoints } from '../utils/endpoints';
import storageComunicator from '../utils/storageComunication';
import { useNavigate } from 'react-router-dom'

const Import = () => {
    const data = require('./data.json');
    let hs = data;
    let filteredHistory = [];
    const urlExists = (url) => {
        return filteredHistory.some(item => item.url === url);
    }
    const filterHistory = () => {
        // regexThis();
        // console.log(hs);
        for( const x of hs){
            let url = x.url;
            let visitCount = x.visitCount;
            if(!urlExists(url))
                filteredHistory.push({url,visitCount});
        }
        filteredHistory.sort((a,b)=>b.visitCount - a.visitCount);
        // console.log(filteredHistory);
        filteredHistory = regexThis();
        console.log(filteredHistory);
    }
    const getAllBrowserHistory = () => {
        // chrome.history.search(
        //     {
        //       text: '', // Return every history item....
        //       startTime: 0 // that was accessed less than one week ago.
        //     },
        //     (historyItems) => {
        //       hs = historyItems;
        //       console.log(hs);
        //     }
        // );
        // console.log(hs);
    }
    const regexThis = () => {
        const re = new RegExp("[a-zA-Z0-9\-:]*//[a-zA-Z0-9\-.:]*/");
        let result = [];
        for(const x of filteredHistory){
            try{
                let domain = x.url.match(re)[0];
                let visitCountDomain = x.visitCount;
                if(!result.some(item => item.domain === domain))
                    result.push({domain,visitCountDomain});
            }
            catch (e){
                console.log(e,x.url);
            }
                // console.log(x.url.match(re)[0]);
            // console.log(x.url);
        }
        return result;
        // chrome.history.search(
        //     {
        //       text: '', // Return every history item....
        //       startTime: 0 // that was accessed less than one week ago.
        //     },
        //     (historyItems) => {
        //       hs = historyItems;
        //     }
        // );
        // console.log(hs);
    }
    return (
        <div className='steps-background flex flex-col items-center justify-center space-y-4 space-x-4'>
          <button onClick={getAllBrowserHistory}>Import</button>
          <button onClick={filterHistory}>Import</button>
          {/* <button onClick={regexThis}>Import</button> */}
        </div>
    )
}

export default Import