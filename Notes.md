1. Create Next app

2. Install NextAuth

3. Add a route handler for authentication (https://next-auth.js.org/configuration/initialization#route-handlers-app)

4. Set up Google API and add Google Provider to the route handler (https://next-auth.js.org/providers/google)

5. Set up MongoDB Adapter (https://authjs.dev/getting-started/adapters/mongodb)

6. Add "use client"; to convert a server component to a client component. It is a Next.js specific directve for client-side interactivity like hooks, event handlers or HTTP requests

7. {children} in RootLayout (layout.js) is fetched from page.js

8. Use getServerSession to fetch user details once logged in

## 9. Domain addition logic

**A. Frontend (React Form *[newDomainForm.js]* with axios.post):** 

<ul>
<li>The user enters a domain in a form and submits it.</li>
<li>The form's handleSubmit function sends a POST request to the /api/domains endpoint using axios.post, passing the domain name as data.</li>
</ul>

**B. Backend (Next.js API Route *[route.js]*):**

<ul>
<li>The API route receives the request, extracts the domain data, and connects to MongoDB using Mongoose.</li>
<li>It retrieves the authenticated user's session using NextAuth, ensuring the domain is linked to the user.</li>
<li>A new document with the domain and user’s email (as the owner) is created in the MongoDB collection.</li>
</ul>

**C. Database (Mongoose + MongoDB *[domain.js]*):**

<ul>
<li>Mongoose validates the domain format and creates a new entry in the database, storing the domain, owner, and other fields.</li>
<li>MongoDB saves the new document with additional metadata (e.g., timestamps).</li>
</ul>

**D. Response:**
The API returns a success response to the frontend, where the user is notified that the domain was successfully added.

This flow ensures data validation, session-based ownership, and a smooth user interaction with feedback.

10. No need for curly braces when importing default export. Use curly braces for a named export (there can be multiple exports in that file.)

11. use .toJSON() to convert a MongoDB component to a plain JS object

12. ... Spread Operator takes all key-value pairs from an object and spreads them as individual props on a component

13. "" doesn't support embedding variables directly (use concatenation). Backticks `` allow it.

14. useRouter() allows you to access the router object which contains various properties and methods related to routing in your Next.js application, such as the current pathname, query parameters, and methods for navigation.

15. Use sweetalerts (https://sweetalert2.github.io/) for popup messages

16. Using serpAPI instead of Puppeteer for scraping ranks/positions. In POST request for adding new keyword, make function call to do the google search using serpAPI and once it returns the search_id and position, create a document in the Result model.

17. Set up cron job (understand how google searches and saving operations are executed and handled concurrently)