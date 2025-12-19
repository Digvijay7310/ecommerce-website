const StatsCard = ({ title, count }) => {
    return (
        <div className="bg-white shadow rounded p-4">
            <h2 className="text-gray-500">{title}</h2>
            <p className="text-2xl font-bold">{count}</p>
        </div>
    );
}

export default StatsCard;
