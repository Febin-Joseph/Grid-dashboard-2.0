import { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import AlertForm from "./AlertForm";
import PowerChart from "./PowerChart";
import AlertsTable from "./AlertsTable";
import { Settings } from "lucide-react";

const Dashboard = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const handleAlertCreated = () => {
    setRefreshTrigger((prev) => prev + 1);
  }

  const handleAlertDeleted = () => {
    setRefreshTrigger((prev) => prev + 1);
  }

  return (
    <div className="space-y-6">
      {/* Power Cost Chart */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold mb-4">Power Cost</h2>
          <div className="flex items-center gap-2">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={selectedDate}
                onChange={(newValue) => setSelectedDate(newValue)}
                slotProps={{
                  textField: {
                    size: "small",
                    sx: { width: 200 }
                  }
                }}
              />
            </LocalizationProvider>
            <button className="p-2 text-gray-600 hover:text-gray-900 rounded-md hover:bg-gray-100">
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>
        <PowerChart />
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
        <div className="lg:col-span-1 flex flex-col">
          <div className="bg-white rounded-lg shadow-sm p-6 h-full">
            <h2 className="text-xl font-semibold mb-4">Create Alert</h2>
            <AlertForm onAlertCreated={handleAlertCreated} />
          </div>
        </div>

        {/* Alerts Table */}
        <div className="lg:col-span-2 flex flex-col">
          <div className="bg-white rounded-lg shadow-sm p-6 h-full">
            <h2 className="text-xl font-semibold mb-4">Alerts</h2>
            <AlertsTable refreshTrigger={refreshTrigger} onAlertDeleted={handleAlertDeleted} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;