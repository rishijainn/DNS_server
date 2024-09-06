Custom DNS Server

Base URL: https://dns-server-7.onrender.com

This is a backend-only project for a custom DNS server with no user interface (UI). To interact with the API, you can use tools like Postman.

FEATURES:

1) User Authentication: Supports user signup, login, and authorization using JWT tokens.
2) DNS Record Resolution: Automatically resolves domain names and stores IP addresses with caching support for faster responses.
3) DNS Record Types: Supports resolving A and CNAME records.
4) Admin Access: Allows admins to update DNS entries.
5) Database: MongoDB stores domain records, including cached IP addresses.
   
Endpoints

1) User Authentication
POST /user/signup

2) Register a new user.
POST /user/login
Login and receive a token for authentication.

3) DNS Record Handling
GET /custom/get/:domain/:record
Fetch the DNS record (A or CNAME) for a specific domain.
Example: /custom/get/www.example.com/A

4) PATCH /custom/update/:id
Update an existing DNS entry (admin access required).

Setup
Clone the repository.
Install dependencies with npm install.
Use Postman or any API testing tool to interact with the backend endpoints.
Testing
To test the API:

Authentication: First, log in with a valid user account to receive a token.
Authorization: Include the token in the Authorization header or as a cookie for subsequent requests.
DNS Record Retrieval: Use the /get endpoint to resolve domain names.
Admin Actions: Admins can update DNS entries using the /update endpoint.
