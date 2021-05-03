import React, { useEffect, useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { FiTrash2 } from "react-icons/fi";
import moment from "moment";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import consts from "../../../const";

const Results = ({ className, ...rest }) => {
  const [selectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [list, setList] = useState([]);

  const maskData = (value) => {
    if (value != null && value.length > 0) {
      var data = moment(value, "YYYY-MM-DD");
      value = data.format("DD/MM/YYYY");
    }
    return value;
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  async function handleDeleteContact(id) {
    try {
      await axios.delete(`${consts.API}/contatos/${id}`);

      setList(list.filter((data) => data.id !== id));
    } catch (err) {}
  }

  useEffect(() => {
    let mounted = true;
    axios.get(`${consts.API}/contatos`).then((items) => {
      if (mounted) {
        setList(items.data);
      }
    });
    return () => (mounted = false);
  }, []);

  return (
    <Card className={clsx(className)} {...rest}>
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="h5" align="center" color="primary">
                    Nome
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h5" align="center" color="primary">
                    Sobrenome
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h5" align="center" color="primary">
                    Telefone
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h5" align="center" color="primary">
                    Data de nascimento
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h5" align="center" color="primary">
                    Endereço
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h5" align="center" color="primary">
                    Email
                  </Typography>
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {list.slice(0, limit).map((data) => (
                <TableRow
                  hover
                  key={data.id}
                  selected={selectedCustomerIds.indexOf(data.id) !== -1}
                >
                  <TableCell>
                    <Typography align="center" variant="h6">
                      {data.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography align="center" variant="h6">
                      {data.lastName}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography align="center" variant="h6">
                      {data.phone}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography align="center" variant="h6">
                      {maskData(data.date)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography align="center" variant="h6">
                      {data.address}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography align="center" variant="h6">
                      {data.email}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <button
                      onClick={() => handleDeleteContact(data.id)}
                      type="button"
                    >
                      <FiTrash2 size={20} color="#d1093a"></FiTrash2>
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={list.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
};

export default Results;
