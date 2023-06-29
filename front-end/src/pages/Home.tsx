import { useEffect, useState } from "react";
import { getCsv, uploadCsv } from "../services/csv-data";
import "./styles.css";
import Table from "../components/Table";
import FileInput from "../components/FileInput";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [csvData, setCsvData] = useState<string[][]>([]);
  const [file, setFile] = useState<File | null>(null);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value);
  }

  function uploadFile(file: File) {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      uploadCsv(formData).catch((error) => {
        console.log("error: ", error);
        toast.error(error.response.data.message);
      });
    }
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] as File;
    setFile(file);
    uploadFile(file);
  }

  useEffect(() => {
    getCsv(searchTerm).then((response) => {
      setCsvData(response);
    });
  }, [searchTerm, file]);

  return (
    <div className="container">
      <div className="content">
        <h1>CSV Querying</h1>
        <FileInput handleFileChange={handleFileChange} />
        <input
          className="input-text"
          type="text"
          placeholder="Search term"
          value={searchTerm}
          onChange={handleChange}
        />
      </div>

      <div className="table-wrapper">
        {csvData && <Table tableData={csvData} />}
      </div>
    </div>
  );
};

export default Home;
