# Guns and Suppressors API

## Public Render URL
https://crud-api-nseo.onrender.com


## Endpoints

### Guns
1. **GET** `/guns`
   - Get all guns.
   - **Response**: `200 OK` - Array of guns.

2. **GET** `/guns/:id`
   - Get a gun by ID.
   - **Response**: `200 OK` - Gun object, or `404 Not Found`.

3. **POST** `/guns`
   - Create a new gun.
   - **Request Body**:
     - `model` (string, required)
     - `caliber` (string, required)
     - `magazineCapacity` (integer, required)
     - `weight` (string, required)
     - `barrelLength` (string, required)
     - `sights` (string, required)
     - `action` (string, required)
   - **Response**: `201 Created`, or `400 Bad Request`.

4. **PUT** `/guns/:id`
   - Update a gun by ID.
   - **Request Body**: Same as POST.
   - **Response**: `200 OK`, or `404 Not Found`.

5. **DELETE** `/guns/:id`
   - Delete a gun by ID.
   - **Response**: `200 OK`, or `404 Not Found`.

### Suppressors
1. **GET** `/suppressors`
   - Get all suppressors.
   - **Response**: `200 OK` - Array of suppressors.

2. **GET** `/suppressors/:id`
   - Get a suppressor by ID.
   - **Response**: `200 OK` - Suppressor object, or `404 Not Found`.

3. **POST** `/suppressors`
   - Create a new suppressor.
   - **Request Body**:
     - `name` (string, required)
     - `caliber` (string, required)
     - `weight_oz` (number, required)
     - `material` (string, required)
   - **Response**: `201 Created`, or `400 Bad Request`.

4. **PUT** `/suppressors/:id`
   - Update a suppressor by ID.
   - **Request Body**: Same as POST.
   - **Response**: `200 OK`, or `404 Not Found`.

5. **DELETE** `/suppressors/:id`
   - Delete a suppressor by ID.
   - **Response**: `200 OK`, or `404 Not Found`.

## Common Error Responses
- **400 Bad Request**: Invalid input.
- **404 Not Found**: Resource not found.
- **500 Internal Server Error**: Unexpected error.

