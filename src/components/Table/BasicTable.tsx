import {
  Card,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { FC, useMemo } from "react";
import { useTable } from "react-table";
import columnShape from "../TableUtils/columnShape";
import fakeData from "../TableUtils/fakeData";
import Heading from "../TableUtils/Heading";

const BasicTable: FC = () => {
  const columns: any = useMemo(() => columnShape, []);
  const data = useMemo(() => fakeData(10), []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  return (
    <Container>
      <Heading />
      <Card sx={{ mb: "1rem", padding: "1rem" }}>
        <Table {...getTableProps()}>
          <TableHead>
            {headerGroups.map((headerGroup) => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <TableCell {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>

          <TableBody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <TableRow {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <TableCell {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>
    </Container>
  );
};

export default BasicTable;
