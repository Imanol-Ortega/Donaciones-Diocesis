/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { guardarDonanteRequest } from "../api/donante.api";
import Diocesis from "../../../static/diocesis.png";

import { useState } from "react";
import {
    Dialog,
    Button,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
    MapContainer,
    Marker,
    Popup,
    TileLayer,
    useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

function FormDonante() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        setValue,
    } = useForm();
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [position, setPosition] = useState(null);
    const [flyPosition, setFlyPosition] = useState(null);
    const [positionLoad, setPositionLoad] = useState([
        -27.338697141418727, -55.86717871248513,
    ]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setFlyPosition(null);
        setOpen(false);
    };

    const Markers = () => {
        useMapEvents({
            click: (e) => {
                const newPosition = [e.latlng.lat, e.latlng.lng];
                setValue("latitude", newPosition[0]);
                setValue("longitude", newPosition[1]);
                setPosition(newPosition);
                setPositionLoad(newPosition);
                setFlyPosition(null);
            },
        });
        return position === null ? null : <Marker position={position} />;
    };

    const submit = handleSubmit(async (data) => {
        try {
            console.log(data);
            //const rp = await guardarDonanteRequest(data);
            reset();
            toastSucess();
        } catch (error) {
            console.log(error);
        }
    });

    const toastSucess = () => {
        toast.success("Enviado Correctamente", {
            position: "top-right",
            autoClose: 5000,
            style: {
                background: "#212121",
                color: "white",
            },
        });
    };

    const LocationMarker = () => {
        const map = useMapEvents({
            click() {
                map.locate();
            },
            locationfound(e) {
                console.log(e.latlng.lat);
                map.flyTo(e.latlng, map.getZoom());
                setFlyPosition(e.latlng);
            },
        });
    };

    return (
        <div>
            <div className="h-screen font-sans">
                <div className="container mx-auto h-full flex flex-1 justify-center items-center">
                    <div className="w-full max-w-lg">
                        <div className="leading-loose">
                            <div className="max-w-full flex justify-center align-middle p-2">
                                <img
                                    src={Diocesis}
                                    alt="img"
                                    className="w-48 h-48 rounded-full object-cover"
                                />
                            </div>
                            <form
                                onSubmit={submit}
                                className="max-w-full p-10 bg-[#263a21] rounded shadow-xl flex justify-center flex-col font-thin"
                            >
                                <div className="flex justify-start">
                                    <p className="text-white text-center text-xl font-bold border-b-2 border-[#263a21] w-full py-2">
                                        Donación
                                    </p>
                                </div>

                                <label className="block text-base text-white mt-2 font-semibold">
                                    Nombre
                                </label>
                                <input
                                    className="w-full px-5 py-1 text-gray-900 bg-gray-200 rounded focus:outline-none focus:bg-gray-100 placeholder-slate-600"
                                    type="text"
                                    placeholder="Escriba su nombre"
                                    {...register("nombre", { required: true })}
                                />
                                {errors.nombre && (
                                    <div className="text-red-500">
                                        El campo esta vacío
                                    </div>
                                )}
                                <label className="block text-base text-white mt-2 font-semibold">
                                    Nro. de Teléfono
                                </label>
                                <input
                                    className="w-full px-5 py-1 text-gray-900 bg-gray-200 rounded focus:outline-none focus:bg-gray-100 placeholder-slate-600"
                                    type="text"
                                    placeholder="Escriba su nro de teléfono"
                                    {...register("telefono", {
                                        required: true,
                                    })}
                                />
                                {errors.telefono && (
                                    <div className="text-red-500">
                                        El campo esta vacío
                                    </div>
                                )}
                                <label className="block text-base text-white mt-2 font-semibold">
                                    Dirección
                                </label>
                                <Button
                                    variant="contained"
                                    onClick={handleClickOpen}
                                    className="px-4 py-1 mt-4 text-black font-thin tracking-wider bg-white hover:bg-slate-100 rounded"
                                >
                                    Abrir Mapa
                                </Button>

                                <Dialog
                                    fullWidth={true}
                                    maxWidth={"md"}
                                    open={open}
                                    onClose={handleClose}
                                >
                                    <DialogTitle
                                        sx={{ m: 0, p: 2 }}
                                        id="customized-dialog-title"
                                    >
                                        Seleccione la ubicación de su vivienda
                                    </DialogTitle>
                                    <IconButton
                                        aria-label="inert"
                                        onClick={handleClose}
                                        sx={(theme) => ({
                                            position: "absolute",
                                            right: 8,
                                            top: 8,
                                            color: theme.palette.grey[500],
                                        })}
                                    ></IconButton>
                                    <DialogContent dividers>
                                        <div>
                                            <MapContainer
                                                center={positionLoad}
                                                zoom={15}
                                                scrollWheelZoom={true}
                                                style={{
                                                    height: 600,
                                                    maxWidth: "100vh",
                                                }}
                                            >
                                                <TileLayer
                                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                                />
                                                {flyPosition === null ? (
                                                    <LocationMarker />
                                                ) : null}

                                                <Markers />
                                            </MapContainer>
                                        </div>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button autoFocus onClick={handleClose}>
                                            Cerrar
                                        </Button>
                                    </DialogActions>
                                </Dialog>

                                {errors.direccion && (
                                    <div className="text-red-500">
                                        El campo esta vacío
                                    </div>
                                )}

                                <label className="block text-base text-white mt-2 font-semibold">
                                    Donación
                                </label>
                                <textarea
                                    className="w-full px-5 py-1 text-gray-900 bg-gray-200 rounded focus:outline-none focus:bg-gray-100 resize-none placeholder-slate-600"
                                    placeholder="Escriba lo que va a donar"
                                    {...register("donacion", {
                                        required: true,
                                    })}
                                />

                                {errors.donacion && (
                                    <div className="text-red-500">
                                        El campo esta vacío
                                    </div>
                                )}
                                <label className="block text-base text-white mt-2 font-semibold">
                                    Observación
                                </label>
                                <textarea
                                    className="w-full px-5 py-1 text-gray-900 bg-gray-200 rounded focus:outline-none focus:bg-gray-100 resize-none placeholder-slate-600"
                                    placeholder="Escriba una observación"
                                    {...register("observacion", {
                                        required: true,
                                    })}
                                />

                                {errors.observacion && (
                                    <div className="text-red-500">
                                        El campo esta vacío
                                    </div>
                                )}
                                <div>
                                    <button
                                        className="px-4 py-1 mt-4 text-black font-thin tracking-wider bg-white hover:bg-slate-100 rounded"
                                        type="submit"
                                    >
                                        Guardar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FormDonante;
