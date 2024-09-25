/* eslint-disable react/prop-types */
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import { Link } from "react-router-dom";

function DataTable({
    dataBody = [],
    header = [],
    colorBackgroundHeader = "bg-gray-800",
    colorBackground = "bg-white",
    colorTextHeader = "text-white",
    isEmpty,
}) {
    return (
        <div>
            <section className="antialiased text-black font-semibold px-4 mt-5 bg-cover rounded ">
                <div className="flex flex-col justify-center ">
                    <div className="w-full  mx-auto  shadow-lg rounded-sm border border-gray-200">
                        <div className={`p-3 ${colorBackground}`}>
                            <div className="overflow-x-auto ">
                                <table className="table-auto w-full">
                                    <thead
                                        className={`text-xs font-semibold uppercase ${colorTextHeader} ${colorBackgroundHeader}`}
                                    >
                                        <tr>
                                            {header.map((hd, index) => (
                                                <th
                                                    className="p-2 whitespace-nowrap "
                                                    key={index}
                                                >
                                                    <div className="font-semibold text-left">
                                                        {hd}
                                                    </div>
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm divide-y-2 divide-gray-100">
                                        {dataBody.map((data, index) => (
                                            <tr key={index}>
                                                {Object.entries(data).map(
                                                    ([key, value]) => (
                                                        <td
                                                            className="p-2 whitespace-nowrap w-10 "
                                                            key={key}
                                                        >
                                                            <div className="text-left">
                                                                {value}
                                                            </div>
                                                        </td>
                                                    )
                                                )}
                                                <td className="p-2 whitespace-nowrap w-10 ">
                                                    <div className="text-right -ml-10 flex justify-end gap-2">
                                                        <Link
                                                            className=" text-green-700 font-light tracking-wide rounded text-xs"
                                                            to={`/donacion/vista/`}
                                                        >
                                                            <VisibilityRoundedIcon />
                                                        </Link>
                                                        <div className="ml-2 text-red-500">
                                                            <button type="button">
                                                                {""}
                                                                <DeleteOutlineRoundedIcon />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div className="w-full flex items-center justify-center">
                                    {dataBody.length == 0 ? (
                                        <div className="font-mono text-amber-800 text-base mt-5 text-justify">
                                            {isEmpty}
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default DataTable;
