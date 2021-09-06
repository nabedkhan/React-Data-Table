import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import BasicTable from "./components/Table/BasicTable";
import ColumnFilteringTable from "./components/Table/ColumnFilteringTable";
import DataSortingTable from "./components/Table/DataSortingTable";
import PaginationTable from "./components/Table/PaginationTable";
import RowSelectTable from "./components/Table/RowSelectTable";
import TableWithDynamicData from "./components/Table/TableWithDynamicData";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="basic-table" element={<BasicTable />} />
      <Route path="pagination-table" element={<PaginationTable />} />
      <Route path="data-sorting-table" element={<DataSortingTable />} />
      <Route path="row-select-table" element={<RowSelectTable />} />
      <Route path="column-filtering-table" element={<ColumnFilteringTable />} />
      <Route path="dynamic-table" element={<TableWithDynamicData />} />
    </Routes>
  );
};

export default App;
