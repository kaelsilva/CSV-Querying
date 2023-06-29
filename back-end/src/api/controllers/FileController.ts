import { Request, Response } from "express";
import { index, create } from "../services/FileService";
import multer, { Multer } from "multer";

export interface MulterFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  buffer: Buffer;
}

export function indexController(request: Request, response: Response) {
  index(request.query.q as string)
    .then((data) => response.json(data))
    .catch((error) =>
      response.status(400).json({ error, message: error.message, code: 400 })
    );
}

export function createController(request: Request, response: Response) {
  const upload = multer().single("file");
  upload(request, response, async (error: any) => {
    if (error) {
      return response.status(500).json({ message: "Error uploading file" });
    }

    const file = request.file;
    if (!file) {
      return response.status(400).json({ message: "No file received" });
    }

    if (file.mimetype !== 'text/csv') {
      return response.status(400).json({ message: 'Invalid file type. Only CSV files are allowed.' });
    }

    create(file)
      .then((result) => response.json(result))
      .catch((error) => response.status(500).json(error));
  });
}
