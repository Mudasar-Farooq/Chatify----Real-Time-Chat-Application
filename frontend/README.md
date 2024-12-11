<!-- +---------------------------------------------------+
|                      React App                    |
+---------------------------------------------------+
        |
        v
+----------------+       +--------------------+
| useEffect Hook |       | useAuthStore Hooks |
|  (Checkauth)   |       |  - authUser        |
|                |       |  - Checkauth       |
+----------------+       |  - isCheckingauth  |
                         +--------------------+
        |
        v
+----------------------+           +------------------------------------------+
| Authentication Check |----(if)--> [ Loader (while checking auth) ]          |
| - isCheckingauth     |           +------------------------------------------+
| - authUser           |----(else)--> Routes & Pages Rendering
+----------------------+

        Rendering Components Based on Routes:
        -----------------------------------------------------------
        +------------------+--------------------------------------+
        | Route Path       | Rendered Component                  |
        +------------------+--------------------------------------+
        | "/"              | HomePage (if authUser)              |
        |                  | Navigate to /login (if not authUser)|
        +------------------+--------------------------------------+
        | "/signup"        | SignupPage (if not authUser)        |
        |                  | Navigate to / (if authUser)         |
        +------------------+--------------------------------------+
        | "/login"         | LoginPage (if not authUser)         |
        |                  | Navigate to / (if authUser)         |
        +------------------+--------------------------------------+
        | "/settings"      | SettingsPage (accessible always)    |
        +------------------+--------------------------------------+
        | "/profile"       | ProfilePage (if authUser)           |
        |                  | Navigate to /login (if not authUser)|
        +------------------+--------------------------------------+

+----------------------------+----------------------------------------------+
| Navbar                     | Appears on all pages                        |
+----------------------------+----------------------------------------------+
| Toaster                    | Handles notifications and alerts            |
+----------------------------+----------------------------------------------+
| Theme Management           | Dynamic background inversion based on theme |
| (useThemestore Hook)       |                                              |
+----------------------------+----------------------------------------------+ -->
