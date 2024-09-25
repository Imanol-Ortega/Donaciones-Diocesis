/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { login } from "../api/user.api";
import Diocesis from "../../../static/diocesis.png";
import { useAuth } from "../../../contexto/AuthProvider";
function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm();
    const navigate = useNavigate();
    const { setuser } = useAuth();

    const submit = handleSubmit(async (values) => {
        try {
            console.log(values);
            const rp = await login({
                nombre: values.nombre,
                password: values.password,
            });
            localStorage.setItem("usuario", rp.data.usuario);
            setuser(rp.data.usuario);
            console.log(rp.data);
            toastSucess();
            navigate("/donacion/vista");
        } catch (error) {
            toastError(error.response.data.message);
        }
    });

    const toastSucess = () => {
        toast.success("Iniciado Correctamente", {
            position: "top-right",
            autoClose: 5000,
            style: {
                background: "#212121",
                color: "white",
            },
        });
    };

    const toastError = (error) => {
        toast.error(`${error}`, {
            position: "top-right",
            autoClose: 5000,
            style: {
                background: "#212121",
                color: "white",
            },
        });
    };
    return (
        <div className="h-screen font-sans ">
            <div className="container m-auto h-full flex flex-1 justify-center items-center ">
                <div className="w-full max-w-lg">
                    <div className="leading-loose">
                        <div className="max-w-full flex justify-center align-middle p-2 ">
                            <img
                                src={Diocesis}
                                alt="img"
                                className="w-48 h-48 rounded-full object-cover"
                            />
                        </div>
                        <form
                            onSubmit={submit}
                            className="max-w-full p-10 bg-green-900 rounded shadow-xl flex justify-center flex-col"
                        >
                            <p className="text-white text-center text-lg font-bold">
                                Iniciar Sesión
                            </p>

                            <label className="block text-sm text-white mt-7">
                                Usuario
                            </label>
                            <input
                                className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded focus:outline-none focus:bg-gray-100"
                                type="text"
                                placeholder="Nombre de Usuario"
                                {...register("nombre", { required: true })}
                            />
                            {errors.nombre && (
                                <div className="text-red-500">
                                    El campo esta vacío
                                </div>
                            )}

                            <label className="block text-sm text-white mt-7">
                                Contraseña
                            </label>
                            <input
                                className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                                type="password"
                                placeholder="Contraseña"
                                {...register("password", {
                                    required: true,
                                })}
                            />
                            {errors.password && (
                                <div className="text-red-500">
                                    El campo esta vacío
                                </div>
                            )}
                            <div className="mt-5">
                                <button
                                    className="px-4 py-1 mt-4 text-black font-semibold tracking-wider bg-gray-100 hover:bg-gray-300 rounded border-2"
                                    type="submit"
                                >
                                    Ingresar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
