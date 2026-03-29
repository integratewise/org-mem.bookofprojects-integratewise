#!/bin/bash
# Setup daily Dropbox → ImageGallery sync on macOS
# Run this script to install the daily sync job

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_DIR="$(dirname "$SCRIPT_DIR")"
LAUNCHD_NAME="com.integratewise.dropbox-sync"
PLIST_PATH="$HOME/Library/LaunchAgents/${LAUNCHD_NAME}.plist"

echo "🔄 Setting up daily Dropbox sync for ImageGallery..."
echo "   Repo: $REPO_DIR"
echo "   Plist: $PLIST_PATH"

# Create LaunchAgent plist
cat > "$PLIST_PATH" << EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>${LAUNCHD_NAME}</string>
    
    <key>ProgramArguments</key>
    <array>
        <string>/usr/local/bin/node</string>
        <string>${SCRIPT_DIR}/dropbox-sync.mjs</string>
        <string>--import-all</string>
    </array>
    
    <key>StartCalendarInterval</key>
    <dict>
        <key>Hour</key>
        <integer>9</integer>
        <key>Minute</key>
        <integer>0</integer>
    </dict>
    
    <key>StandardOutPath</key>
    <string>${REPO_DIR}/logs/sync.log</string>
    
    <key>StandardErrorPath</key>
    <string>${REPO_DIR}/logs/sync-error.log</string>
    
    <key>WorkingDirectory</key>
    <string>${REPO_DIR}</string>
    
    <key>RunAtLoad</key>
    <false/>
</dict>
</plist>
EOF

# Create logs directory
mkdir -p "$REPO_DIR/logs"

# Load the LaunchAgent
launchctl unload "$PLIST_PATH" 2>/dev/null
launchctl load "$PLIST_PATH"

echo ""
echo "✅ Daily sync installed!"
echo "   Runs: Every day at 9:00 AM"
echo "   Logs: $REPO_DIR/logs/sync.log"
echo ""
echo "Commands:"
echo "   launchctl list | grep integratewise    # Check status"
echo "   launchctl unload $PLIST_PATH           # Stop sync"
echo "   launchctl load $PLIST_PATH             # Start sync"
echo "   tail -f $REPO_DIR/logs/sync.log        # Watch logs"
