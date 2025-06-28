# Uber Clone Backend API Documentation

## Overview

This is the backend RESTful API for an Uber-like ride-hailing application. The API provides endpoints for user and captain (driver) registration, authentication, ride management, geolocation services, and real-time communication via WebSockets. All endpoints are designed for integration with web and mobile clients.

- **Authentication:** JWT (via HTTP-only cookies or `Authorization` header)
- **Content-Type:** `application/json`
- **Error Handling:** Standardized JSON error responses

---

## Authentication & Authorization

- **Users** and **Captains** must authenticate to access protected endpoints.
- JWT tokens are issued on login and must be sent via HTTP-only cookies (`token`) or as a Bearer token in the `Authorization` header.
- Logout invalidates the token via a blacklist mechanism.

**Example Authorization Header:**

```
Authorization: Bearer <JWT_TOKEN>
```

---

## Error Handling

All error responses follow this structure:

```json
{
  "message": "Error description",
  "errors": [
    /* Optional: array of validation errors */
  ]
}
```

- Validation errors are returned with status `400`.
- Unauthorized access returns status `401`.
- Not found returns status `404`.
- Server errors return status `500`.

---

## Routes

### 1. User Routes

#### Register User

- **POST** `/users/register`
- **Description:** Register a new user.
- **Body Parameters:**
  - `fullname.firstname` (string, min 3) — e.g. `"John"`
  - `fullname.lastname` (string, min 3) — e.g. `"Doe"`
  - `email` (string, email) — e.g. `"john@example.com"`
  - `password` (string, min 8)
- **Request Example:**

```json
{
  "fullname": { "firstname": "John", "lastname": "Doe" },
  "email": "john@example.com",
  "password": "password123"
}
```

- **Response (201):**

```json
{
  "token": "<JWT_TOKEN>",
  "user": {
    "_id": "userObjectId",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@example.com",
    "socketId": "socketId"
  }
}
```

- **Errors:** 400 (validation), 400 (email exists)

---

#### Login User

- **POST** `/users/login`
- **Description:** Authenticate user and receive JWT.
- **Body Parameters:**
  - `email` (string, email)
  - `password` (string, min 8)
- **Request Example:**

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

- **Response (200):**

```json
{
  "token": "<JWT_TOKEN>",
  "user": {
    "_id": "userObjectId",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@example.com",
    "socketId": "socketId"
  }
}
```

- **Errors:** 400 (validation), 401 (invalid credentials)

---

#### Get User Profile

- **GET** `/users/profile`
- **Description:** Get authenticated user's profile.
- **Headers:** `Authorization` or cookie
- **Response (200):**

```json
{
  "_id": "userObjectId",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john@example.com",
  "socketId": "socketId"
}
```

- **Errors:** 401 (unauthorized)

---

#### Logout User

- **GET** `/users/logout`
- **Description:** Logout user and invalidate token.
- **Headers:** `Authorization` or cookie
- **Response (200):**

```json
{ "message": "Loggout Out" }
```

- **Errors:** 401 (unauthorized)

---

### 2. Captain (Driver) Routes

#### Register Captain

- **POST** `/captains/register`
- **Description:** Register a new captain (driver).
- **Body Parameters:**
  - `fullname.firstname` (string, min 3)
  - `fullname.lastname` (string, min 3)
  - `email` (string, email)
  - `password` (string, min 8)
  - `vehicle.color` (string, min 3)
  - `vehicle.plate` (string, length 10)
  - `vehicle.capacity` (int, min 1)
  - `vehicle.vehicleType` (string, one of: `"car"`, `"motorcycle"`, `"auto"`)
- **Request Example:**

