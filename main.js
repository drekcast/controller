//the require library is configuring paths
require.config({
    //baseUrl: "/drekcast/controller",
    paths: {
        //tries to load jQuery from Google's CDN first and falls back
        //to load locally
        "jquery": ["http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min",
            "bower_components/jquery/jquery"],
        "lodash": "bower_components/lodash/dist/lodash",
        "primus": "http://localhost:3000/primus/primus",

        "drekcast-client": "/drekcast/client-core/lib/Client"

        ,"util/Events":  "/drekcast/client-core/lib/util/Events"
        ,"connector/PrimusConnector":  "/drekcast/client-core/lib/connector/PrimusConnector"
        ,"connector/BaseConnector":  "/drekcast/client-core/lib/connector/BaseConnector"

    },
    shim: {
        lodash: {
            exports: '_'
        },

        "BaseClient": {
            deps: ["lodash"]
        }
    },
    //how long the it tries to load a script before giving up, the default is 7
    waitSeconds: 10
});
//requiring the scripts in the first argument and then passing the library namespaces into a callback
//you should be able to console log all of the callback arguments
require(['drekcast-client'], function(Client) {

    var client = new Client({
        serverAddress: 'http://localhost:3000',
        channel: 'drekcast-test'
    });
    client.connect();

    client.on('all', function(message, data) {
        console.log(message, data);
    });

    document.getElementById('join').addEventListener('click', function() {
        client.setChannel('drekcast-test');
    });

    document.getElementById('screen-1').addEventListener('click', function() {
        client.setScreen('clock');
    })
    document.getElementById('screen-2').addEventListener('click', function() {
        client.setScreen('message');
    })

    document.getElementById('overlay-1').addEventListener('click', function() {
        client.toggleOverlay('message', true, { test: 1});
    });

    document.getElementById('overlay-2').addEventListener('click', function() {
        client.toggleOverlay('message', false, {});
    });
});