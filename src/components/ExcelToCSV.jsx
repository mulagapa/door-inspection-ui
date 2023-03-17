import React, { useState } from "react";
import {read, utils} from "xlsx";
import axios from 'axios';

const ExcelToCSV = () => {
  const [csvData, setCsvData] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = read(data, { type: "array" });
      console.log('workbook : ', workbook)
      const firstSheetName = workbook.SheetNames[1];
      const worksheet = workbook.Sheets[firstSheetName];
      const csv = utils.sheet_to_csv(worksheet);

      setCsvData(csv);

      axios
        .post("http://127.0.0.1:5000/api/lockshop/csv", { csv })
        .then((res) => {
          console.log("Data successfully posted to the backend:", res);
        })
        .catch((error) => {
          console.error("Error posting data to the backend:", error);
        });
    };

    reader.readAsArrayBuffer(file);
    console.log ("CSV Data", csvData);
  };

  return (
    <div>
      <input type="file" accept=".xlsx" onChange={handleFileChange} />
      {/* {csvData && (
        <textarea value={csvData} readOnly rows={50} cols={50} />
      )} */}
    </div>
  );
};

export default ExcelToCSV;
