/* eslint-disable no-unused-vars */
import { Link, useNavigate } from "react-router-dom";
import Diocesis from "../../static/diocesis.png";
function NavBar() {
    return (
        <div>
            <nav className="fixed top-0 w-full bg-green-800 shadow-md z-50">
                <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="max-w-full flex justify-center align-middle p-2 ">
                            <img
                                src={Diocesis}
                                alt="img"
                                className="w-12 h-12 rounded-full object-cover"
                            />
                        </div>
                        <div className="hidden sm:block">
                            <ul className="flex space-x-4">
                                <Link
                                    to="/donacion/vista"
                                    className="text-white  hover:text-gray-300 hover:underline hover:decoration-green-600 hover:decoration-solid underline-offset-8 "
                                >
                                    Donaciones
                                </Link>
                                <Link
                                    to="/inventario/vista"
                                    className="text-white hover:text-gray-300 hover:underline hover:decoration-green-600 hover:decoration-solid underline-offset-8 tracking-wider"
                                >
                                    Inventario
                                </Link>
                                <Link
                                    to="/institucion/vista"
                                    className="text-white hover:text-gray-300 hover:underline hover:decoration-green-600 hover:decoration-solid underline-offset-8 tracking-wider"
                                >
                                    Instituciones
                                </Link>
                                <Link
                                    to="/donar/vista"
                                    className="text-white hover:text-gray-300 hover:underline hover:decoration-green-600 hover:decoration-solid underline-offset-8 tracking-wider"
                                >
                                    Donar
                                </Link>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default NavBar;
