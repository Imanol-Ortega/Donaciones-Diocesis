/* eslint-disable no-unused-vars */
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import { toast } from "react-hot-toast";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import {
    eliminarDonadoRequest,
    obtenerDonacionRequest,
} from "../api/donacion.api";

function VistaDonacion() {
    const [donacion, setDonacion] = useState([]);
    const [filterDonacion, setFilterDonacion] = useState([]);

    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 10;

    const cargarDonacion = async () => {
        try {
            const rp = await obtenerDonacionRequest();
            setDonacion(rp.data);
            setFilterDonacion(rp.data);
        } catch (error) {
            console.log(error);
        }
    };
    const filtrado = (filter) => {
        const valorFiltro = filter.target.value.toLowerCase();
        const nuevosDonantes = donacion.filter((donante) => {
            return Object.values(donante).some((valor) => {
                return String(valor).toLowerCase().includes(valorFiltro);
            });
        });
        setFilterDonacion(nuevosDonantes);
    };
    const handlePageClick = (e) => {
        const newOffset = (e.selected * itemsPerPage) % filterDonacion.length;
        setItemOffset(newOffset);
    };
    const eliminar = async (id) => {
        try {
            const rp = await eliminarDonadoRequest(id);
            toastSucess();
            setFilterDonacion(
                filterDonacion.filter((fill) => fill.cabecera_donadoid != id)
            );
        } catch (error) {
            console.log(error);
        }
    };
    const toastSucess = () => {
        toast.success("Eliminado Correctamente", {
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
    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(filterDonacion.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(filterDonacion.length / itemsPerPage));
    }, [itemOffset, filterDonacion]);

    return (
        <div>
            <div className="h-full font-san z-10">
                <div className="container mx-auto h-full flex flex-1 justify-center items-center">
                    <div className="w-full max-w-6xl h-[100vh]">
                        <div className="py-8">
                            <div className="flex w-full justify-start font-sans font-semibold text-xl py-2 ml-4 mt-16">
                                <p className="text-black font-bold">DONADO</p>
                            </div>
                            <div className="flex w-full justify-start font-sans font-semibold text-sm py-2 ml-4 mt-2">
                                <Link
                                    to="/donar/nuevo"
                                    className="px-2 py-2 text-white font-semibold bg-green-800 hover:bg-green-700 rounded"
                                >
                                    <AddIcon /> Nuevo
                                </Link>
                            </div>

                            <div className="my-2 flex justify-start ml-3 p-1 rounded sm:flex-row flex-col">
                                <div className="block relative">
                                    <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                                        <svg
                                            viewBox="0 0 24 24"
                                            className="h-4 w-4 fill-current text-gray-500"
                                        >
                                            <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"></path>
                                        </svg>
                                    </span>

                                    <input
                                        placeholder="Filtrar"
                                        onChange={(e) => filtrado(e)}
                                        className="appearance-none rounded-r rounded sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-gray-100 text-sm placeholder-gray-700 text-gray-900 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <section className="antialiased text-black font-semibold px-4 mt-5 bg-cover rounded ">
                                    <div className="flex flex-col justify-center ">
                                        <div className="w-full  mx-auto  shadow-lg rounded-sm border border-gray-200">
                                            <div className="p-3 bg-white">
                                                <div className="overflow-x-auto ">
                                                    <table className="table-auto w-full">
                                                        <thead className="text-xs font-semibold uppercase text-white bg-gray-800">
                                                            <tr>
                                                                <th className="p-2 whitespace-nowrap ">
                                                                    <div className="font-semibold text-left">
                                                                        ID
                                                                    </div>
                                                                </th>
                                                                <th className="p-2 whitespace-nowrap">
                                                                    <div className="font-semibold text-left">
                                                                        INSTITUCION
                                                                    </div>
                                                                </th>
                                                                <th className="p-2 whitespace-nowrap">
                                                                    <div className="font-semibold text-left">
                                                                        DIRECCIÓN
                                                                    </div>
                                                                </th>
                                                                <th className="p-2 whitespace-nowrap">
                                                                    <div className="font-semibold text-left">
                                                                        DONADO
                                                                    </div>
                                                                </th>

                                                                <th className="p-2 whitespace-nowrap">
                                                                    <div className="font-semibold text-left">
                                                                        TOTAL
                                                                        DONADO
                                                                    </div>
                                                                </th>
                                                                <th className="p-2 whitespace-nowrap w-20">
                                                                    <div className="font-semibold text-left">
                                                                        ACCIONES
                                                                    </div>
                                                                </th>
                                                            </tr>
                                                        </thead>

                                                        <tbody className="text-sm divide-y-2 divide-gray-100">
                                                            {currentItems.map(
                                                                (
                                                                    tipo,
                                                                    _index
                                                                ) => (
                                                                    <tr
                                                                        key={
                                                                            tipo.cabecera_donadoid
                                                                        }
                                                                    >
                                                                        <td className="p-2 whitespace-nowrap w-10 ">
                                                                            <div className="text-left">
                                                                                {
                                                                                    tipo.cabecera_donadoid
                                                                                }
                                                                            </div>
                                                                        </td>
                                                                        <td className="p-2 whitespace-nowrap max-w-40 text-wrap">
                                                                            <div className="text-left">
                                                                                {
                                                                                    tipo.institucionnombre
                                                                                }
                                                                            </div>
                                                                        </td>
                                                                        <td className="p-2 whitespace-nowrap max-w-40 text-wrap">
                                                                            <div className="text-left">
                                                                                {
                                                                                    tipo.instituciondireccion
                                                                                }
                                                                            </div>
                                                                        </td>
                                                                        <td className="p-2 whitespace-nowrap max-w-40 text-wrap">
                                                                            <div className="text-left">
                                                                                {
                                                                                    tipo.inventario_donado
                                                                                }
                                                                            </div>
                                                                        </td>
                                                                        <td className="p-2 whitespace-nowrap max-w-3 text-wrap">
                                                                            <div className="text-left">
                                                                                {
                                                                                    tipo.total_donado
                                                                                }
                                                                            </div>
                                                                        </td>

                                                                        <td className="p-2 whitespace-nowrap w-20">
                                                                            <div className="text-right -ml-10 flex justify-end gap-2">
                                                                                <div className="ml-2 text-red-500">
                                                                                    <button
                                                                                        onClick={() => {
                                                                                            eliminar(
                                                                                                tipo.cabecera_donadoid
                                                                                            );
                                                                                        }}
                                                                                        type="button"
                                                                                    >
                                                                                        {
                                                                                            ""
                                                                                        }
                                                                                        <DeleteOutlineRoundedIcon />
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            )}
                                                        </tbody>
                                                    </table>
                                                    <div className="w-full flex items-center justify-center mt-6">
                                                        <ReactPaginate
                                                            breakLabel="..."
                                                            nextLabel="siguiente >"
                                                            onPageChange={
                                                                handlePageClick
                                                            }
                                                            pageRangeDisplayed={
                                                                3
                                                            }
                                                            pageCount={
                                                                pageCount
                                                            }
                                                            previousLabel="< anterior"
                                                            renderOnZeroPageCount={
                                                                null
                                                            }
                                                            containerClassName="list-none flex justify-center align-middle mb-5 text-sm gap-1"
                                                            pageLinkClassName="px-6 py-15 cursor-pointer rounded font-normal"
                                                            previousClassName="px-6 py-15 cursor-pointer rounded font-normal border-2"
                                                            nextLinkClassName="px-6 py-15 cursor-pointer rounded font-normal border-2"
                                                            activeClassName="active: bg-gray-300 text-black rounded"
                                                        />
                                                    </div>
                                                    <div className="w-full flex items-center justify-center">
                                                        {filterDonacion.length ==
                                                        0 ? (
                                                            <div className="font-mono text-amber-800 text-base mt-5 text-justify">
                                                                {" "}
                                                                No hay nada por
                                                                aquí...{" "}
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VistaDonacion;
