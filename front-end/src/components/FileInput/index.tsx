import { ChangeEventHandler } from "react";
import "./styles.css";

const FileInput = ({
  handleFileChange,
}: {
  handleFileChange: ChangeEventHandler<HTMLInputElement>;
}) => (
  <div className="input-file">
    <input type="file" id="fileInput" onChange={handleFileChange} />
    <label className="input-file-label" htmlFor="fileInput">
      Choose file
    </label>
  </div>
);

export default FileInput;
