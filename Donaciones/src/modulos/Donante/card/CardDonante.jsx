/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { obtenerUnaDonante } from "../api/donante.api";
import { toast } from "react-hot-toast";
import { guardarInventarioRequest } from "../../Inventario/api/inventario.api";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

function CardDonante() {
    const params = useParams();
    const navigate = useNavigate();
    const [inventarioTemp, setInventarioTemp] = useState({
        nombre: "",
        cantidad: 0,
        descripcion: "",
        donanteid: 0,
    });
    const [position, setPosition] = useState(null);
    const [inventario, setInventario] = useState([]);

    const [donacion, setDonacion] = useState([]);
    const [error, setError] = useState("");

    let DefaultIcon = L.icon({
        iconUrl: icon,
        shadowUrl: iconShadow,
    });

    const cargarDonacion = async () => {
        try {
            const rp = await obtenerUnaDonante(params.id);
            console.log(rp.data[0]);
            setPosition([
                parseFloat(rp.data[0].donantelatitud),
                parseFloat(rp.data[0].donantelongitud),
            ]);
            setDonacion(rp.data[0]);
        } catch (error) {
            console.log(error);
        }
    };

    const agregar = () => {
        if (
            inventarioTemp.nombre == "" ||
            inventarioTemp.cantidad == 0 ||
            inventarioTemp.descripcion == ""
        ) {
            setError("Complete los campos");
        } else {
            setInventario([
                ...inventario,
                {
                    nombre: inventarioTemp.nombre,
                    cantidad: inventarioTemp.cantidad,
                    descripcion: inventarioTemp.descripcion,
                    donanteid: donacion.donanteid,
                },
            ]);
            setInventarioTemp({
                nombre: "",
                cantidad: 0,
                descripcion: "",
                donanteid: 0,
            });
            console.log(inventario);
            setError("");
        }
    };

    const hanndleSubmit = async () => {
        try {
            if (inventario == 0) {
                toastError();
            } else {
                const rp = await guardarInventarioRequest(inventario);
                toastSucess();
                navigate("/donacion/vista");
            }
        } catch (error) {
            console.log(error);
        }
    };
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
    const toastError = () => {
        toast.error("Cargue al menos un dato", {
            position: "top-right",
            autoClose: 3000,
            style: {
                background: "#212121",
                color: "white",
            },
        });
    };
    const borrar = (nombre) => {
        setInventario(inventario.filter((fill) => fill.nombre != nombre));
    };

    useEffect(() => {
        cargarDonacion();
    }, []);

    return (
        <div>
            <div className="h-full font-sans">
                <div className="container mx-auto h-full flex flex-1 justify-center items-center">
                    <div className="max-w-6xl h-[100vh]">
                        <div className="py-8">
                            <div className="flex w-full justify-center font-sans font-semibold text-xl mb-5">
                                <p className="text-black font-bold">
                                    AGREGAR DONACION
                                </p>
                            </div>

                            <div className="flex flex-col max-w-5xl bg-white rounded shadow-xl align-middle justify-center py-5 mt-4 ">
                                <div className="max-w-xl py-2 mx-4 ">
                                    <h3 className=" shadow-md w-full font-semibold p-3">
                                        Nombre: {donacion.donantenombre}
                                    </h3>
                                </div>
                                <div className="max-w-xl py-2 mx-4 ">
                                    <h3 className=" shadow-md w-full font-semibold p-3">
                                        Teléfono: {donacion.donantetelefono}
                                    </h3>
                                </div>
                                <div className="max-w-xl py-2 mx-4 ">
                                    <h3 className="shadow-md w-full font-semibold p-3">
                                        Dirección:
                                        <div>
                                            {position && (
                                                <MapContainer
                                                    center={position}
                                                    zoom={15}
                                                    scrollWheelZoom={true}
                                                    style={{
                                                        height: 400,
                                                        maxWidth: "md",
                                                        zIndex: 10,
                                                        position: "relative",
                                                    }}
                                                >
                                                    <TileLayer
                                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                                    />
                                                    <Marker
                                                        position={position}
                                                        icon={DefaultIcon}
                                                    />
                                                </MapContainer>
                                            )}
                                        </div>
                                    </h3>
                                </div>
                                <div className="max-w-xl py-2 mx-4 ">
                                    <h3 className=" shadow-md w-full font-semibold p-3">
                                        Donación: {donacion.donantedonacion}
                                    </h3>
                                </div>
                                <div className="max-w-xl py-2 mx-4 ">
                                    <h3 className="shadow-md w-full font-semibold p-3">
                                        Observación:{" "}
                                        {donacion.donanteobservacion}
                                    </h3>
                                </div>
                            </div>
                            <div className="w-full max-w-5xl mt-3 ">
                                <div className="leading-loose">
                                    <div className="max-w-full p-10 bg-white shadow-xl rounded font-thin">
                                        <div>
                                            <div className="flex flex-wrap w-full grid-cols-2 gap-4">
                                                <div className="max-w-2xl">
                                                    <label className="block text-base text-black mt-2 font-semibold">
                                                        Nombre del Articulo
                                                    </label>
                                                    <input
                                                        className="w-96 px-5 py-1 text-gray-900 bg-gray-200 rounded focus:outline-none focus:bg-gray-100"
                                                        type="text"
                                                        placeholder="Escriba el nombre del articulo"
                                                        value={
                                                            inventarioTemp.nombre ||
                                                            ""
                                                        }
                                                        onChange={(e) => {
                                                            setError("");
                                                            setInventarioTemp({
                                                                ...inventarioTemp,
                                                                nombre: e.target
                                                                    .value,
                                                            });
                                                        }}
                                                    />
                                                </div>
                                                <div className="max-w-2xl">
                                                    <label className="block text-base text-black mt-2 font-semibold">
                                                        Cantidad Recibida
                                                    </label>
                                                    <input
                                                        className="w-full px-5 py-1 text-gray-900 bg-gray-200 rounded focus:outline-none focus:bg-gray-100"
                                                        type="number"
                                                        placeholder="Escriba la cantidad"
                                                        value={
                                                            inventarioTemp.cantidad ||
                                                            0
                                                        }
                                                        onChange={(e) => {
                                                            setError("");
                                                            setInventarioTemp({
                                                                ...inventarioTemp,
                                                                cantidad:
                                                                    e.target
                                                                        .value,
                                                            });
                                                        }}
                                                    />
                                                </div>
                                            </div>

                                            <label className="block text-base text-black mt-2 font-semibold">
                                                Descripción del Articulo
                                            </label>
                                            <textarea
                                                className="w-full px-5 py-1 text-gray-900 bg-gray-200 rounded focus:outline-none focus:bg-gray-100 resize-none"
                                                placeholder="Escriba una descripción"
                                                value={
                                                    inventarioTemp.descripcion ||
                                                    ""
                                                }
                                                onChange={(e) => {
                                                    setError("");
                                                    setInventarioTemp({
                                                        ...inventarioTemp,
                                                        descripcion:
                                                            e.target.value,
                                                    });
                                                }}
                                            />
                                        </div>
                                        {error && (
                                            <div className="text-red-500 font-semibold">
                                                {error}
                                            </div>
                                        )}
                                        <button
                                            className="px-4 py-1 mt-4 text-black font-semibold tracking-wider bg-gray-100 hover:bg-gray-300 rounded border-2"
                                            onClick={agregar}
                                        >
                                            Agregar articulo
                                        </button>
                                    </div>
                                </div>
                                <div className=" max-w-6xl">
                                    <section className="antialiased  text-black font-semibold mt-3 bg-cover rounded ">
                                        <div className="flex flex-col justify-center ">
                                            <div className="w-full mx-auto  shadow-xl rounded-sm border border-gray-200">
                                                <div className="p-3 bg-white">
                                                    <div className="overflow-x-auto ">
                                                        <table className="table-auto w-full">
                                                            <thead className="text-xs font-semibold uppercase text-white bg-gray-800 rounded">
                                                                <tr>
                                                                    <th className="p-2 whitespace-nowrap">
                                                                        <div className="font-semibold text-left">
                                                                            NOMBRE
                                                                        </div>
                                                                    </th>
                                                                    <th className="p-2 whitespace-nowrap">
                                                                        <div className="font-semibold text-left">
                                                                            CANTIDAD
                                                                        </div>
                                                                    </th>
                                                                    <th className="p-2 whitespace-nowrap">
                                                                        <div className="font-semibold text-left">
                                                                            DESCRIPCION
                                                                        </div>
                                                                    </th>
                                                                    <th className="p-2 whitespace-nowrap">
                                                                        <div className="font-semibold text-left"></div>
                                                                    </th>
                                                                </tr>
                                                            </thead>

                                                            <tbody className="text-sm divide-y-2 divide-gray-200">
                                                                {inventario.map(
                                                                    (
                                                                        invent,
                                                                        _index
                                                                    ) => (
                                                                        <tr
                                                                            key={
                                                                                _index
                                                                            }
                                                                        >
                                                                            <td className="p-2 whitespace-nowrap text-wrap">
                                                                                <div className="text-left">
                                                                                    {
                                                                                        invent.nombre
                                                                                    }
                                                                                </div>
                                                                            </td>
                                                                            <td className="p-2 whitespace-nowrap w-10 text-wrap">
                                                                                <div className="text-left">
                                                                                    {
                                                                                        invent.cantidad
                                                                                    }
                                                                                </div>
                                                                            </td>
                                                                            <td className="p-2 whitespace-nowrap max-w-3xl text-wrap">
                                                                                <div className="text-left">
                                                                                    {
                                                                                        invent.descripcion
                                                                                    }
                                                                                </div>
                                                                            </td>
                                                                            <td className="p-2 whitespace-nowrap w-10 text-wrap">
                                                                                <button
                                                                                    type="button"
                                                                                    className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                                                                                    onClick={() =>
                                                                                        borrar(
                                                                                            invent.nombre
                                                                                        )
                                                                                    }
                                                                                >
                                                                                    <svg
                                                                                        className="h-6 w-6"
                                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                                        fill="none"
                                                                                        viewBox="0 0 24 24"
                                                                                        stroke="currentColor"
                                                                                        aria-hidden="true"
                                                                                    >
                                                                                        <path
                                                                                            strokeLinecap="round"
                                                                                            strokeLinejoin="round"
                                                                                            strokeWidth="2"
                                                                                            d="M6 18L18 6M6 6l12 12"
                                                                                        />
                                                                                    </svg>
                                                                                </button>
                                                                            </td>
                                                                        </tr>
                                                                    )
                                                                )}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                                <div className="justify-between flex w-44 ">
                                    <button
                                        className="px-4 py-1 mt-4 text-black font-semibold tracking-wider bg-gray-100 hover:bg-gray-300 rounded border-2 "
                                        type="submit"
                                        onClick={hanndleSubmit}
                                    >
                                        Enviar
                                    </button>
                                    <Link
                                        className="px-4 py-1.5 mt-4 ml-4 text-black font-semibold tracking-wider bg-gray-100 hover:bg-gray-300 rounded border-2"
                                        to="/donacion/vista"
                                    >
                                        Volver
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CardDonante;
