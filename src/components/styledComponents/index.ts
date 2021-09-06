import SearchIcon from "@mui/icons-material/Search";
import { InputBase, Pagination, styled } from "@mui/material";

export const StyledPagination = styled(Pagination)(({ theme }) => ({
  "& .MuiPaginationItem-root": {
    fontWeight: 600,
  },
  "& .MuiPaginationItem-page:hover": {
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
  },
  "& .MuiPaginationItem-page.Mui-selected": {
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    borderRadius: "4px",
  },
  "& .MuiPaginationItem-previousNext": {
    color: theme.palette.text.disabled,
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
}));

export const StyledSearchInput = styled(InputBase)(({ theme }) => ({
  backgroundColor: "white",
  height: 40,
  padding: "0.5rem",
  borderRadius: "4px",
  fontSize: 12,
  fontWeight: 600,
  color: theme.palette.text.disabled,
  maxWidth: 450,
  width: "100%",
  border: `1px solid ${theme.palette.primary.main}`,
}));

export const StyledSearchIcon = styled(SearchIcon)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: 16,
  marginLeft: "0.5rem",
  marginRight: "0.5rem",
}));
