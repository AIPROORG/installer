/* global chrome */
import React, { useState, useEffect } from "react";
// import AuthContext from '../context/AuthContext';
import { Link } from "react-router-dom";
import { endpoints } from "../utils/endpoints";
import storageComunicator from "../utils/storageComunication";
import { useNavigate } from "react-router-dom";

const Import = () => {
  // const data = require('./data.json');
  // let hs = data;
  let hs = [];
  let filteredHistory = [];
  const urlExists = (url) => {
    return filteredHistory.some((item) => item.url === url);
  };

  const filterHistory = () => {
    chrome.history.search(
      {
        text: "", // Return every history item....
        startTime: 0, // that was accessed less than one week ago.
      },
      (historyItems) => {
        hs = historyItems;
        for (const x of hs) {
          let url = x.url;
          let visitCount = x.visitCount;
          if (!urlExists(url)) filteredHistory.push({ url, visitCount });
        }
        filteredHistory.sort((a, b) => b.visitCount - a.visitCount);
        filteredHistory = regexThis();
        send_history_to_backend();
      }
    );
  };

    const send_history_to_backend = async () => {
        console.log(filteredHistory);
        await fetch(endpoints.home_page.save_most_used_sites,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization':'Bearer ' + String(storageComunicator.authToken.get().access),
                },
                body: JSON.stringify({
                    sites: filteredHistory
                })
            }
        )
        .then(response => response.json())
        .then(data => {
            console.log("response from server: ", data);
        })
    }

  const regexThis = () => {
    const re = new RegExp("[a-zA-Z0-9-:]*//[a-zA-Z0-9-.:]*/");
    let result = [];
    for (const x of filteredHistory) {
      try {
        let domain = x.url.match(re)[0];
        let visitCountDomain = x.visitCount;
        if (!result.some((item) => item.domain === domain))
          result.push({ domain, visitCountDomain });
      } catch (e) {
        console.log(e, x.url);
      }
    }
    return result;
  };
  return (
    <div className="steps-background flex flex-col items-center justify-center space-y-4 space-x-4">
      <button onClick={filterHistory}>Import</button>
    </div>
  );
};

export default Import;
