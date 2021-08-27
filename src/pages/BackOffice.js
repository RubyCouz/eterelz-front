import React, { useState, useContext } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { gql, useMutation, useQuery } from "@apollo/client";
import { IconButton, TableFooter } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { green } from "@material-ui/core/colors";
import TablePaginationActions from "@material-ui/core/TablePagination/TablePaginationActions";
import AuthNavbar from '../Components/Navbar/AuthNavbar'
import AvatarContext from "../context/avatar-context";
import { NavLink } from "react-router-dom";
/**********************************************************************************************************************/
//Requête Apollo
const USER_QUERY = gql`
  fragment UserQuery on User {
    _id
    user_login
    user_email
    user_role
    createdAt
    user_isActive
  }
`;
const LIST_USERS = gql`
  ${USER_QUERY}
  query {
    users {
      ...UserQuery
    }
  }
`;

const DELETE_USER = gql`
  mutation UpdateUser($id: ID!, $update: UserUpdateInput!) {
    updateUser(_id: $id, updateUserInput: $update) {
      _id
    }
  }
`;
/**************************************************************************************************************************/
//Style css material UI
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 15,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

//Functionnal componnent
export default function BackOffice() {
  const classes = useStyles();
  const { data } = useQuery(LIST_USERS);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [deleteUser] = useMutation(DELETE_USER, {
    refetchQueries: [{ query: LIST_USERS }],
  });
  const [actviateUser] = useMutation(DELETE_USER, {
    refetchQueries: [{ query: LIST_USERS }],
  });
  const tableHeader = [
    "ID",
    "Login",
    "E-mail",
    "Role",
    "Membre de le",
    "Action",
  ];
  const dateParser = (num) => {
    const timestamp = Date.parse(num);
    const date = new Date(timestamp).toLocaleDateString("fr-FR");
    return date.toString();
  };

  const avatar = useContext(AvatarContext)

  return (
    <>
    <AuthNavbar/>
      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          stickyHeader
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              {tableHeader.map((nameHeader, index) => (
                <StyledTableCell key={index} align="center">
                  {nameHeader}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              (rowsPerPage > 0
                ? data.users.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : data.users
              ).map((user, key) => (
                <StyledTableRow key={key}>
                  <StyledTableCell component="th" scope="user" align="center">
                    {user._id}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {user.user_login}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {user.user_email}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {user.user_role}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {dateParser(user.createdAt)}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {user.user_isActive ? (
                      <>
                        <IconButton
                          aria-label="edit"
                          onClick={() => {
                            avatar.setAvatar({id: user._id})
                          }}
                          component={NavLink}
                          to="/account"
                        >
                          <EditIcon style={{ color: green[500] }} />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          onClick={() => {
                            deleteUser({
                              variables: {
                                id: user._id,
                                update: { user_isActive: false },
                              },
                            });
                          }}
                        >
                          <DeleteIcon color="error" />
                        </IconButton>
                      </>
                    ) : (
                      <button
                        className="btn-Activate"
                        onClick={() => {
                          actviateUser({
                            variables: {
                              id: user._id,
                              update: { user_isActive: true },
                            },
                          });
                        }}
                      >
                        Reactivate
                      </button>
                    )}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 15]}
                count={data ? data.users.length : 0}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { "aria-label": "rows per page" },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
}
