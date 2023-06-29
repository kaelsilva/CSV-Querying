import request from "supertest";
import app from "../../app";

describe("File API endpoints", () => {
  describe("POST /api/files", () => {
    let buffer: Buffer;
    beforeAll(() => {
      buffer = Buffer.from(
        "name,city,country,favorite_sport\nJohn Doe,New York,USA,Basketball\nJane Smith,London,UK,Football\nMike Johnson,Paris,France,Tennis\nKaren Lee,Tokyo,Japan,Swimming\nTom Brown,Sydney,Australia,Running\nEmma Wilson,Berlin,Germany,Basketball"
      );
    });
    it("should upload a file successfully", async () => {
      const res = await request(app)
        .post("/api/files")
        .attach("file", buffer, "test-data.csv");

      expect(res.status).toBe(200);
      expect(res.body.message).toBe("File uploaded successfully.");
    });

    it("should return error when file is not csv", async () => {
      const res = await request(app)
        .post("/api/files")
        .attach("file", buffer, "test-data.pdf");

      expect(res.status).toBe(400);
      expect(res.body.message).toBe("Invalid file type. Only CSV files are allowed.");
    });
  });

  describe("GET /api/users", () => {
    it("should search and return CSV data", async () => {
      const searchQuery = "John";

      const res = await request(app).get(`/api/users?q=${searchQuery}`);

      expect(res.status).toBe(200);
      expect(res.body.csv_array).toEqual([
        ["name", "city", "country", "favorite_sport"],
        ["John Doe", "New York", "USA", "Basketball"],
        ["Mike Johnson", "Paris", "France", "Tennis"],
      ]);
    });
  });
});
