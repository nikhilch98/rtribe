#!/bin/bash

# RTRIBE Flask App with Twilio Integration
# This script helps you set environment variables and run the app

echo "🚀 RTRIBE Flask App with Twilio OTP Integration"
echo "=============================================="
echo ""

# Check if environment variables are set
if [ -z "$TWILIO_ACCOUNT_SID" ] || [ -z "$TWILIO_AUTH_TOKEN" ] || [ -z "$TWILIO_VERIFY_SERVICE_SID" ]; then
    echo "⚠️  Twilio environment variables are not set!"
    echo ""
    echo "Please set your Twilio credentials:"
    echo "export TWILIO_ACCOUNT_SID=\"your_account_sid_here\""
    echo "export TWILIO_AUTH_TOKEN=\"your_auth_token_here\""
    echo "export TWILIO_VERIFY_SERVICE_SID=\"your_verify_service_sid_here\""
    echo ""
    echo "Then run this script again: ./run_with_twilio.sh"
    echo ""
    echo "Or run directly: python3 app.py"
    echo ""
    echo "📱 For testing without SMS, use:"
    echo "   Mobile: 9999999999"
    echo "   OTP: 123456"
    echo ""
    
    # Ask if user wants to continue without Twilio
    read -p "Continue without Twilio (test mode only)? [y/N]: " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Exiting. Please set environment variables and try again."
        exit 1
    fi
    echo ""
    echo "🧪 Running in TEST MODE (no real SMS will be sent)"
else
    echo "✅ Twilio environment variables detected:"
    echo "   TWILIO_ACCOUNT_SID: ${TWILIO_ACCOUNT_SID:0:8}..."
    echo "   TWILIO_AUTH_TOKEN: ${TWILIO_AUTH_TOKEN:0:8}..."
    echo "   TWILIO_VERIFY_SERVICE_SID: ${TWILIO_VERIFY_SERVICE_SID:0:8}..."
fi

echo ""
echo "Starting Flask app on http://localhost:8000"
echo "Press Ctrl+C to stop"
echo ""

# Start the Flask app
python3 app.py 