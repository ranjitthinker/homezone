# API Service Documentation

This project includes a common axios instance with interceptors for handling API requests, similar to Angular's HTTP interceptors.

## Setup

1. **Install Dependencies**
   ```bash
   npm install axios
   ```

2. **Environment Configuration**
   Copy `.env.example` to `.env.local` and update the API base URL:
   ```bash
   cp .env.example .env.local
   ```
   
   Update the values in `.env.local`:
   ```
   NEXT_PUBLIC_API_BASE_URL=http://your-api-server.com/api
   ```

## Files Structure

```
src/
├── utilis/
│   └── axios.js           # Main axios instance with interceptors
├── services/
│   └── api.js            # API service methods
└── utils/
    └── apiExample.js     # Usage examples
```

## Features

### Request Interceptor
- Automatically adds authorization token from localStorage
- Logs request details for debugging
- Adds request timestamps

### Response Interceptor
- Logs response details and duration
- Handles common HTTP errors (401, 403, 500)
- Redirects to login on unauthorized access
- Handles network errors gracefully

### API Service Methods
- `get(url, config)` - GET requests
- `post(url, data, config)` - POST requests
- `put(url, data, config)` - PUT requests
- `patch(url, data, config)` - PATCH requests
- `delete(url, config)` - DELETE requests
- `upload(url, formData, config)` - File uploads
- `download(url, config)` - File downloads

## Usage Examples

### Basic Usage
```javascript
import apiService from '../utilis/axios';

// GET request
const response = await apiService.get('/users');


// POST request
const newUser = await apiService.post('/users', { name: 'John', email: 'john@example.com' });
```

### Using the Service Layer
```javascript
import { propertyApi } from '../services/api';

// Get properties with filters
const properties = await propertyApi.getProperties({
  page: 1,
  limit: 10,
  type: 'apartment'
});

// Create new property
const newProperty = await propertyApi.createItem(propertyData);
```

### Error Handling
```javascript
try {
  const response = await apiService.get('/data');
  // Handle success
} catch (error) {
  if (error.response?.status === 401) {
    // Redirect to login (handled automatically by interceptor)
  } else if (error.response?.status >= 500) {
    // Show server error message
  } else {
    // Handle other errors
  }
}
```

### File Upload
```javascript
import apiService from '../utilis/axios';

const formData = new FormData();
formData.append('file', fileInput.files[0]);

try {
  const response = await apiService.upload('/upload', formData);
  
} catch (error) {
  
}
```

## Authentication

The interceptor automatically adds the Authorization header when a token is found in localStorage:

```javascript
// Set token (typically after login)
localStorage.setItem('authToken', 'your-jwt-token');

// Token will be automatically included in subsequent requests
```

## Environment Variables

- `NEXT_PUBLIC_API_BASE_URL` - Base URL for all API requests
- `NODE_ENV` - Current environment (development/production)

## Error Handling

The interceptors handle common scenarios:

- **401 Unauthorized**: Clears token and redirects to login
- **403 Forbidden**: Logs access denied
- **500+ Server Errors**: Logs server errors
- **Network Errors**: Shows connection error messages

All errors are logged to the console for debugging purposes.

## Customization

You can customize the axios instance by modifying `src/utilis/axios.js`:

- Change default headers
- Modify request/response interceptors
- Add custom error handling
- Adjust timeout settings

## Best Practices

1. Use the service layer (`src/services/api.js`) for API methods
2. Handle errors in try-catch blocks
3. Store tokens securely (consider using httpOnly cookies for production)
4. Use environment variables for configuration
5. Implement proper loading states and error messages in UI
