import express from "express";
import path from "path";
const app = express();
// import argon2 from "argon2";
// import bcrypt from "bcrypt";
// import fs from "fs";
// import { Canvas } from 'skia-canvas';
// import pathToFfmpeg from 'ffmpeg-static';
// import { spawn } from 'child_process';
// import ort from 'onnxruntime-node';
// import winkNLP from 'wink-nlp';
// import model from 'wink-eng-lite-web-model';
// import tf from '@tensorflow/tfjs-node';
import puppeteer from 'puppeteer';
// import { chromium } from 'playwright';
// import playwright from 'playwright-core';


// 添加日志中间件
app.use((req, res, next) => {
  console.log("request [express 路由匹配测试，进入中间件]", req.url);
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// 添加根路由处理
app.get("/", (req, res) => {
  res.json({ message: "Express [express 路由匹配测试] root path" });
});

app.get("/users/:id/:sdasdadad", (req, res) => {
  const params = req.params.id;
  res.json({
    id: req.params.id,
    sdasdadad: req.params.sdasdadad,
    title: "Test Users API[express 路由匹配测试]",
  });
});

app.post("/post-body", (req, res) => {
  res.json({ message: "Express [express 路由匹配测试] post-body:" + JSON.stringify(req.body) });
});

app.get("/context", (req, res) => {
  res.json({ message: "Express [express 路由匹配测试] context:" + JSON.stringify(req.context) });
})

// app.get('/argon2', async (req, res) => {
//   // 注意, 如果顶层使用了import这里就不能用require
//   // 如果这里用require的方式, 顶层就不能用import
//   //const argon2 = require('argon2');
//   const password = 'myPassword123';
  
//   const hash = await argon2.hash(password);
//   res.json({ result : hash });
// });


// app.get('/bcrypt', async (req, res) => {
//   // https://www.npmjs.com/package/bcrypt
//   const saltRounds = 10;
//   const myPlaintextPassword = 's0/\/\P4$$w0rD';
//   const hash = await bcrypt.hash(myPlaintextPassword, saltRounds);
//   res.json({ result : hash });
// });

// app.get('/scrypt', async (req, res) => {
//   const scrypt = require("scrypt");
//   const key = new Buffer("");
//   const result = scrypt.hashSync(key,{"N":16,"r":1,"p":1},64,"").toString("hex");
//   console.log(result);
//   res.json({ result : result });
// });

app.get('/sqlite3', async (req, res) => {
  const sqlite3 = require('sqlite3').verbose();
  const db = new sqlite3.Database(':memory:');

  db.serialize(() => {
    db.run("CREATE TABLE lorem (info TEXT)");

    const stmt = db.prepare("INSERT INTO lorem VALUES (?)");
    for (let i = 0; i < 2; i++) {
      stmt.run("Ipsum " + i);
    }
    stmt.finalize();

    db.each("SELECT rowid AS id, info FROM lorem", (err, row) => {
      console.log(row.id + ": " + row.info);
    });

    res.json({ result : "ok" });

  });

  db.close();

});

app.get('/better-sqlite3', async (req, res) => {

  const Database = require('better-sqlite3');
  const db = new Database('my_database.db');
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL
    );
  `);
  // Insert data into the table
  const insert = db.prepare('INSERT INTO users (name, email) VALUES (?, ?)');
  insert.run('Alice', 'alice@example.com');
  insert.run('Bob', 'bob@example.com');
  console.log('Data inserted into "users" table.');
  // Query data from the table
  const selectAll = db.prepare('SELECT * FROM users');
  const users = selectAll.all();
  console.log('All users:');
  console.log(users);
  res.json({ result : "ok" });

});

// app.get('/pg-native', async (req, res) => {

//   const Client = require('pg-native')
//   const config = {
//     user: 'admin',
//     password: 'Admin1111#',
//     host: 'gz-postgres-j5ppvt2b.sql.tencentcdb.com',
//     port: 26227,
//     database: 'test1'
//   };
//   const client = new Client();
//   client.connectSync(`postgresql://${config.user}:${config.password}@${config.host}:${config.port}/${config.database}`);
//   console.log(client);
//   res.json({ result : "ok" });

// });

// app.get('/skia-canvas', async (req, res) => {

//   const { Canvas, Image } = require('skia-canvas');
//   const canvas = new Canvas(300, 200);
//   const ctx = canvas.getContext('2d');
//   ctx.fillStyle = 'blue';
//   ctx.fillRect(10, 10, 100, 100);

//   try {
//     const buffer = await canvas.toBuffer('png');
//     res.set('Content-Type', 'image/png');
//     res.send(buffer);
//   } catch (error) {
//     console.error('Error generating image:', error);
//     res.status(500).send('Error generating image');
//   }

// });

// 测试失败
// app.get('/opencv', async (req, res) => {
//
//   const cv = require('@u4/opencv4nodejs');
//   try {
//     const img = await cv.imreadAsync('./faceimg.jpg');
//     const grayImg = await img.bgrToGrayAsync();
//     console.log(grayImg);
//     res.send('ok');
//   } catch (err) {
//     console.error(err);
//   }
//
// });

// app.get('/ffmpeg-static', async (req, res) => {

//   const pathToFfmpeg = require('ffmpeg-static');
//   const { spawn } = require('child_process');

//   // Define input and output file paths
//   const inputFile = 'input.mp3'; // Replace with your input audio file
//   const outputFile = 'output.wav'; // Desired output file

//   // FFmpeg command arguments
//   const ffmpegArgs = [
//     '-i', inputFile,
//     outputFile
//   ];
//   console.log('path', pathToFfmpeg);

//   // Spawn the FFmpeg process
//   const ffmpegProcess = spawn(pathToFfmpeg, ['-version']);
//   console.log(ffmpegProcess.stdout);

//   ffmpegProcess.on('close', (code) => {
//     if (code === 0) {
//       console.log(`FFmpeg process exited successfully. `);
//     } else {
//       console.error(`FFmpeg process exited with error code ${code}`);
//     }
//     res.send('done');
//   });

//   ffmpegProcess.on('error', (err) => {
//     console.error(err.stack);
//     console.error(`Failed to start FFmpeg process: ${err}`);
//   });

// });


// app.get('/onnxruntime', async (req, res) => {
//   const ort = require('onnxruntime-node');

//   // use an async context to call onnxruntime functions.
//   async function main() {
//     try {
//       // create a new session and load the specific model.
//       //
//       // the model in this example contains a single MatMul node
//       // it has 2 inputs: 'a'(float32, 3x4) and 'b'(float32, 4x3)
//       // it has 1 output: 'c'(float32, 3x3)
//       // todo 模型来源 https://github.com/microsoft/onnxruntime-inference-examples/blob/main/js/quick-start_onnxruntime-node/model.onnx
//       const modelPath = '/Users/linktang/Downloads/model.onnx'
//       const session = await ort.InferenceSession.create(modelPath);

//       // prepare inputs. a tensor need its corresponding TypedArray as data
//       const dataA = Float32Array.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
//       const dataB = Float32Array.from([10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120]);
//       const tensorA = new ort.Tensor('float32', dataA, [3, 4]);
//       const tensorB = new ort.Tensor('float32', dataB, [4, 3]);

//       // prepare feeds. use model input names as keys.
//       const feeds = { a: tensorA, b: tensorB };

//       // feed inputs and run
//       const results = await session.run(feeds);

//       // read from results
//       const dataC = results.c.data;
//       console.log(`data of result tensor 'c': ${dataC}`);

//       await session.release()
//     } catch (e) {
//       console.error(`failed to inference ONNX model: ${e}.`);
//     }
//   }

//   main();
//   res.send('ok');

// });

// app.get('/winknlp', async (req, res) => {
//   const winkNLP = require('wink-nlp');
//   const model = require( 'wink-eng-lite-web-model' );
//   const nlp = winkNLP( model );
//   // Obtain "its" helper to extract item properties.
//   const its = nlp.its;
//   // Obtain "as" reducer helper to reduce a collection.
//   const as = nlp.as;
//   const text = 'Hello   World🌎! How are you?';
//   const doc = nlp.readDoc( text );
//   console.log( doc.tokens().out() );

//   res.send('ok');

// });


// app.get('/tensorflow', async (req, res) => {
//   // 只支持cpu版本
//   const tf = require('@tensorflow/tfjs-node');
//   async function runDemo() {
//     // Create a 2x2 tensor
//     const a = tf.tensor2d([[1, 2], [3, 4]]);
//     console.log('Tensor a:');
//     a.print();

//     // Create another 2x2 tensor
//     const b = tf.tensor2d([[5, 6], [7, 8]]);
//     console.log('Tensor b:');
//     b.print();

//     // Perform matrix multiplication
//     const result = tf.matMul(a, b);
//     console.log('Result of matrix multiplication (a * b):');
//     result.print();

//     // Perform element-wise addition
//     const sum = tf.add(a, b);
//     console.log('Result of element-wise addition (a + b):');
//     sum.print();
//   }

//   await runDemo();

//   res.send('ok');

// });

app.get('/puppeteer', async (req, res) => {
  const puppeteer = require('puppeteer');
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://baidu.com');
  await page.screenshot({ path: './screen.png' });
  await browser.close(); // Close the browser
  res.send('ok');

});

// todo 测试失败
// app.get('/playwright', async (req, res) => {
//   const { chromium } = require('playwright');
//   const browser = await chromium.launch({ headless: true });
//   const page = await browser.newPage();
//   await page.goto('https://baidu.com');
//   await page.screenshot({ path: './screen.png' });
//   await browser.close();
//   res.send('ok');

// });

// app.get('/chrome-aws-lambda', async (req, res) => {
//   const chromium = require('chrome-aws-lambda');
//   const browser = await chromium.puppeteer.launch({ headless: true });
//   const page = await browser.newPage();
//   await page.goto('https://baidu.com');
//   await page.screenshot({ path: './screen.png' });
//   await browser.close();
//   res.send('ok');

// });

// app.get('/sharp', async (req, res) => {
//   const sharp = require('sharp');
//   const semiTransparentRedPng = await sharp({
//     create: {
//       width: 48,
//       height: 48,
//       channels: 4,
//       background: { r: 255, g: 0, b: 0, alpha: 0.5 }
//     }
//   })
//     .png()
//     .toBuffer();
//   console.log(semiTransparentRedPng);

//   res.send('ok');

// });

// todo 测试失败
// app.get('/chrome-aws-lambda-playwright', async (req, res) => {
//   const chromium = require('chrome-aws-lambda');
//   const playwright = require('playwright-core');
//   const browser = await playwright.chromium.launch({ headless: true });
//   const page = await browser.newPage();
//   await page.goto('https://baidu.com');
//   await page.screenshot({ path: './screen.png' });
//   await browser.close();
//   res.send('ok');

// });

// todo 测试失败
// app.get('/pdf2html', async (req, res) => {
//   const pdf2html = require('pdf2html');
//   const text = await pdf2html.text('/Users/linktang/Downloads/test1.pdf');
//   console.log(text);
//
//   res.send('ok');
//
// });


// 导出处理函数
export default app;
