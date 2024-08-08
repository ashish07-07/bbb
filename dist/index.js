"use strict";
// import express from "express";
// import multer from "multer";
// import path from "path";
// import fs from "fs";
// const app = express();
// import csv from "csv-parser";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { Request, Response } from "express";
// app.use(express.json());
// const upload = multer({ dest: path.join(__dirname, "uploads") });
// app.post(
//   "/uploads",
//   upload.single("file"),
//   function (req: Request, res: Response) {
//     if (!req.file) {
//       return res.status(401).send("No file uploaded");
//     }
//     console.log(req.file);
//     const results: any[] = [];
//     const filePath = path.resolve(__dirname, "uploads", req.file.filename);
//     console.log(filePath);
//     fs.createReadStream(filePath)
//       .pipe(csv())
//       .on("data", function (data) {
//         results.push(data);
//       })
//       .on("end", function () {
//         fs.unlinkSync(filePath);
//         console.log("Parsed CSV Data:", results);
//         res.send(results);
//       });
//     res.status(201).json({
//       msg: "ok done",
//     });
//   }
// );
// app.listen(3000, function () {
//   console.log("Server listening on port 3000");
// });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const csv_parser_1 = __importDefault(require("csv-parser"));
const fs_1 = __importDefault(require("fs"));
const app = (0, express_1.default)();
const port = 3000;
const upload = (0, multer_1.default)({ dest: path_1.default.join(__dirname, "uploads") });
app.post("/uploads", upload.single("file"), (req, res) => {
    console.log("Here is the field");
    console.log(req.file);
    if (!req.file) {
        return res.status(401).send("No file uploaded");
    }
    const results = [];
    const filePath = path_1.default.resolve(__dirname, "uploads", req.file.filename);
    console.log(filePath);
    fs_1.default.createReadStream(filePath)
        .pipe((0, csv_parser_1.default)())
        .on("data", (data) => {
        results.push(data);
    })
        .on("end", () => {
        fs_1.default.unlinkSync(filePath);
        console.log("Parsed CSV Data:", results);
        res.send(results);
    })
        .on("error", (error) => {
        console.error("Error reading CSV file:", error);
        res.status(500).send("Error parsing CSV file");
    });
});
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
