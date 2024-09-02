/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { obtenerDonantesRequest } from "../api/donante.api";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";

function VistaDonante() {
    const [donacion, setDonacion] = useState([]);
    const [filterPedido, setFilterPedido] = useState([]);

    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const [detalle, setDetalle] = useState([]);
    const itemsPerPage = 10;

    const cargarDonacion = async () => {
        try {
            const rp = await obtenerDonantesRequest();
            setDonacion(rp.data);
            setFilterPedido(rp.data);
        } catch (error) {
            console.log(error);
        }
    };
    const filtrado = (filter) => {
        if (filter) {
            setFilterPedido(
                filterPedido.filter((dona) =>
                    dona.donantenombre
                        .toLowerCase()
                        .includes(filter.toLowerCase())
                )
            );
        } else {
            setFilterPedido(donacion);
        }
    };
    const handlePageClick = (e) => {
        const newOffset = (e.selected * itemsPerPage) % filterPedido.length;
        setItemOffset(newOffset);
    };

    useEffect(() => {
        cargarDonacion();
    }, []);
    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(filterPedido.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(filterPedido.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, filterPedido]);

    return (
        <div>
            <div className="h-full font-sans">
                <div className="container mx-auto h-full flex flex-1 justify-center items-center">
                    <div className="w-full max-w-6xl h-[100vh]">
                        <div className="py-8">
                            <div className="flex w-full justify-center font-sans font-semibold text-xl mb-5">
                                <p className="text-white font-bold">
                                    DONACIONES
                                </p>
                            </div>

                            <div className="my-2 flex justify-end mr-4 ml-4 p-1 bg-blue-500 rounded sm:flex-row flex-col">
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
                                        onChange={(e) =>
                                            filtrado(e.currentTarget.value)
                                        }
                                        className="appearance-none rounded-r rounded sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-gray-100 text-sm placeholder-gray-700 text-gray-900 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
                                    />
                                </div>

                                {/*<div className="block relative ml-20 mt-1">
                        <Link
                            to="/pedidos/nuevo"
                            className="px-3 py-1 text-white font-light tracking-wider bg-green-700 hover:bg-green-600 rounded text-lg -ml-10 mr-2"
                        >
                            Agregar
                        </Link>
                    </div>*/}
                            </div>

                            <div>
                                <section className="antialiased text-black font-semibold px-4 mt-5 bg-cover rounded ">
                                    <div className="flex flex-col justify-center ">
                                        <div className="w-full  mx-auto  shadow-lg rounded-sm border border-gray-200">
                                            <div className="p-3 bg-white">
                                                <div className="overflow-x-auto ">
                                                    <table className="table-auto w-full">
                                                        <thead className="text-xs font-semibold uppercase text-white bg-blue-500">
                                                            <tr>
                                                                <th className="p-2 whitespace-nowrap ">
                                                                    <div className="font-semibold text-left">
                                                                        ID
                                                                    </div>
                                                                </th>
                                                                <th className="p-2 whitespace-nowrap">
                                                                    <div className="font-semibold text-left">
                                                                        NOMBRE
                                                                    </div>
                                                                </th>
                                                                <th className="p-2 whitespace-nowrap">
                                                                    <div className="font-semibold text-left">
                                                                        TELEFONO
                                                                    </div>
                                                                </th>
                                                                <th className="p-2 whitespace-nowrap">
                                                                    <div className="font-semibold text-left">
                                                                        DIRECCIÓN
                                                                    </div>
                                                                </th>

                                                                <th className="p-2 whitespace-nowrap">
                                                                    <div className="font-semibold text-left">
                                                                        ESTADO
                                                                    </div>
                                                                </th>
                                                                <th className="p-2 whitespace-nowrap">
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
                                                                            tipo.donanteid
                                                                        }
                                                                    >
                                                                        <td className="p-2 whitespace-nowrap w-10 ">
                                                                            <div className="text-left">
                                                                                {
                                                                                    tipo.donanteid
                                                                                }
                                                                            </div>
                                                                        </td>
                                                                        <td className="p-2 whitespace-nowrap max-w-32 text-wrap">
                                                                            <div className="text-left">
                                                                                {
                                                                                    tipo.donantenombre
                                                                                }
                                                                            </div>
                                                                        </td>
                                                                        <td className="p-2 whitespace-nowrap w-32 text-wrap">
                                                                            <div className="text-left">
                                                                                {
                                                                                    tipo.donantetelefono
                                                                                }
                                                                            </div>
                                                                        </td>
                                                                        <td className="p-2 whitespace-nowrap max-w-40 text-wrap">
                                                                            <div className="text-left">
                                                                                {
                                                                                    tipo.donantedireccion
                                                                                }
                                                                            </div>
                                                                        </td>

                                                                        <td className="p-2 whitespace-nowrap w-28 text-wrap">
                                                                            <div className="bg-red-600 text-white p-1 rounded text-center w-24">
                                                                                Pendiente
                                                                            </div>
                                                                        </td>

                                                                        <td className="p-2 whitespace-nowrap w-10">
                                                                            <div className="text-right -ml-10">
                                                                                <Link
                                                                                    className="px-3 py-1 text-white font-light tracking-wider bg-cyan-500 hover:bg-cyan-600 rounded text-xs ml-1"
                                                                                    to={`/donacion/vista/${tipo.donanteid}`}
                                                                                >
                                                                                    Ver
                                                                                </Link>
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
                                                            pageLinkClassName="px-6 py-15 cursor-pointer rounded font-normal hover:bg-blue-500 hover:text-white"
                                                            previousClassName="px-6 py-15 cursor-pointer rounded font-normal hover:bg-blue-500 hover:text-white"
                                                            nextLinkClassName="px-6 py-15 cursor-pointer rounded font-normal hover:bg-blue-500 hover:text-white"
                                                            activeClassName="active: bg-blue-700 text-white"
                                                        />
                                                    </div>
                                                    <div className="w-full flex items-center justify-center">
                                                        {filterPedido.length ==
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

export default VistaDonante;
