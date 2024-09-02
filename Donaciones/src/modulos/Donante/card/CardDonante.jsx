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
    const [inventarioTemp, setInventarioTemp] = useState({
        nombre: "",
        cantidad: 0,
        descripcion: "",
        donanteid: 0,
    });
    const [inventario, setInventario] = useState([]);

    const [donacion, setDonacion] = useState([]);

    const cargarDonacion = async () => {
        try {
            const rp = await obtenerUnaDonante(params.id);
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

    const agregar = () => {
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
    };

    const hanndleSubmit = async () => {
        try {
            const rp = await guardarInventarioRequest(inventario);
            toastSucess();
            navigate("/donacion/vista");
        } catch (error) {
            console.log(error);
        }
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
                                <p className="text-white font-bold">
                                    AGREGAR DONACION
                                </p>
                            </div>
                            <Link
                                className="px-6 py-1 mt-4 text-white font-light tracking-wider bg-blue-600 hover:bg-blue-700 rounded back"
                                to="/donacion/vista"
                            >
                                Volver
                            </Link>

                            <div className="flex flex-row  max-w-5xl bg-white rounded shadow-xl align-middle justify-between py-5 mt-4">
                                <div className="max-w-xl py-2 mx-4 ">
                                    <h3 className="border-b-2 border-blue-400 w-full font-semibold">
                                        Nombre:{" "}
                                    </h3>
                                    <p>{donacion.donantenombre}</p>
                                </div>
                                <div className="max-w-xl py-2 mx-4 ">
                                    <h3 className="border-b-2 border-blue-400 w-full font-semibold">
                                        Teléfono:
                                    </h3>
                                    <p> {donacion.donantetelefono}</p>
                                </div>
                                <div className="max-w-xl py-2 mx-4 ">
                                    <h3 className="border-b-2 border-blue-400 w-full font-semibold">
                                        Dirección:
                                    </h3>
                                    <p>{donacion.donantedireccion}</p>
                                </div>
                                <div className="max-w-xl py-2 mx-4 ">
                                    <h3 className="border-b-2 border-blue-400 w-full font-semibold">
                                        Donación:
                                    </h3>
                                    <p>{donacion.donantedonacion}</p>
                                </div>
                                <div className="max-w-xl py-2 mx-4 ">
                                    <h3 className="border-b-2 border-blue-400 w-full font-semibold">
                                        Observación:
                                    </h3>
                                    <p>{donacion.donanteobservacion}</p>
                                </div>
                            </div>
                            <div className="w-full max-w-5xl mt-3">
                                <div className="leading-loose">
                                    <div className="max-w-full p-10 bg-white rounded shadow-xlfont-thin">
                                        <div>
                                            <button
                                                className="px-4 py-1 mt-4 text-white font-light tracking-wider bg-blue-800 hover:bg-blue-700 rounded"
                                                onClick={agregar}
                                            >
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
                                                        value={
                                                            inventarioTemp.nombre ||
                                                            ""
                                                        }
                                                        onChange={(e) => {
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
                                                        Cantidad
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
                                                Descripción
                                            </label>
                                            <textarea
                                                className="w-full px-5 py-1 text-gray-900 bg-gray-200 rounded focus:outline-none focus:bg-gray-100 resize-none"
                                                placeholder="Escriba una descripción"
                                                value={
                                                    inventarioTemp.descripcion ||
                                                    ""
                                                }
                                                onChange={(e) => {
                                                    setInventarioTemp({
                                                        ...inventarioTemp,
                                                        descripcion:
                                                            e.target.value,
                                                    });
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className=" max-w-6xl">
                                    <section className="antialiased  text-black font-semibold mt-3 bg-cover rounded ">
                                        <div className="flex flex-col justify-center ">
                                            <div className="w-full mx-auto  shadow-lg rounded-sm border border-gray-200">
                                                <div className="p-3 bg-white">
                                                    <div className="overflow-x-auto ">
                                                        <table className="table-auto w-full">
                                                            <thead className="text-xs font-semibold uppercase text-white bg-blue-500 rounded">
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
                                <div>
                                    <button
                                        className="px-4 py-1 mt-4 text-white font-light tracking-wider bg-blue-600 hover:bg-blue-700 rounded"
                                        type="submit"
                                        onClick={hanndleSubmit}
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
