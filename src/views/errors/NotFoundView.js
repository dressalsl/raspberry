import React from 'react';
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Grid,
  makeStyles,
  Button
} from '@material-ui/core';
import Page from 'src/components/Page';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  image: {
    display: 'inline-block',
    maxWidth: '100%',
    width: 500
  },
  text: {
    marginTop: 30
  }
}));

const NotFoundView = () => {
  const classes = useStyles();

  const navigate = useNavigate();
  const goHome = () => {
    navigate('/app/contats')
  }

  return (
    <Page
      className={classes.root}
      title="404"
    >
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="md">
          <Typography
            align="center"
            color="textPrimary"
            variant="h2"
          >
            Erro 404
          </Typography>
          <Typography
            className={classes.text} 
            align="center"
            color="textPrimary"
            variant="h4"
            >
            Parece que o caminho que você está procurando não existe ou não está mais acessível.
          </Typography>
          <Box textAlign="center" m={3}>
            <img alt="Erro 404" className={classes.image} src="/static/images/undraw_page_not_found_su7k.svg" />
          </Box>
          <Grid container spacing={3}>
            <Grid item xs container direction="column" spacing={2}>
              <Button color="primary" size="large" variant="text" onClick={goHome}>
                Voltar para a Home
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Page>
  );
};

export default NotFoundView;
