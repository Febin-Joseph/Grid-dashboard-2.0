import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Trash2, Edit } from "lucide-react";

const AlertsTable = ({ refreshTrigger, onAlertDeleted }) => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 7;

  const totalPages = Math.ceil(alerts.length / ITEMS_PER_PAGE);
  const paginatedAlerts = alerts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await axios.get("https://grid-dashboard-2-0-1.onrender.com/api/alerts");
        setAlerts(response.data);
      } catch (error) {
        console.error("Failed to fetch alerts:", error);
        toast.error("Failed to load alerts");
      } finally {
        setLoading(false);
      }
    }

    fetchAlerts()
  }, [refreshTrigger]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this alert?")) {
      try {
        await axios.delete(`https://grid-dashboard-2-0-1.onrender.com/api/alerts/${id}`);
        toast.success("Alert deleted successfully!");
        onAlertDeleted();
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to delete alert");
      }
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <button className="px-4 py-2 bg-black text-white rounded-md text-sm">Alerts</button>
        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md text-sm">Triggered Alerts</button>
      </div>

      <div className="overflow-x-auto border rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price Signal
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Criteria
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Active Days
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {alerts.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                  No alerts found
                </td>
              </tr>
            ) : (
              paginatedAlerts.map((alert) => (
                <tr key={alert._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{alert.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{alert.priceSignal}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{alert.criteria} Than</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{alert.value}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{alert.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{alert.days}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button className="text-gray-600 hover:text-gray-900">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button onClick={() => handleDelete(alert._id)} className="text-red-600 hover:text-red-900">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 py-4">
            {[...Array(totalPages)].map((_, index) => {
              const page = index + 1
              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-1 border rounded-md text-sm ${currentPage === page ? "bg-black text-white" : "bg-white text-black"
                    }`}
                >
                  {page}
                </button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default AlertsTable;