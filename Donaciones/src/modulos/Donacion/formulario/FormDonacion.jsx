/* eslint-disable no-unused-vars */

import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { guardarDonacionRequest } from "../api/donacion.api";
import Select from "react-select";
import { obtenerInventarioRequest } from "../../Inventario/api/inventario.api";
import { useEffect, useState } from "react";
import { obtenerInstitucionRequest } from "../../Institucion/api/institucion.api";

function FormDonacion() {
    const navigate = useNavigate();
    const [inventario, setInventario] = useState([]);
    const [institucion, setInstitucion] = useState([]);

    const [institucionSelect, setInstitucionSelect] = useState([]);
    const [inventarioSelect, setInventarioSelect] = useState([]);
    const [maxCantidad, setMaxCantidad] = useState(0);
    const [cantidad, setCantidad] = useState(0);
    const [inventarioRender, setInventarioRender] = useState([]);
    const [error, setError] = useState("");
    const [reRender, setReRender] = useState(0);

    const submit = async () => {
        try {
            console.log({
                institucionid: institucionSelect,
                inventario: inventarioRender,
            });
            if (institucionSelect == 0 || inventarioRender == 0) {
                toastError();
            } else {
                const rp = await guardarDonacionRequest({
                    institucionid: institucionSelect,
                    inventario: inventarioRender,
                });
                navigate("/donacion/vista");
                toastSucess();
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
        toast.error("Complete todos los campos", {
            position: "top-right",
            autoClose: 3000,
            style: {
                background: "#212121",
                color: "white",
            },
        });
    };

    const obtenerInventarios = async () => {
        try {
            const rp = await obtenerInventarioRequest();
            setInventario(rp.data);
        } catch (error) {
            console.log(error);
        }
    };

    const obtenerInstituciones = async () => {
        try {
            const rp = await obtenerInstitucionRequest();
            setInstitucion(rp.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handdleSelectInstitucion = ({ value }) => {
        setInstitucionSelect(
            institucion.filter((fill) => fill.institucionnombre == value)[0]
                .institucionid
        );
        setError("");
    };
    const handdleSelectInventario = ({ value }) => {
        const invt = inventario.filter(
            (fill) => fill.inventarionombre == value
        );
        setInventarioSelect(invt);
        setMaxCantidad(invt[0].inventariocantidad);
        setCantidad(0);
        setError("");
    };

    const agregar = () => {
        const repetido = inventarioRender.filter(
            (fill) => fill.inventarioid == inventarioSelect[0].inventarioid
        );

        if (cantidad > maxCantidad) {
            setError("Sobrepaso la cantidad máxima");
        } else if (repetido != 0) {
            setError("Ya agrego el item");
        } else if (inventarioSelect == 0 || institucionSelect == 0) {
            setError("Seleccione una opción");
        } else if (cantidad == 0) {
            setError("Indique la cantidad");
        } else {
            setInventarioRender([
                ...inventarioRender,
                {
                    inventarioid: inventarioSelect[0].inventarioid,
                    inventarionombre: inventarioSelect[0].inventarionombre,
                    cantidad: cantidad,
                },
            ]);
            /* setInventario(
                inventario.filter(
                    (fill) =>
                        fill.inventarionombre !=
                        inventarioSelect[0].inventarionombre
                )
            );*/
            setReRender(reRender + 1);
            setCantidad(0);
            setInventarioSelect([]);
            setError("");
            setMaxCantidad(0);
        }
    };
    const borrar = (id) => {
        setInventarioRender(
            inventarioRender.filter((fill) => fill.inventarioid != id)
        );
    };

    const colourStyles = {
        control: (styles) => ({
            ...styles,
            backgroundColor: "white",
            borderColor: "#ccc",
        }),
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            return {
                ...styles,
                backgroundColor: isDisabled ? "#ccc" : "#ccc",
                color: "#000",
                ":hover": {
                    backgroundColor: "gray",
                },
                cursor: isDisabled ? "not-allowed" : "default",
            };
        },
    };

    useEffect(() => {
        obtenerInventarios();
        obtenerInstituciones();
    }, []);

    return (
        <div>
            <div className="h-full font-sans">
                <div className="container mx-auto h-full flex flex-1 justify-center align-middle items-center">
                    <div className="w-full max-w-2xl">
                        <div className="leading-loose m-auto">
                            <div className="max-w-full p-10 bg-white rounded shadow-xl font-thin mt-20">
                                <div className="flex justify-start">
                                    <p className="text-black text-center text-xl font-bold border-b-2 border-green-700 w-full py-2">
                                        Donar
                                    </p>
                                </div>

                                <label className="block text-base text-black mt-2 font-semibold">
                                    Institucion
                                </label>
                                <Select
                                    options={institucion.map((inv) => ({
                                        label: inv.institucionnombre,
                                        value: inv.institucionnombre,
                                    }))}
                                    onChange={handdleSelectInstitucion}
                                    styles={colourStyles}
                                    required
                                />
                                <div className="flex flex-wrap w-full grid-cols-2 gap-4">
                                    <div className="max-w-9xl w-full">
                                        <label className="block text-base text-black mt-2 font-semibold">
                                            Inventario
                                        </label>
                                        <Select
                                            options={inventario.map((int) => ({
                                                label: int.inventarionombre,
                                                value: int.inventarionombre,
                                            }))}
                                            onChange={handdleSelectInventario}
                                            key={`my key ${reRender}`}
                                            styles={colourStyles}
                                            required
                                        />
                                    </div>
                                    <div className="flex flex-wrap w-full grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-base text-black mt-2 font-semibold">
                                                Cantidad
                                            </label>
                                            <input
                                                type="number"
                                                placeholder="Cantidad"
                                                className="w-32 px-2 py-1 text-black bg-white rounded focus:outline-none focus:bg-gray-100 border-gray-200 border-2"
                                                max={maxCantidad}
                                                min={1}
                                                value={cantidad || ""}
                                                onChange={(e) => {
                                                    setCantidad(e.target.value);
                                                }}
                                                required
                                            />
                                            <p>Disponibles: {maxCantidad}</p>
                                        </div>
                                        <div>
                                            <button
                                                className="px-4 py-1 mt-8 text-black font-semibold tracking-wider bg-gray-100 hover:bg-gray-300 rounded border-2"
                                                onClick={agregar}
                                            >
                                                Agregar
                                            </button>
                                        </div>
                                    </div>
                                    {error && (
                                        <div className="text-red-500 font-semibold">
                                            {error}
                                        </div>
                                    )}
                                </div>
                                <div className=" max-w-6xl">
                                    <section className="antialiased  text-black font-semibold mt-3 bg-cover rounded ">
                                        <div className="flex flex-col justify-center ">
                                            <div className="w-full mx-auto  shadow-lg rounded-sm border border-gray-200">
                                                <div className="p-3 bg-white">
                                                    <div className="overflow-x-auto ">
                                                        <table className="table-auto w-full">
                                                            <thead className="text-xs font-semibold uppercase text-white bg-gray-500 rounded">
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
                                                                            ACCIONES
                                                                        </div>
                                                                    </th>
                                                                </tr>
                                                            </thead>

                                                            <tbody className="text-sm divide-y-2 divide-gray-200">
                                                                {inventarioRender.map(
                                                                    (
                                                                        invent,
                                                                        _index
                                                                    ) => (
                                                                        <tr
                                                                            key={
                                                                                invent.inventarioid
                                                                            }
                                                                        >
                                                                            <td className="p-2 whitespace-nowrap text-wrap">
                                                                                <div className="text-left">
                                                                                    {
                                                                                        invent.inventarionombre
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
                                                                            <td className="p-2 whitespace-nowrap w-10 text-wrap">
                                                                                <button
                                                                                    type="button"
                                                                                    className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                                                                                    onClick={() =>
                                                                                        borrar(
                                                                                            invent.inventarioid
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

                                <div>
                                    <button
                                        className="px-4 py-1 mt-4 text-black font-semibold tracking-wider bg-gray-100 hover:bg-gray-300 rounded border-2"
                                        type="submit"
                                        onClick={submit}
                                    >
                                        Guardar
                                    </button>
                                    <Link
                                        to="/donacion/vista"
                                        className=" ml-2 px-4 py-2.5 text-black font-semibold tracking-wider bg-gray-100 hover:bg-gray-300 rounded border-2"
                                    >
                                        Cancelar
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

export default FormDonacion;
