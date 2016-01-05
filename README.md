Copied from: https://github.com/couchbaselabs/todolite-reactnative-android

Web front end stuff:

Couchbase lite (on the device):
http://localhost:5984/todos/_all_docs?include_docs=true

Sync gateway (user port)
http://localhost:4984/todos/_all_docs?include_docs=true

Sync gateway (admin port)
http://localhost:4985/_admin/db/todos

Commands

    npm start

    ~/Downloads/couchbase-sync-gateway/bin/sync_gateway sync-gateway-config.json

    $ANDROID_HOME/platform-tools/adb reverse tcp:4984 tcp:4984
    $ANDROID_HOME/platform-tools/adb forward tcp:5984 tcp:5984
