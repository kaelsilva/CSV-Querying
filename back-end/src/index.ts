import app from "./app";

const port = process.env.PORT;

app.listen(port || 3333, () => {
  console.log(
    `⚡️[server]: Server is running at http://localhost:${port || 3333}`
  );
});
