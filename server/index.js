import express from "express";

const port = 5000;
var app = express();

const run = async () => {
  app.get('/hello', async (req, res) => {
    res.send("<b>Hello world!</b>");
  })
  app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
  })
}

run().catch(console.dir);
process.stdin.resume();
process.on('SIGINT', async () => {
  console.log("Exiting process");
  process.exit(0);
});