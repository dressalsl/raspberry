import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import * as Yup from "yup";
import { Formik } from "formik";
import axios from "axios";
import consts from "../../../const";
import {
  Box,
  Button,
  TextField,
  Card,
  CardContent,
  CardHeader,
  Divider,
} from "@material-ui/core";

const ContatsAdd = ({ className, ...rest }) => {
  const navigate = useNavigate();
  const [serverState, setServerState] = useState();

  const maskTelefone = (value) => {
    if (value != null && value.length > 0) {
      value = value.substring(0, 15);
      value = value
        .replace(/\D/g, "")
        .replace(/^(\d{2})(\d)/g, "($1) $2")
        .replace(/(\d)(\d{4})$/, "$1-$2");
    }
    return value;
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .max(255)
      .required("Por favor, digite o nome."),
    lastName: Yup.string()
      .max(255)
      .required("Por favor, digite o sobrenome."),
    phone: Yup.string().required("Por favor, digite o telefone."),
    date: Yup.date().required("Por favor, selecione uma data."),
    address: Yup.string()
      .max(150)
      .required("Por favor, digite o endereço."),
    email: Yup.string()
      .email("Por favor, digite um email valido")
      .max(50)
      .required("Por favor, digite o email."),
  });

  const handleServerResponse = (ok, msg) => {
    setServerState({ ok, msg });
  };

  const handleSubmit = (values, actions) => {
    axios
      .post(`${consts.API}/contatos/`, values)
      .then((response) => {
        actions.setSubmitting(false);
        actions.resetForm();
        handleServerResponse(true, "Thanks!");
        navigate("/app/contats", { replace: true });
      })
      .catch((error) => {
        actions.setSubmitting(false);
        handleServerResponse(false, error.response.data.error);
      });
  };

  return (
    <Formik
      initialValues={{
        name: "",
        lastName: "",
        phone: "",
        date: "",
        address: "",
        email: "",
      }}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values,
      }) => (
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader
              title="Adicionar contato"
              titleTypographyProps={{ variant: "h3" }}
            />
            <Divider />
            <CardContent>
              <Box m={1}>
                <TextField
                  error={Boolean(touched.name && errors.name)}
                  helperText={touched.name && errors.name}
                  label="Nome"
                  margin="normal"
                  name="name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.name}
                  variant="outlined"
                  fullWidth
                />
              </Box>
              <Box m={1}>
                <TextField
                  error={Boolean(touched.lastName && errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  label="Sobrenome"
                  margin="normal"
                  name="lastName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.lastName}
                  variant="outlined"
                  fullWidth
                />
              </Box>
              <Box m={1}>
                <TextField
                  error={Boolean(touched.phone && errors.phone)}
                  helperText={touched.phone && errors.phone}
                  label="Telefone"
                  margin="normal"
                  name="phone"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={maskTelefone(values.phone)}
                  variant="outlined"
                  fullWidth
                />
              </Box>
              <Box m={1}>
                <TextField
                  error={Boolean(touched.date && errors.date)}
                  helperText={touched.date && errors.date}
                  id="date"
                  name="date"
                  label="Data de nascimento"
                  type="date"
                  margin="normal"
                  value={values.date}
                  variant="outlined"
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Box>
              <Box m={1}>
                <TextField
                  error={Boolean(touched.address && errors.address)}
                  helperText={touched.address && errors.address}
                  label="Endereço"
                  margin="normal"
                  name="address"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.address}
                  variant="outlined"
                  fullWidth
                />
              </Box>
              <Box m={1}>
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                  label="Email"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.email}
                  variant="outlined"
                  fullWidth
                />
              </Box>
            </CardContent>
            <Box mt={4} display="flex" justifyContent="space-between" p={2}>
              <Button
                color="primary"
                size="large"
                variant="outlined"
                onClick={() => {
                  navigate("/app/contats", { replace: true });
                }}
              >
                Cancelar
              </Button>
              <Button
                color="primary"
                disabled={isSubmitting}
                size="large"
                type="submit"
                variant="contained"
              >
                Enviar
              </Button>
            </Box>
          </Card>
        </form>
      )}
    </Formik>
  );
};

ContatsAdd.propTypes = {
  className: PropTypes.string,
};

export default ContatsAdd;
