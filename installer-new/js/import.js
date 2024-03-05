document.addEventListener('DOMContentLoaded', () => {
    let import_btn_wrapper = document.getElementById("import_btn_wrapper");

    chrome.aipro.getBrowserList(function (bl) {
        for (let i = 0; i < bl.length; i++) {
            const button = document.createElement('button');
            button.className = 'border rounded-md px-3 py-2 w-full bg-[rgba(255,255,255,0.7)]';
            button.innerHTML = "<div class='font-lg font-bold'>" + bl[i].name + "</div><div class='font-sm' > Profile: " + bl[i].profile + "</div>";

            button.addEventListener('click', () => {
                chrome.aipro.runImport(i, function (canceled) {
                    console.log(canceled)
                    if (canceled) {
                        console.log("import canceled")
                        return;
                    }
                    console.log("imported from browser" + bl[i].name)
                    button.classList.add('bg-green-200');
                })
            });
            import_btn_wrapper.appendChild(button);
        }

        browser_list = bl;
    });
});