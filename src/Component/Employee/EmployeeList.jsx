import Button from "../Common/Button";
import FormUtils from "../Utils/FormUtils";

function EmployeeList() {
  return (
    <div className="min-h-screen flex pt-16 justify-center ">
      <form className="w-[80%] space-y-6">
        <h1 className="text-3xl font-bold text-blue-700 text-center mb-4">Add Employee</h1>
        
        <FormUtils
          htmlFor="fullName"
          tagName="Full Name"
          name="fullName"
          type="text"
          id="fullName"
          placeholder="Enter Full Name"
        />

        <FormUtils
          htmlFor="address"
          tagName="Address"
          name="address"
          type="text"
          id="address"
          placeholder="Enter Address"
        />

        <FormUtils
          htmlFor="email"
          tagName="Email"
          name="email"
          type="email"
          id="email"
          placeholder="Enter Email"
        />

        <Button name="Add" 
          className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white py-2 rounded-lg text-lg font-medium hover:from-blue-600 hover:to-green-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
             type="submit"
             />

      </form>
    </div>
  );
}

export default EmployeeList;
