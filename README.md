!!WELCOME!!

In order to run the app, follow these three instructions.

1. Install Dependencies:

Open a terminal or command prompt in the project's root directory (where the package.json file is located).
Run "npm install" to install all the project's dependencies, including Express for the proxy server.


2. Start the Proxy Server

In the same terminal, run "node server.js".
This will start the proxy server listening on port 3001.

3. Start the React App

Open a new terminal window in the same project directory.
Run npm start to start the React development server.
The React app will typically open in your web browser at http://localhost:3000.


P.S. I have left the API key in the app the dev doing the review doesn't have to mess with that, will be removed on 01.06.2024. 



____________________________________________________________________

For ease of understanding the flow, here is a general overview:

- Main.tsx is the file where all components come together, also a place where routing happens
- AppDataFetch.tsx contains methods for retrieving the data, used a centralized place for getting the data
- AppContext.tsx contains centralized place for state management
- Data goes to the Main.tsx where api calls are made, from which state gets passed to the Move/Show List
- Each of two components is made to be clickable so that redirect to the details page would be possible
- With useParams id is passed to the Movie/Show component so that data can be fetched again showing us all of the need details
- useNAvigate  is used for nagivation back to the / main page
