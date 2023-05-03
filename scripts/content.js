
const btn = document.querySelector('.btn');
console.log(btn)

btn.addEventListener('click',async ()=>{
    let queryOptions = { active: true, lastFocusedWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    // console.log(tab);

    chrome.scripting.executeScript({
        target : {tabId : tab.id},
        function : pickColor
    }).then(injectionResult=>{
        res = injectionResult[0]['result'];
        // console.log(res);
        document.getElementById('answer').innerHTML = res;
    })
});

async function pickColor() {
    try {
        const eyeDropper =  new EyeDropper();
        const selectedColor  = await eyeDropper.open();
        // console.log(selectedColor)
        color = selectedColor["sRGBHex"];
        // console.log(color);
        return color;
    } catch (error) {
        console.log(error);
    }
}
