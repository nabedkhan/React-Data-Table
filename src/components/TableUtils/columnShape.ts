import { SelectColumnFilter } from "../Table/ColumnFilteringTable";

const columnShape = [
  {
    Header: "First Name",
    accessor: "firstName",
  },
  {
    Header: "Last Name",
    accessor: "lastName",
  },
  {
    Header: "Age",
    accessor: "age",
  },
  {
    Header: "Visits",
    accessor: "visits",
  },
  {
    Header: "Status",
    accessor: "status",
    Filter: SelectColumnFilter,
    filter: "includes",
  },
  {
    Header: "Profile Progress",
    accessor: "progress",
  },
];

export default columnShape;
