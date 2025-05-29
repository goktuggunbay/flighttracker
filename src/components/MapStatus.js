export default function MapStatus({ lastUpdated }) {
  return (
    <div className=" bg-white shadow rounded px-3 py-1 text-sm z-[1000]">
      <span className="text-gray-700">Flight data is updated every 15 minutes</span>
      <span className="text-gray-700">Last Update: {lastUpdated}</span>
    
    </div>
  );
}
