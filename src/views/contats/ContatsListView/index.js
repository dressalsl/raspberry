import React from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Resultado from './Resultado';
import Toolbar from './Toolbar';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const ContatsListView = () => {
  const classes = useStyles();
  
  
  return (
    <Page
      className={classes.root}
      title="Contatos"
    >
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          <Resultado />
        </Box>
      </Container>
    </Page>
  );
};

export default ContatsListView;
