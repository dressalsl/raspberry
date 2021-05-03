import React from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  makeStyles,
  Typography,
} from "@material-ui/core";
import Page from "src/components/Page";
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  image: {
    display: "inline-block",
    maxWidth: "100%",
    width: 170,
    marginBottom: 25,
  },
  text: {
    marginBottom: 15,
    color: "#BA2121",
    fontWeight: 300,
  },
}));

const LoginView = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .max(50)
      .email("Por favor, digite um email valido.")
      .required("Por favor, digite o email do usuário."),
    password: Yup.string()
      .max(50)
      .min(6, "A senha deve ter pelo menos 6 caracteres")
      .required("Por favor, digite a senha."),
  });

  const handleSubmit = (values) => {
    if (values.email === "admin@gmail.com" && values.password === "admin123") {
      navigate("/app/contats", { replace: true });
    } else {
      
      <Alert>Digite o email e senha do arquivo Readme.md</Alert>
    }
    
  };

  return (
    <Page className={classes.root} title="Login">
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Grid container justify="center">
          <Grid item>
            <img
              alt="Icon Raspberry"
              className={classes.image}
              src="/static/logo.svg"
            ></img>
          </Grid>
        </Grid>
        <Grid item>
          <Typography className={classes.text} align="center" variant="h2">
            Raspberry
          </Typography>
        </Grid>
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={ validationSchema }
            onSubmit={handleSubmit}
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
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Usuário"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.email}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Senha"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
                <Box my={2}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Entrar
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </Page>
  );
};

export default LoginView;
