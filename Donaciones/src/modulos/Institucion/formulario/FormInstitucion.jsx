/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { Link } from "react-router-dom";
import { guardarInstitucionRequest } from "../api/institucion.api";

function FormInstitucion() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        setValue,
    } = useForm();

    const submit = handleSubmit(async (data) => {
        try {
            const rp = await guardarInstitucionRequest(data);
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

    return (
        <div>
            <div className="h-screen font-sans">
                <div className="container mx-auto h-full flex flex-1 justify-center items-center">
                    <div className="w-full max-w-lg">
                        <div className="leading-loose ">
                            <div className="mt-0 sm:mt-72 sm:mb-10 2xl:mt-0 2xl:mb-0">
                                <form
                                    onSubmit={submit}
                                    className="max-w-full p-10 bg-green-900 rounded shadow-xl flex justify-center flex-col font-thin"
                                >
                                    <div className="flex justify-start">
                                        <p className="text-white text-center text-xl font-bold border-b-2 border-green-900 w-full py-2">
                                            Institución
                                        </p>
                                    </div>

                                    <label className="block text-base text-white mt-2 font-semibold">
                                        Nombre
                                    </label>
                                    <input
                                        className="w-full px-5 py-1 text-gray-900 bg-gray-200 rounded focus:outline-none focus:bg-gray-100 placeholder-slate-600"
                                        type="text"
                                        placeholder="Escriba el nombre de la institución"
                                        {...register("nombre", {
                                            required: true,
                                        })}
                                    />
                                    {errors.nombre && (
                                        <div className="text-white">
                                            El campo esta vacío
                                        </div>
                                    )}
                                    <label className="block text-base text-white mt-2 font-semibold">
                                        Nro. de Teléfono
                                    </label>
                                    <input
                                        className="w-full px-5 py-1 text-gray-900 bg-gray-200 rounded focus:outline-none focus:bg-gray-100 placeholder-slate-600"
                                        type="text"
                                        placeholder="Escriba el nro de teléfono"
                                        {...register("telefono", {
                                            required: true,
                                        })}
                                    />
                                    {errors.telefono && (
                                        <div className="text-white">
                                            El campo esta vacío
                                        </div>
                                    )}
                                    <label className="block text-base text-white mt-2 font-semibold">
                                        Dirección
                                    </label>
                                    <textarea
                                        className="w-full px-5 py-1 text-gray-900 bg-gray-200 rounded focus:outline-none focus:bg-gray-100 resize-none placeholder-slate-600"
                                        placeholder="Escriba la dirección"
                                        {...register("direccion", {
                                            required: true,
                                        })}
                                    />
                                    {errors.descripcion && (
                                        <div className="text-white">
                                            El campo esta vacío
                                        </div>
                                    )}
                                    <div className="">
                                        <button
                                            className="px-4 py-1 mt-4 text-black font-semibold tracking-wider bg-gray-100 hover:bg-gray-300 rounded border-2"
                                            type="submit"
                                        >
                                            Guardar
                                        </button>
                                        {location.pathname !==
                                            "/donacion/nuevo" && (
                                            <Link
                                                className=" ml-2 px-4 py-2.5 text-black font-semibold tracking-wider bg-gray-100 hover:bg-gray-300 rounded border-2"
                                                to="/donacion/vista"
                                            >
                                                Volver
                                            </Link>
                                        )}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FormInstitucion;
