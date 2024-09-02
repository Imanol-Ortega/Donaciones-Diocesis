/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { guardarDonanteRequest } from "../api/donante.api";

function FormDonante() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        setValue,
    } = useForm();
    const navigate = useNavigate();

    const submit = handleSubmit(async (data) => {
        try {
            const rp = await guardarDonanteRequest(data);
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
                        <div className="leading-loose">
                            <form
                                onSubmit={submit}
                                className="max-w-full p-10 bg-white rounded shadow-xl flex justify-center flex-col font-thin"
                            >
                                <div className="flex justify-start">
                                    <p className="text-black text-center text-xl font-bold border-b-2 border-blue-600 w-full py-2">
                                        Enviar Donación
                                    </p>
                                </div>

                                <label className="block text-base text-black mt-2 font-semibold">
                                    Nombre
                                </label>
                                <input
                                    className="w-full px-5 py-1 text-gray-900 bg-gray-200 rounded focus:outline-none focus:bg-gray-100"
                                    type="text"
                                    placeholder="Escriba su nombre"
                                    {...register("nombre", { required: true })}
                                />
                                {errors.nombre && (
                                    <div className="text-red-500">
                                        El campo esta vacío
                                    </div>
                                )}
                                <label className="block text-base text-black mt-2 font-semibold">
                                    Nro. de Teléfono
                                </label>
                                <input
                                    className="w-full px-5 py-1 text-gray-900 bg-gray-200 rounded focus:outline-none focus:bg-gray-100"
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
                                <label className="block text-base text-black mt-2 font-semibold">
                                    Dirección
                                </label>
                                <textarea
                                    className="w-full px-5 py-1 text-gray-900 bg-gray-200 rounded focus:outline-none focus:bg-gray-100 resize-none"
                                    placeholder="Escriba su lugar de residencia o de donde buscar"
                                    {...register("direccion", {
                                        required: true,
                                    })}
                                />

                                {errors.direccion && (
                                    <div className="text-red-500">
                                        El campo esta vacío
                                    </div>
                                )}

                                <label className="block text-base text-black mt-2 font-semibold">
                                    Donación
                                </label>
                                <textarea
                                    className="w-full px-5 py-1 text-gray-900 bg-gray-200 rounded focus:outline-none focus:bg-gray-100 resize-none"
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
                                <label className="block text-base text-black mt-2 font-semibold">
                                    Observación
                                </label>
                                <textarea
                                    className="w-full px-5 py-1 text-gray-900 bg-gray-200 rounded focus:outline-none focus:bg-gray-100 resize-none"
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
                                        className="px-4 py-1 mt-4 text-white font-light tracking-wider bg-blue-800 hover:bg-blue-700 rounded"
                                        type="submit"
                                    >
                                        Enviar
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
