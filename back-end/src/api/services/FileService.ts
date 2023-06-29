import File from "../../database/models/File";

export interface FileAttributes {
  content: Blob;
}

export interface ValuationImageAttributes extends FileAttributes {
  valuation_id: string;
}

export interface CsvArray {
  id?: number;
  csv_array?: string[][];
}

export async function index(data: string): Promise<CsvArray | []> {
  const file = await File.findOne({ order: [["created_at", "DESC"]] });
  if (!file) {
    return [];
  }

  const query = data.toLowerCase();

  const csvData = file.content.toString();
  const lines = csvData.split("\n");

  const csv_array: string[][] = [lines[0].split(",")];

  for (let i = 1; i < lines.length; i++) {
    if (lines[i].toLowerCase().includes(query)) {
      const row = lines[i].split(",");

      if (row.length > 1 || row[0] !== "") {
        csv_array.push(row);
      }
    }
  }

  return { id: file.id, csv_array };
}

export async function create(file: Express.Multer.File): Promise<any> {
  try {
    try {
      await File.create({ content: file.buffer });
      return { message: "File uploaded successfully." };
    } catch (error) {
      throw new Error("File upload failed.");
    }
  } catch (error: Error | any) {
    if (!error.message) error.message = "Failed to create file";
    throw error;
  }
}
