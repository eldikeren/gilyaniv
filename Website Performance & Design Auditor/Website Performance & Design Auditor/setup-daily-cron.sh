#!/bin/bash

# Setup daily cron job for website auditing
# This script sets up automated daily runs of the website audit

echo "🔧 Setting up daily website audit cron job..."

# Get the current directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DAILY_SCRIPT="$SCRIPT_DIR/daily-audit.js"

# Make the daily script executable
chmod +x "$DAILY_SCRIPT"

# Create cron job entry (runs every day at 9 AM)
CRON_ENTRY="0 9 * * * cd $SCRIPT_DIR && node $DAILY_SCRIPT https://gilyaniv.vercel.app >> $SCRIPT_DIR/audit-scheduler.log 2>&1"

# Add to crontab
(crontab -l 2>/dev/null; echo "$CRON_ENTRY") | crontab -

echo "✅ Daily cron job set up successfully!"
echo "📅 The audit will run every day at 9:00 AM"
echo "📁 Reports will be saved in: $SCRIPT_DIR/daily-reports/"
echo "📝 Logs will be saved in: $SCRIPT_DIR/audit-scheduler.log"
echo ""
echo "To view current cron jobs: crontab -l"
echo "To remove the cron job: crontab -e (then delete the line)"
echo "To run manually: cd $SCRIPT_DIR && node $DAILY_SCRIPT https://gilyaniv.vercel.app"