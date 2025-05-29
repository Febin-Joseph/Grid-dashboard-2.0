import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";

const AlertSchema = Yup.object().shape({
  name: Yup.string()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters")
    .required("Name is required"),
  criteria: Yup.string().oneOf(["Greater", "Less"], "Invalid criteria").required("Criteria is required"),
  value: Yup.number().typeError("Value must be a number").required("Value is required"),
  days: Yup.string().required("Days selection is required"),
  email: Yup.string().email("Invalid email format").required("Email is required"),
  phone: Yup.string()
    .matches(/^\d+$/, "Phone number must only contain digits")
    .min(10, "Phone number must be at least 10 digits")
    .required("Phone is required"),
});

const AlertForm = ({ onAlertCreated }) => {
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await axios.post("/api/alerts", values)
      toast.success("Alert created successfully!")
      resetForm()
      onAlertCreated()
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create alert")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Formik
      initialValues={{
        name: "",
        criteria: "Greater",
        value: "",
        days: "",
        email: "",
        phone: "",
      }}
      validationSchema={AlertSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <Field
              type="text"
              name="name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none
               focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter alert name"
            />
            <ErrorMessage
              name="name"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Criteria</label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <Field type="radio" name="criteria" value="Greater" className="mr-2 accent-black" />
                Greater than
              </label>
              <label className="flex items-center">
                <Field type="radio" name="criteria" value="Less" className="mr-2 accent-black" />
                Less than
              </label>
            </div>
            <ErrorMessage
              name="criteria"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <div>
            <label htmlFor="value" className="block text-sm font-medium text-gray-700 mb-1">
              Value
            </label>
            <Field
              type="number"
              name="value"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none
               focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter value"
            />
            <ErrorMessage
              name="value"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <div>
            <label htmlFor="days" className="block text-sm font-medium text-gray-700 mb-1">
              Days
            </label>
            <Field
              as="select"
              name="days"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none 
              focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select days</option>
              <option value="Everyday">Everyday</option>
              <option value="Weekdays">Weekdays</option>
              <option value="Weekends">Weekends</option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
            </Field>
            <ErrorMessage
              name="days"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <Field
              type="email"
              name="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none
               focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter email"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <Field
              type="tel"
              name="phone"
              onKeyPress={(e) => {
                if (!/[0-9]/.test(e.key)) {
                  e.preventDefault();
                }
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none
               focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter phone number"
            />
            <ErrorMessage
              name="phone"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none
             focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </Form>
      )}
    </Formik>
  )
}

export default AlertForm;