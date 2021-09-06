import { Delete, Edit } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";

const columnShape2 = [
  {
    Header: "Avatar",
    accessor: "avatar",
    Cell: ({ value }: any) => <img src={value} alt={value} />,
  },
  {
    Header: "Username",
    accessor: "username",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Role",
    accessor: "role",
  },
  {
    Header: "Edit",
    accessor: "edit",
    Cell: (props: any) => {
      const { state, row } = props;
      const selectedRow = Object.keys(state.selectedRowIds).includes(row.id);

      return (
        <Box>
          <IconButton component="span" disableRipple>
            <Edit
              sx={{ color: selectedRow ? "primary.main" : "text.disabled" }}
            />
          </IconButton>
          <IconButton component="span" disableRipple>
            <Delete
              sx={{ color: selectedRow ? "error.main" : "text.disabled" }}
            />
          </IconButton>
        </Box>
      );
    },
  },
];

export default columnShape2;
