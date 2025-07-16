# OTP Authentication API Documentation

This document describes the OTP (One-Time Password) authentication system implemented in the RTRIBE Flask application.

## Overview

The OTP system uses Twilio Verify API for sending and verifying OTPs. Authentication tokens are stored in JSON files with an interface that can be easily migrated to a database later.

## Environment Variables

Set the following environment variables for production:

```bash
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token  
TWILIO_VERIFY_SERVICE_SID=your_twilio_verify_service_sid
JWT_SECRET_KEY=your_secure_jwt_secret_key
```

## API Endpoints

### 1. Send OTP

**Endpoint:** `POST /api/send-otp`

**Description:** Sends an OTP to the specified mobile number asynchronously.

**Request Body:**
```json
{
  "mobile_number": "9876543210"
}
```

**Response:**
```json
{
  "success": true,
  "message": "OTP is being sent to your mobile number",
  "mobile_number": "9876543210"
}
```

**Test Mode:** Use mobile number `9999999999` for testing without actual SMS.

### 2. Verify OTP

**Endpoint:** `POST /api/verify-otp`

**Description:** Verifies the OTP and returns an authentication token.

**Request Body:**
```json
{
  "mobile_number": "9876543210",
  "otp": "123456"
}
```

**Success Response:**
```json
{
  "success": true,
  "message": "OTP verified successfully",
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "token_type": "bearer",
  "expires_in": 2592000,
  "mobile_number": "9876543210"
}
```

**Test Mode:** Use OTP `123456` with mobile number `9999999999` for testing.

### 3. Verify Token

**Endpoint:** `POST /api/verify-token`

**Description:** Verifies if an authentication token is valid.

**Request Body:**
```json
{
  "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Token is valid",
  "mobile_number": "9876543210"
}
```

### 4. Logout

**Endpoint:** `POST /api/logout`

**Description:** Revokes the authentication token.

**Request Body:**
```json
{
  "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

## Error Responses

All endpoints return error responses in this format:

```json
{
  "success": false,
  "message": "Error description"
}
```

Common HTTP status codes:
- `400`: Bad Request (invalid input)
- `401`: Unauthorized (invalid/expired token)
- `500`: Internal Server Error

## Token Storage

Tokens are stored in `data/auth_tokens.json` with the following structure:

```json
{
  "9876543210": {
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
    "expires_at": "2024-02-15T10:30:00.000000",
    "created_at": "2024-01-16T10:30:00.000000"
  }
}
```

## Testing

Use the provided test script to verify the API functionality:

```bash
python test_otp_apis.py
```

This script tests all endpoints with the test mobile number `9999999999` and OTP `123456`.

## Security Features

1. **JWT Tokens:** Secure token-based authentication
2. **Token Expiration:** Tokens expire after 30 days
3. **Async OTP Sending:** Non-blocking OTP delivery
4. **Input Validation:** Phone number and OTP format validation
5. **Test Mode:** Safe testing without actual SMS charges

## Architecture

### AuthTokenStorage Interface

The `AuthTokenStorage` class provides an interface for token operations:

- `save_token(mobile_number, token, expires_at)`: Save a new token
- `get_token(mobile_number)`: Retrieve and validate a token
- `revoke_token(mobile_number)`: Remove a token
- `verify_token(token)`: Verify JWT token validity

This interface can be easily replaced with a database implementation later.

### TwilioOTPService Class

The `TwilioOTPService` class handles OTP operations:

- `send_otp(mobile_number)`: Send OTP via Twilio
- `verify_otp(mobile_number, otp_code)`: Verify OTP with Twilio

Includes test mode for development when Twilio credentials are not configured.

## Migration to Database

To migrate from JSON file storage to a database:

1. Create a new class implementing the same interface as `AuthTokenStorage`
2. Replace the `auth_storage` instance initialization
3. All API endpoints will continue working without changes

Example database implementation interface:

```python
class DatabaseAuthTokenStorage:
    def save_token(self, mobile_number: str, token: str, expires_at: datetime) -> bool:
        # Database implementation
        pass
    
    def get_token(self, mobile_number: str) -> Optional[Dict[str, Any]]:
        # Database implementation  
        pass
    
    # ... other methods
``` 