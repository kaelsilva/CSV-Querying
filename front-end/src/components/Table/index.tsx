import { v4 } from "uuid";
import "./styles.css";

const Table = ({ tableData }: { tableData: string[][] }) => (
  <div className="table-container">
    <table>
      <tbody>
        {tableData.map((row) => (
          <tr key={v4()}>
            {row.map((cell) => (
              <td className="card" key={v4()}>
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default Table;
