import React, { useState } from "react";
import { Container, makeStyles } from "@material-ui/core";
import Page from "src/components/Page";
import ContatsAdd from "./contatsAdd";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const ContatsListView = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Adicionar contato">
      <Container maxWidth="lg">
        <ContatsAdd />
      </Container>
    </Page>
  );
};

export default ContatsListView;
