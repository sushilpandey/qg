
// The install handler takes care of precaching the resources we always need.
self.addEventListener('install', event => {
    // The promise that skipWaiting() returns can be safely ignored.
    self.skipWaiting();
});

// The activate handler takes care of cleaning up old caches.
self.addEventListener('activate', event => {
  //console.log("Activate event")
});

self.addEventListener('fetch', event => {

});


self.addEventListener('message', function(event){
    console.log("Message recieved in service worker:", event);
    var data = event.data;
    var clientId = event.source.id;
    console.log("this is the new tab id " + data.tabId);
    self.syncTabState(data, clientId, data.tabId);
});


self.sendTabState = function(client, data){
    client.postMessage(data);
}

self.syncTabState = function(data, clientId, tabId){

    clients.matchAll().then(matched_clients => {
        let filtered_clients = matched_clients.filter(function(client){return client.url.indexOf('noflex') === -1});
        console.log("------------1----------------")
        if (filtered_clients.length > 1){ 
            filtered_clients.forEach(client => {
                console.log(client);
                console.log(self.activeTabId);
                console.log(tabId);
                if (client.id == clientId && tabId != self.activeTabId) {
                    console.log("in here for the tab id " + tabId )
                    self.sendTabState(client, {type: 'getTabCount', value: 1, tabId: tabId, activeTabId: self.activeTabId})
                }
            })
        } else if(filtered_clients.length === 1) {
            console.log(self.activeTabId);
            self.activeTabId = tabId;
        }
    })
}