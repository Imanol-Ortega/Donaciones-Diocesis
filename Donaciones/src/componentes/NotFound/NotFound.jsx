import { Link } from "react-router-dom";
import { useAuth } from "../../contexto/AuthProvider";

function NotFound() {
    const { user } = useAuth();
    console.log(user);
    return (
        <div className="h-screen flex flex-col justify-center items-center bg-[#1A2238] fondo">
            {user && (
                <>
                    <h1 className="text-9xl font-extrabold text-white tracking-widest">
                        404
                    </h1>
                    <div className="bg-blue-500 px-2 text-lg rounded rotate-12 absolute">
                        No existe esta página
                    </div>
                    <Link to="/" className="mt-5">
                        <a className="relative inline-block text-sm font-medium text-white group active:text-blue-500 focus:outline-none focus:ring">
                            <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-blue-500 group-hover:translate-y-0 group-hover:translate-x-0"></span>
                            <span className="relative block px-8 py-3 bg-[#1A2238] border border-current">
                                Ir al Inicio
                            </span>
                        </a>
                    </Link>
                </>
            )}
            {user == null && (
                <>
                    <h1 className="text-9xl font-extrabold text-white tracking-widest">
                        401
                    </h1>
                    <div className="bg-blue-500 px-2 text-lg rounded rotate-12 absolute">
                        No autorizado
                    </div>
                    <Link to="/login" className="mt-5">
                        <a className="relative inline-block text-sm font-medium text-white group active:text-blue-500 focus:outline-none focus:ring">
                            <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-blue-500 group-hover:translate-y-0 group-hover:translate-x-0"></span>
                            <span className="relative block px-8 py-3 bg-[#1A2238] border border-current">
                                Iniciar Sesión
                            </span>
                        </a>
                    </Link>
                </>
            )}
        </div>
    );
}

export default NotFound;
