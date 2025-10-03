import { InformationCircleIcon } from "@heroicons/react/24/solid";

function InfoTooltip() {
  return (
    <div className="relative flex items-center group max-w-[20px]">
        <InformationCircleIcon 
            className="w-5 h-5 text-blue-500/70 cursor-pointer"
        />
        <div className="absolute left-6 bottom-0 mb-6 w-64 p-2 bg-gray-800 text-white text-sm rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            The backend is deployed on Render. It may take a few seconds to respond if inactive.
        </div>
    </div>
  );
}

export default InfoTooltip;
