import React from 'react';
import Map from '../../components/map/index';
import DevList from '../../components/devList/index';
import { SnackbarProvider } from 'notistack';
import { Container } from './style';

export default function DevLocalization() {
  return (
    <SnackbarProvider maxSnack={3}>
      <Map />
      <Container >
        <DevList />
      </Container>
    </SnackbarProvider>
  );
}