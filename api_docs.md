# API DOCS COINS SERVER

## Endpoints

List of available endpoints

- `POST /register`
- `POST /login`
- `GET /coins`
- `GET /mycoins`
- `POST /mycoins`
- `POST /midtrans-token`

### GET /register

description

> create new user in database

### Request

- body

```json
{
    "username": string,
    "email": string,
    "password": string
}
```

### Response

- body

_201 - created_

```json
{
    "id": number,
    "email": string
}
```

_400 - bad request_

```json
{
    "message": "Username required"
}
OR
{
    "message": "Username already taken"
}
OR
{
    "message": "Email required"
}
OR
{
    "message": "Email has been registered"
}
OR
{
    "message": "Invalid email format"
}
OR
{
    "message": "Password required"
}
```

### GET /login

description

> login to user account and get access_token

### Request

- body

```json
{
    "email": string,
    "password": string
}
```

### Response

- body

_200 - ok_

```json
{
    "username": string,
    "access_token": string
}
```

_400 - bad request_

```json

{
    "message": "Email required"
}
OR
{
    "message": "Password required"
}
```

_401 - unauthorize_

```json
{
  "message": "Invalid Email / Password"
}
```

### GET /coins

description

> Get all assets coin

### Response

_200 - ok_

- body

```js
[
    {
        "id": "bitcoin",
        "rank": "1",
        "symbol": "BTC",
        "name": "Bitcoin",
        "supply": "19489912.0000000000000000",
        "maxSupply": "21000000.0000000000000000",
        "marketCapUsd": "527009987153.5512035275429072",
        "volumeUsd24Hr": "4494361678.9572249919102495",
        "priceUsd": "27040.1419541325380806",
        "changePercent24Hr": "2.31",
        "vwap24Hr": "26847.1031101828176593",
        "explorer": "https://blockchain.info/",
        "icon": "https://assets.coincap.io/assets/icons/btc@2x.png",
        "priceIdr": 419338521
    },
    ...
]
```

### GET /mycoins

description

> Get all mycoins from database

### Request

- headers

```json
{
    "access_token": string
}
```

### Response

_200 - ok_

- body

```js
[
    {
        "id": 9,
        "UserId": 1,
        "name": "Tether",
        "symbol": "USDT",
        "quantity": 6.44870059,
        "price": 15507,
        "icon": "https://assets.coincap.io/assets/icons/usdt@2x.png",
        "createdAt": "2023-09-28T18:19:12.301Z",
        "updatedAt": "2023-09-28T18:19:12.301Z"
    },
    ...
]
```

### POST /mycoins

description

> create new MyCoin in database

### Request

- headers

```json
{
    "access_token": string
}
```

- body

```json
{
    "name": string,
    "symbol":string,
    "quantity":decimal,
    "price": number,
    "icon": string
}
```

### Response

_201 - created_

- body

```json
{
    "id":number,
    "name": string,
    "symbol":string,
    "quantity":decimal,
    "price": number,
    "icon": string,
    "createdAt":string,
    "updatedAt":string
}
```

### POST /midtrans-token

description

> Get midtrans token for payment

### Request

- headers

```json
{
    "access_token": string
}
```

- user

```json
{
    "username": string,
    "id": number,
    "email": string
}
```

### Response

_201 - created_

- body

```json
{
    "token": string,
    "redirect_url": string
}
```

_400 - bad request_

- body

```json
{
  "message": "transaction_details.gross_amount is required"
}
```

### Global Error

### Response

_500 - InternalServerError_

- Body

  ```json
  {
    "message": "internal server error"
  }
  ```

  _401 - Unauthorized_

- Body

```json
{
  "message": "Invalid Token"
}
```
