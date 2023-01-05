import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import bodyParser from 'body-parser';

const PORT = process.env.PORT || 3001;
const baseUrl = "https://api.workflow-sap.cfapps.us10.hana.ondemand.com/workflow-service/rest/";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
}));


app.get("/task-instances", async (req, res) => {
  const response = await fetch(`${baseUrl}v1/task-instances`, {
    method: "GET",
    headers: {
      Authorization: req.headers.authorization,
    }
  }).then(async function (resp) {
    let data = await resp.json();
    return {
      success: true,
      data: data,
      message: 'Successful',
    };
  }).catch(function (err) {
    console.log("get request error", err);
    return {
      success: false,
      data: [],
      error: err,
    };
  });
  res.send(response);
});

app.post("/workflow-instances", async (req, res) => {
  console.log('req body----->', req.body, req.body.managerId);
  const response = await fetch(`${baseUrl}v1/workflow-instances`, {
    method: "POST",
    body: JSON.stringify(req.body),
    headers: {
      Authorization: req.headers.authorization,
      'Content-Type': 'application/json',
    }
  }).then(async function (resp) {
    let data = await resp.json();
    return {
      success: true,
      data: [].concat(data),
      message: 'Successful',
    };
  }).catch(function (err) {
    console.log("post req error", err);
    return {
      success: false,
      data: [],
      error: err,
    };
  });
  res.send(response);
});

app.patch("/task-instances", async (req, res) => {
  const response = await fetch(`${baseUrl}v1/task-instances/${req.body.taskInstanceId}`, {
    method: "PATCH",
    body: JSON.stringify(req.body),
    headers: {
      Authorization: req.headers.authorization,
      'Content-Type': 'application/json',
    }
  }).then(async function (resp) {
    let data = await resp.json();
    return {
      success: true,
      data: [].concat(data),
      message: 'Successful',
    };
  }).catch(function (err) {
    console.log("post req error", err);
    return {
      success: false,
      data: [],
      error: err,
    };
  });
  res.send(response);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});