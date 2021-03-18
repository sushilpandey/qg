export default function  DuplicateWindow() {
    const localStorageTimeout = (5) * 1000; // 15,000 milliseconds = 15 seconds.
    const localStorageResetInterval = (1/2) * 1000; // 10,000 milliseconds = 10 seconds.
    const localStorageTabKey = 'my-application-browser-tab';
    const sessionStorageGuidKey = 'browser-tab-guid';
    let intervalHandler;
    const ItemType = {
        Session: 1,
        Local: 2
    };
    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }
    function getCookie(name) {
        let nameEQ = name + "=";
        let ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
    function GetItem(itemtype) {
        let val = "";
        switch (itemtype) {
            case ItemType.Session:
                val = sessionStorage.getItem(sessionStorageGuidKey);
                break;
            case ItemType.Local:
                val = decodeURIComponent(getCookie(localStorageTabKey));
                if (val === undefined)
                    val = "";
                break;
            default:
                break
        }
        return val;
    }
    function SetItem(itemtype, val) {
        switch (itemtype) {
            case ItemType.Session:
                sessionStorage.setItem(sessionStorageGuidKey, val);
                break;
            case ItemType.Local:
                setCookie(localStorageTabKey, val);
                break;
            default:
                break;
        }
    }
    function createGUID() {
        const s4 = function () {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        };
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }
    function TestIfDuplicate() {    
        //console.log("In testTab");
        let sessionGuid = GetItem(ItemType.Session) || createGUID();
        SetItem(ItemType.Session, sessionGuid);
        let val = GetItem(ItemType.Local);
        let tabObj = (val === "" ? null : JSON.parse(val)) || null;
        console.log(val);
        console.log(sessionGuid);
        console.log(tabObj);
        // If no or stale tab object, our session is the winner.  If the guid matches, ours is still the winner
        if (tabObj === null || (tabObj.timestamp < (new Date().getTime() - localStorageTimeout)) || tabObj.guid === sessionGuid) {
            function setTabObj() {
                var newTabObj = {
                    guid: sessionGuid,
                    timestamp: new Date().getTime()
                };
                SetItem(ItemType.Local, JSON.stringify(newTabObj));
            }
            setTabObj();
            intervalHandler = setInterval(setTabObj, localStorageResetInterval);//every x interval refresh timestamp in cookie
            localStorage.setItem('winner-window', sessionGuid);
            return false;
        } else {
            // An active tab is already open that does not match our session guid.
            return true;
        }
    }
    window.IsDuplicate = function () {
        const duplicate = TestIfDuplicate();
        //console.log("Is Duplicate: "+ duplicate);
        return duplicate;
    };
    window.onbeforeunload = function () {
        if (TestIfDuplicate() === false) {
            SetItem(ItemType.Local, "");
        }
    };
    // /**
    //  * Reset Interval of other tabs by checking localstorage for variable
    //  */
    function resetIntervalOfOtherTabs() {
        if(localStorage.getItem('winner-window') !== sessionStorage.getItem(sessionStorageGuidKey)) {
            clearInterval(intervalHandler);
            if(localStorage.getItem('loadAnywayBtnClicked') === 'true') {
                localStorage.setItem('loadAnywayBtnClicked', 'false');
                window.location.reload();
            }
        }
    }
    setInterval(resetIntervalOfOtherTabs, localStorageResetInterval);
    window.resetDuplicate = function() {
        SetItem(ItemType.Session, sessionStorage.getItem(sessionStorageGuidKey));
        const newTabObj = {
            guid: sessionStorage.getItem(sessionStorageGuidKey),
            timestamp: new Date().getTime()
        };
        SetItem(ItemType.Local, JSON.stringify(newTabObj));
        TestIfDuplicate();
        localStorage.setItem('winner-window', sessionStorage.getItem(sessionStorageGuidKey));
    }
}