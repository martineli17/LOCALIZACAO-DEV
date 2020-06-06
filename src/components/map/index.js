import React, { useState, useEffect } from 'react';
import MapGL, { Marker } from "react-map-gl";
import { Creators } from '../../store/reducers/developer/index';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { makeStyles, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Backdrop, CircularProgress } from '@material-ui/core';
import "mapbox-gl/dist/mapbox-gl.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { ContainerMap, ModalActions, ModalContentText, ModalTitle } from './style';


export default function Map() {

    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    const developers = useSelector(store => store.Developers);
    const [mapState, setMapState] = useState({});
    const [modalState, setModalState] = useState(false);
    const [localizationState, setLocalizationState] = useState({ latitude: 0, longitude: 0 });

    function GetPositionSucess(position) {
        setMapState({
            width: window.innerWidth,
            height: window.innerHeight,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            zoom: 15
        });

    }

    function GetPositionFailure(position) {
        setMapState({
            width: window.innerWidth,
            height: window.innerHeight,
            latitude: -19.44848015658884,
            longitude: -44.217105214355264,
            zoom: 15
        });

    }

    useEffect(() => { navigator.geolocation.getCurrentPosition(GetPositionSucess, GetPositionFailure); window.addEventListener("resize", resize); }, []);


    function resize() {
        navigator.geolocation.getCurrentPosition(GetPositionSucess, GetPositionFailure)
    };

    function handleMapClick(e) {
        const [longitude, latitude] = e.lngLat;
        setLocalizationState({ latitude, longitude });
        setModalState(!modalState);
    }

    function handleSalveLocalization() {
        dispatch(Creators.AddDeveloperRequest({ user: document.getElementById("nome").value, latitude: localizationState.latitude, longitude: localizationState.longitude }));
        setModalState(false);
    }

    const LoadingConfig = makeStyles((theme) => ({
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: '#fff',
        },
    }));

    const LoadingClass = LoadingConfig();

    if (!!developers.message.text) {
        enqueueSnackbar(developers.message.text, {
            variant: developers.message.type === 0 ? "success" : "error",
        });
        dispatch(Creators.ClearMessage());
    }

    return (
        <ContainerMap>
            <div className="Map">
                <MapGL {...mapState} onClick={event => handleMapClick(event)} mapStyle="mapbox://styles/mapbox/dark-v10" mapboxApiAccessToken={"pk.eyJ1IjoiZGllZ28zZyIsImEiOiJjamh0aHc4em0wZHdvM2tyc3hqbzNvanhrIn0.3HWnXHy_RCi35opzKo8sHQ"}
                    onViewportChange={viewport => setMapState(viewport)}>

                    {developers.data && developers.data.map(item => (
                        <Marker key={item.latitude} anchor="bottom" latitude={item.latitude} longitude={item.longitude} onClick={event => handleMapClick(event)} captureClick={true}>
                            <OverlayTrigger overlay={<Tooltip id={`tooltip-${item.nome}`}>{!!item.nome ? item.nome : item.login}</Tooltip>}>
                                <img className="Avatar" src={item.avatar} />
                            </OverlayTrigger>
                        </Marker>
                    ))}

                </MapGL>
                <Dialog open={modalState} onClose={() => setModalState(false)} aria-labelledby="form-dialog-title">
                    <DialogTitle className="ModalTitle" style={ModalTitle} id="form-dialog-title">
                        <b>Geolocalização de devesenvolvedores</b>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText className="ModalContentText" style={ModalContentText}>
                            <span>Digite o nome do desenvolvedor que se encontra nessa localização</span>
                            <br />
                            <span>Latitude: {localizationState.latitude} | Longitude: {localizationState.longitude}</span>
                        </DialogContentText>
                        <TextField autoFocus margin="dense" id="nome" label="User Name do developer no GitHub" type="text" fullWidth />
                    </DialogContent>
                    <DialogActions className="ModalActions" style={ModalActions}>
                        <Button onClick={() => setModalState(false)} variant="outline-danger"> Cancelar </Button>
                        <Button onClick={() => handleSalveLocalization()} variant="outline-primary"> Salvar </Button>
                    </DialogActions>
                </Dialog>

                <Backdrop open={developers.loading} className={LoadingClass.backdrop}>
                    <CircularProgress color="primary" />
                </Backdrop>
            </div>
        </ContainerMap>
    );
};