+---------------------------------------------------+
|              Backend Express Server              |
+---------------------------------------------------+
        |
        v
+------------------+         +-----------------------+
| Middleware Setup |         | Database Connection   |
| - express.json() |         | connectDB()           |
| - cookieParser() |         +-----------------------+
| - cors()         |
| - bodyParser     |
+------------------+

        Middleware Details:
        -----------------------------------------------------------
        - express.json({ limit: '10mb' }): Handles JSON payloads
        - cookieParser(): Parses cookies for request handling
        - cors(): Enables Cross-Origin Resource Sharing
          * Origin: http://localhost:5173
          * Methods: GET, POST, PUT, DELETE, OPTIONS
          * Credentials: true
        -----------------------------------------------------------

        |
        v
+---------------------+         +-----------------------+
| Environment Config  |         | Routes Setup          |
| dotenv.config()     |         | /api/auth             |
+---------------------+         | - authRoute           |
                                | /api/message          |
                                | - messageRoute        |
                                +-----------------------+

        |
        v
+--------------------------+            +-----------------------------+
| Home Route "/"           |            | Socket.io Integration       |
| GET Request              |            | - import io, server, app    |
| Responds with "Hello"    |            | - Handles real-time events  |
+--------------------------+            +-----------------------------+

        |
        v
+-----------------------------+
| Server Start               |
| app.listen(port)           |
| Logs: Listening on port... |
+-----------------------------+
