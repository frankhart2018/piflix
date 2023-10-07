import express from "express";
import cors from "cors";

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
const app = express();
app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send({
    status: "Hello world",
  });
});

app.listen(process.env.PORT || 4000);
