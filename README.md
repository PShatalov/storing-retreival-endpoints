## Requirements

- Docker
- Node 20
- Curl (optional)

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
$ docker-compose up -d

$ pnpm start
```

## Docs

This document outlines the API endpoints for encrypting and decrypting data. These endpoints allow clients to securely encrypt data for storage and retrieve it in its original, decrypted form.

### Base URL

`http://localhost:5005/api/v1/`

### 1. Encrypt Data

- **Path:** `/encrypt`
- **Method:** `POST`
- **Description:** This endpoint encrypts the provided data using the specified encryption key.
- **Request Parameters:**
  - `id` (string): The unique identifier for storing the data.
  - `encryption_key` (string): The key used to encrypt the data.
  - `value` (any JSON type): The data to be encrypted.
- **Response:**
  - `201 OK`: Data encrypted successfully.
  - `400 Bad Request`: Invalid request parameters.
  - `500 Internal Server Error`: Server error during encryption.
- **Sample Request:**

  ```json
  {
    "id": "12345",
    "encryption_key": "<your-encryption-key>",
    "value": "Sample data to encrypt"
  }
  ```
- **Sample Response:**

  ```json
  {
    "success": true
  }
  ```
### 1. Decrypt Data

- **Path:** `/decrypt`
- **Method:** `POST`
- **Description:** TThis endpoint decrypts the provided data using the specified decryption key.
- **Request Parameters:**
  - `id` (string): The unique identifier for storing the data.
  - `decryption_key` (string): The key used to decrypt the data.
- **Response:**
  - `201 OK`: Data encrypted successfully.
  - `400 Bad Request`: Invalid request parameters.
  - `401 Unauthorized`: Incorrect decryption key.
  - `500 Internal Server Error`: Server error during encryption.
- **Sample Request:**

  ```json
  {
    "id": "12345",
    "decryption_key": "<your-encryption-key>",
  }
  ```
- **Sample Response:**

  ```json
  [
    {
        "id": "12345",
        "decryptedValue": "<decrypted-value>"
    }
  ]
  ```

## Examples
Get encryption key

```bash
curl --location 'localhost:5005/api/v1/encryption-key' \
--header 'Content-Type: application/json' \
--data '{}'
```

Store encrypted value
```bash
curl --location 'localhost:5005/api/v1/encrypt' \
--header 'Content-Type: application/json' \
--data '{
    "id": "test-1",
    "encryption_key": "n4bQgYhMfWWaL+qgxVrQFaO/TxsrC4Is",
    "value": "value I want to encrypt"
}'
```

Get decrypted value
```bash
curl --location 'localhost:5005/api/v1/decrypt' \
--header 'Content-Type: application/json' \
--data '{
    "id": "test-1",
    "decryption_key": "n4bQgYhMfWWaL+qgxVrQFaO/TxsrC4Is"
}'
```
