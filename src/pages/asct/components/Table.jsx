import React from "react";
import { data } from "../data/data";

export const Table = () => {
  return (
    <table>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            <td>{row.ttl}</td>
            <td>{row.body}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