```json
{
  "fullname": { "firstname": "Jane", "lastname": "Smith" },
  "email": "jane@captain.com",
  "password": "securepass123",
  "vehicle": {
    "color": "Red",
    "plate": "ABCD123456",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

- **Response (201):**

```json
{
  "token": "<JWT_TOKEN>",
  "captain": {
    "_id": "captainObjectId",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Smith"
    },
    "email": "jane@captain.com",
    "socketId": "socketId",
    "status": "active",
    "vehicle": {
      "color": "Red",
      "plate": "ABCD123456",
      "capacity": 4,
      "vehicleType": "car"
    },
    "location": {
      "ltd": 12.9716,
      "lng": 77.5946
    }
  }
}
```

- **Errors:** 400 (validation), 400 (email exists)

---

#### Login Captain

- **POST** `/captains/login`
- **Description:** Authenticate captain and receive JWT.
- **Body Parameters:**
  - `email` (string, email)
  - `password` (string, min 8)
- **Response (200):**

```json
{
  "token": "<JWT_TOKEN>",
  "captain": {
    "_id": "captainObjectId",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Smith"
    },
    "email": "jane@captain.com",
    "socketId": "socketId",
    "status": "active",
    "vehicle": {
      "color": "Red",
      "plate": "ABCD123456",
      "capacity": 4,
      "vehicleType": "car"
    },
    "location": {
      "ltd": 12.9716,
      "lng": 77.5946
    }
  }
}
```

- **Errors:** 400 (validation), 401 (invalid credentials)

---

#### Get Captain Profile

- **GET** `/captains/profile`
- **Description:** Get authenticated captain's profile.
- **Headers:** `Authorization` or cookie
- **Response (200):**

```json
{
  "_id": "captainObjectId",
  "fullname": {
    "firstname": "Jane",
    "lastname": "Smith"
  },
  "email": "jane@captain.com",
  "socketId": "socketId",
  "status": "active",
  "vehicle": {
    "color": "Red",
    "plate": "ABCD123456",
    "capacity": 4,
    "vehicleType": "car"
  },
  "location": {
    "ltd": 12.9716,
    "lng": 77.5946
  }
}
```

- **Errors:** 401 (unauthorized)

---

#### Logout Captain

- **GET** `/captains/logout`
- **Description:** Logout captain and invalidate token.
- **Headers:** `Authorization` or cookie
- **Response (200):**

```json
{ "message": "Loggout Out" }
```

- **Errors:** 401 (unauthorized)

---

### 3. Ride Routes

#### Create Ride

- **POST** `/ride/create`
- **Description:** Create a new ride request.
- **Headers:** Auth required (user)
- **Body Parameters:**
  - `pickup` (string, min 3)
  - `destination` (string, min 3)
  - `vehicleType` (string, one of: `"auto"`, `"car"`, `"motorcycle"`)
- **Request Example:**

```json
{
  "pickup": "123 Main St",
  "destination": "456 Elm St",
  "vehicleType": "car"
}
```

- **Response (201):**

```json
{
  "_id": "rideObjectId",
  "user": "userObjectId",
  "pickup": "123 Main St",
  "destination": "456 Elm St",
  "fare": 100,
  "status": "pending",
  "otp": "123456"
}
```

- **Errors:** 400 (validation), 500 (server)

---

#### Get Fare Estimate

- **GET** `/ride/get-fare`
- **Description:** Get fare estimate for a ride.
- **Headers:** Auth required (user)
- **Query Parameters:**
  - `pickup` (string, min 3)
  - `destination` (string, min 3)
- **Response (200):**

```json
{
  "auto": 50,
  "car": 100,
  "motorcycle": 30
}
```

- **Errors:** 400 (validation), 500 (server)

---

#### Confirm Ride

- **POST** `/ride/confirm`
- **Description:** Captain confirms a ride.
- **Headers:** Auth required (captain)
- **Body Parameters:**
  - `rideId` (string, MongoDB ObjectId)
- **Response (200):**

```json
{
  "_id": "rideObjectId",
  "user": {
    "_id": "userObjectId",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@example.com",
    "socketId": "socketId"
  },
  "captain": {
    "_id": "captainObjectId",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Smith"
    },
    "email": "jane@captain.com",
    "socketId": "socketId",
    "status": "active",
    "vehicle": {
      "color": "Red",
      "plate": "ABCD123456",
      "capacity": 4,
      "vehicleType": "car"
    },
    "location": {
      "ltd": 12.9716,
      "lng": 77.5946
    }
  },
  "pickup": "123 Main St",
  "destination": "456 Elm St",
  "fare": 100,
  "status": "accepted",
  "otp": "123456"
}
```

- **Errors:** 400 (validation), 500 (server)

---

#### Start Ride

- **GET** `/ride/start-ride`
- **Description:** Captain starts a ride using OTP.
- **Headers:** Auth required (captain)
- **Query Parameters:**
  - `otp` (string, length 6)
  - `rideId` (string, MongoDB ObjectId)
- **Response (200):**

```json
{
  "_id": "rideObjectId",
  "user": {
    "_id": "userObjectId",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@example.com",
    "socketId": "socketId"
  },
  "captain": {
    "_id": "captainObjectId",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Smith"
    },
    "email": "jane@captain.com",
    "socketId": "socketId",
    "status": "active",
    "vehicle": {
      "color": "Red",
      "plate": "ABCD123456",
      "capacity": 4,
      "vehicleType": "car"
    },
    "location": {
      "ltd": 12.9716,
      "lng": 77.5946
    }
  },
  "pickup": "123 Main St",
  "destination": "456 Elm St",
  "fare": 100,
  "status": "ongoing",
  "otp": "123456"
}
```

- **Errors:** 400 (validation), 500 (server)

---

#### End Ride

- **POST** `/ride/end-ride`
- **Description:** Captain ends a ride.
- **Headers:** Auth required (captain)
- **Body Parameters:**
  - `rideId` (string, MongoDB ObjectId)
- **Response (200):**

```json
{
  "_id": "rideObjectId",
  "user": {
    "_id": "userObjectId",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@example.com",
    "socketId": "socketId"
  },
  "captain": {
    "_id": "captainObjectId",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Smith"
    },
    "email": "jane@captain.com",
    "socketId": "socketId",
    "status": "active",
    "vehicle": {
      "color": "Red",
      "plate": "ABCD123456",
      "capacity": 4,
      "vehicleType": "car"
    },
    "location": {
      "ltd": 12.9716,
      "lng": 77.5946
    }
  },
  "pickup": "123 Main St",
  "destination": "456 Elm St",
  "fare": 100,
  "status": "ongoing",
  "otp": "123456"
}
```

- **Errors:** 400 (validation), 500 (server)

---

#### Cancel Ride

- **PATCH** `/ride/cancel-ride`
- **Description:** User cancels a ride.
- **Headers:** Auth required (user)
- **Body Parameters:**
  - `rideId` (string, MongoDB ObjectId)
- **Response (200):**

```json
{ "message": "Ride cancelled successfully" }
```

- **Errors:** 400 (validation), 500 (server)

---

### 4. Maps & Geolocation Routes

#### Get Coordinates

- **GET** `/maps/get-coordinates`
- **Description:** Get latitude and longitude for an address.
- **Headers:** Auth required (user)
- **Query Parameters:**
  - `address` (string, min 3)
- **Response (200):**

```json
{ "ltd": 12.9716, "lng": 77.5946 }
```

- **Errors:** 400 (validation), 404 (not found)

---

#### Get Distance & Time

- **GET** `/maps/get-distance-time`
- **Description:** Get distance and estimated time between two addresses.
- **Headers:** Auth required (user)
- **Query Parameters:**
  - `pickup` (string, min 3)
  - `destination` (string, min 3)
- **Response (200):**

```json
{
  "distance": { "text": "5 km", "value": 5000 },
  "duration": { "text": "10 mins", "value": 600 },
  "status": "OK"
}
```

- **Errors:** 400 (validation), 500 (server)

---

#### Get Address Suggestions

- **GET** `/maps/get-suggestions`
- **Description:** Get autocomplete suggestions for addresses.
- **Headers:** Auth required (user)
- **Query Parameters:**
  - `input` (string, min 3)
- **Response (200):**
  - Example `input` : `Stadium`

```json
[
  {
    "description": "Stadium Walk, Stadium MRT Station (CC6), Singapore",
    "matched_substrings": [
      {
        "length": 7,
        "offset": 14
      }
    ],
    "place_id": "ChIJt__YxmYZ2jERKih8lynJnUY",
    "reference": "ChIJt__YxmYZ2jERKih8lynJnUY",
    "structured_formatting": {
      "main_text": "Stadium MRT Station (CC6)",
      "main_text_matched_substrings": [
        {
          "length": 7,
          "offset": 0
        }
      ],
      "secondary_text": "Stadium Walk, Singapore"
    },
    "terms": [
      {
        "offset": 0,
        "value": "Stadium Walk"
      },
      {
        "offset": 14,
        "value": "Stadium MRT Station (CC6)"
      },
      {
        "offset": 41,
        "value": "Singapore"
      }
    ],
    "types": ["point_of_interest", "establishment"]
  },
  {
    "description": "Stadium Metro Station - Metro Station - Dubai - United Arab Emirates",
    "matched_substrings": [
      {
        "length": 7,
        "offset": 0
      }
    ],
    "place_id": "ChIJMQ2Cj7tdXz4R4uC9OWkqRDE",
    "reference": "ChIJMQ2Cj7tdXz4R4uC9OWkqRDE",
    "structured_formatting": {
      "main_text": "Stadium Metro Station",
      "main_text_matched_substrings": [
        {
          "length": 7,
          "offset": 0
        }
      ],
      "secondary_text": "Metro Station - Dubai - United Arab Emirates"
    },
    "terms": [
      {
        "offset": 0,
        "value": "Stadium Metro Station"
      },
      {
        "offset": 24,
        "value": "Metro Station"
      },
      {
        "offset": 40,
        "value": "Dubai"
      },
      {
        "offset": 48,
        "value": "United Arab Emirates"
      }
    ],
    "types": ["establishment", "point_of_interest"]
  },
  {
    "description": "Stadium Nasional Bukit Jalil, Jalan Barat, Bukit Jalil, Kuala Lumpur, Federal Territory of Kuala Lumpur, Malaysia",
    "matched_substrings": [
      {
        "length": 7,
        "offset": 0
      }
    ],
    "place_id": "ChIJRd6Qa5ZKzDERpnaQSpbCpDk",
    "reference": "ChIJRd6Qa5ZKzDERpnaQSpbCpDk",
    "structured_formatting": {
      "main_text": "Stadium Nasional Bukit Jalil",
      "main_text_matched_substrings": [
        {
          "length": 7,
          "offset": 0
        }
      ],
      "secondary_text": "Jalan Barat, Bukit Jalil, Kuala Lumpur, Federal Territory of Kuala Lumpur, Malaysia"
    },
    "terms": [
      {
        "offset": 0,
        "value": "Stadium Nasional Bukit Jalil"
      },
      {
        "offset": 30,
        "value": "Jalan Barat"
      },
      {
        "offset": 43,
        "value": "Bukit Jalil"
      },
      {
        "offset": 56,
        "value": "Kuala Lumpur"
      },
      {
        "offset": 70,
        "value": "Federal Territory of Kuala Lumpur"
      },
      {
        "offset": 105,
        "value": "Malaysia"
      }
    ],
    "types": ["stadium", "establishment", "point_of_interest"]
  },
  {
    "description": "Stadium Gelora Bung Karno, Jalan Pintu Satu Senayan, Gelora, Central Jakarta City, Jakarta, Indonesia",
    "matched_substrings": [
      {
        "length": 7,
        "offset": 0
      }
    ],
    "place_id": "ChIJd0b0EWvxaS4R8Hb9SpKttuA",
    "reference": "ChIJd0b0EWvxaS4R8Hb9SpKttuA",
    "structured_formatting": {
      "main_text": "Stadium Gelora Bung Karno",
      "main_text_matched_substrings": [
        {
          "length": 7,
          "offset": 0
        }
      ],
      "secondary_text": "Jalan Pintu Satu Senayan, Gelora, Central Jakarta City, Jakarta, Indonesia"
    },
    "terms": [
      {
        "offset": 0,
        "value": "Stadium Gelora Bung Karno"
      },
      {
        "offset": 27,
        "value": "Jalan Pintu Satu Senayan"
      },
      {
        "offset": 53,
        "value": "Gelora"
      },
      {
        "offset": 61,
        "value": "Central Jakarta City"
      },
      {
        "offset": 83,
        "value": "Jakarta"
      },
      {
        "offset": 92,
        "value": "Indonesia"
      }
    ],
    "types": ["point_of_interest", "establishment", "stadium"]
  },
  {
    "description": "Stadium One, Chulalongkorn 4 Alley, Wang Mai, Pathum Wan, Bangkok, Thailand",
    "matched_substrings": [
      {
        "length": 7,
        "offset": 0
      }
    ],
    "place_id": "ChIJO-6r_S2Z4jARqNKJI5snTok",
    "reference": "ChIJO-6r_S2Z4jARqNKJI5snTok",
    "structured_formatting": {
      "main_text": "Stadium One",
      "main_text_matched_substrings": [
        {
          "length": 7,
          "offset": 0
        }
      ],
      "secondary_text": "Chulalongkorn 4 Alley, Wang Mai, Pathum Wan, Bangkok, Thailand"
    },
    "terms": [
      {
        "offset": 0,
        "value": "Stadium One"
      },
      {
        "offset": 13,
        "value": "Chulalongkorn 4 Alley"
      },
      {
        "offset": 36,
        "value": "Wang Mai"
      },
      {
        "offset": 46,
        "value": "Pathum Wan"
      },
      {
        "offset": 58,
        "value": "Bangkok"
      },
      {
        "offset": 67,
        "value": "Thailand"
      }
    ],
    "types": ["shopping_mall", "point_of_interest", "establishment"]
  }
]
```

- **Errors:** 400 (validation), 500 (server)

---

## WebSocket Events

- Real-time ride notifications are sent to users and captains via Socket.IO.
- Clients must join with their userId and userType to receive events.

---

## Status Codes

- `200 OK` — Successful GET/POST/PATCH
- `201 Created` — Resource created
- `400 Bad Request` — Validation or input error
- `401 Unauthorized` — Authentication required or failed
- `404 Not Found` — Resource not found
- `500 Internal Server Error` — Unexpected server error

---

## Notes

- All endpoints expect and return JSON.
- JWT tokens expire after 1 day.
- No explicit API versioning or rate limiting is implemented.
- For production, ensure HTTPS and secure cookie settings.

---

## Example Error Response

```json
{
  "message": "Invalid email or password"
}
```
