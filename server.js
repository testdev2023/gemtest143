const express = require("express");
const next = require("next");
const basicAuth = require("express-basic-auth");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const port = process.env.PORT || 3000;

app.prepare().then(() => {
  const server = express();

  // Define your username and password combinations
  const users = { sidattd: "ent1481947" };

  // Apply basic authentication middleware
  server.use(
    basicAuth({
      users,
      challenge: true,
      realm: "Restricted Area",
    })
  );

  // Route handling for Next.js app
  server.all("*", (req, res) => {
    return handle(req, res);
  });

  // Start the server
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
