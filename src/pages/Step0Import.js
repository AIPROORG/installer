/* global chrome */
import React, { useEffect, useState } from "react";

const Step0Import = () => {
  //     const [browserList, setBrowserList] = useState([]);
  //     useEffect(() => {
  //         chrome.aipro.getBrowserList(function(browser_list) {
  //             setBrowserList(browser_list);
  //         });
  //     }, []);
  //     function importFromBrowser(button, browserIndex){
  //         let browser = browserList[browserIndex];
  //             chrome.aipro.runImport(browserIndex, function(canceled) {
  //                 console.log(canceled)
  //                 if(canceled) {
  //                     console.log("import canceled")
  //                     return;
  //                 }
  //                 console.log("imported from browser" + browser.name)
  //                 button.classList.add('bg-green-200');
  //             })
  //     }
  //     const renderButtons = () => {
  //         return browserList.map((browser, i) => (
  //             <button
  //                 className='border rounded-xl bg-[rgba(255,255,255,0.7)] min-h-[150px] max-h-[150px] max-w-[150px] min-w-[150px] '
  //                 key={i}
  //                 id={`importButton${i}`}
  //                 onClick={() =>
  //                     importFromBrowser(document.getElementById(`importButton${i}`), i)
  //                 }>
  //                 {browser.name} <br /> {browser.profile}
  //             </button>
  //         ));
  //     };
  //     return (
  //         <div className="w-[100vw] h-[100vh] bg-no-repeat object-fill bg-center steps-background">
  //             <div className="mx-auto flex items-center justify-center w-full h-full space-x-2">
  //                 {renderButtons()}
  //             </div>
  //         </div>
  //     )
};

export default Step0Import;
