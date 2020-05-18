const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json", { foreignKeySuffix: "_id" });
const middlewares = jsonServer.defaults();

server.use(middlewares);
// server.use("/v1", router);

server.use(
  jsonServer.rewriter({
    "/applications": "/applications_without_flows",
    "/applications/:id": "/applications/:id?_expand=flag",
  })
);
server.use(router);

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`JSON Server is running on :${port}`);
});
