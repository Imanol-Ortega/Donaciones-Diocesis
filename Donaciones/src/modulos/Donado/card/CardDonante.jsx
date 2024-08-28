/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { obtenerUnaDonante } from "../api/donante.api";
import { toast } from "react-hot-toast";
import { guardarInventarioRequest } from "../../Inventario/api/inventario.api";

function CardDonante() {
    const params = useParams();
    const navigate = useNavigate();
    const [nombre, setNombre] = useState("");
    const [cantidad, setCantidad] = useState("");
    const [descripcion, setDescripcion] = useState("");

    const [donacion, setDonacion] = useState([]);

    const cargarDonacion = async () => {
        try {
            const rp = await obtenerUnaDonante(params.id);
            console.log(rp.data[0]);
            setDonacion(rp.data[0]);
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

    useEffect(() => {
        cargarDonacion();
    }, []);

    return (
        <div>
            <div className="h-screen font-sans ">
                <div className="container mx-auto h-full flex flex-1 justify-center items-center">
                    <div className="w-full max-w-5xl">
                        <Link
                            className="px-4 py-1 mt-4 text-white font-light tracking-wider bg-blue-600 hover:bg-blue-700 rounded"
                            to="/donacion/vista"
                        >
                            Volver
                        </Link>
                        <div className="py-8">
                            <div className="flex flex-row  max-w-5xl bg-white rounded shadow-xl align-middle justify-between py-5">
                                <div className="max-w-xl py-2 mx-4 ">
                                    <h3 className="border-b-2 border-blue-400 w-20">
                                        Nombre:{" "}
                                    </h3>
                                    <p>{donacion.donantenombre}</p>
                                </div>
                                <div className="max-w-xl py-2 mx-4 ">
                                    <h3 className="border-b-2 border-blue-400 w-20">
                                        Teléfono:
                                    </h3>
                                    <p> {donacion.donantetelefono}</p>
                                </div>
                                <div className="max-w-xl py-2 mx-4 ">
                                    <h3 className="border-b-2 border-blue-400 w-20">
                                        Dirección:
                                    </h3>
                                    <p>{donacion.donantedireccion}</p>
                                </div>
                                <div className="max-w-xl py-2 mx-4 ">
                                    <h3 className="border-b-2 border-blue-400 w-20">
                                        Donación:
                                    </h3>
                                    <p>{donacion.donantedonacion}</p>
                                </div>
                                <div className="max-w-xl py-2 mx-4 ">
                                    <h3 className="border-b-2 border-blue-400 w-28">
                                        Observación:
                                    </h3>
                                    <p>{donacion.donanteobservacion}</p>
                                </div>
                            </div>
                            <div className="w-full max-w-5xl border-t-4 border-blue-300 border-separate">
                                <div className="leading-loose">
                                    <div className="max-w-full p-10 bg-white rounded shadow-xlfont-thin">
                                        <div>
                                            <button className="px-4 py-1 mt-4 text-white font-light tracking-wider bg-blue-800 hover:bg-blue-700 rounded">
                                                Agregar
                                            </button>

                                            <div className="flex flex-wrap w-full grid-cols-2 gap-4">
                                                <div className="max-w-2xl">
                                                    <label className="block text-base text-black mt-2 font-semibold">
                                                        Nombre
                                                    </label>
                                                    <input
                                                        className="w-96 px-5 py-1 text-gray-900 bg-gray-200 rounded focus:outline-none focus:bg-gray-100"
                                                        type="text"
                                                        placeholder="Escriba el nombre"
                                                    />
                                                </div>
                                                <div className="max-w-2xl">
                                                    <label className="block text-base text-black mt-2 font-semibold">
                                                        Cantidad
                                                    </label>
                                                    <input
                                                        className="w-full px-5 py-1 text-gray-900 bg-gray-200 rounded focus:outline-none focus:bg-gray-100"
                                                        type="number"
                                                        placeholder="Escriba la cantidad"
                                                    />
                                                </div>
                                            </div>
                                            <label className="block text-base text-black mt-2 font-semibold">
                                                Descripción
                                            </label>
                                            <textarea
                                                className="w-full px-5 py-1 text-gray-900 bg-gray-200 rounded focus:outline-none focus:bg-gray-100 resize-none"
                                                placeholder="Escriba una descripción"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <button
                                        className="px-4 py-1 mt-4 text-white font-light tracking-wider bg-blue-600 hover:bg-blue-700 rounded"
                                        type="submit"
                                    >
                                        Enviar
                                    </button>
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
