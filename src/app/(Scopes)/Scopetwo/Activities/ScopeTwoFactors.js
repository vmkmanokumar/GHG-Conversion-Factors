import { Checkbox } from "antd";
import ChooesactivitiesScopeTwo from "./ChooesactiviesScopeTwo";
import { dummyDataScope2factors } from "../dummyDataForScopeTwo/DummyData";

export default function ScopeTwoFactors({
  checkedValuesScopeTwo,
  setCheckedValuesScopeTwo,
  pageChange,
}) {
  // This function will handle the change in checkboxes and update the state
  const handleCheckboxChange = (checkedValues) => {
    setCheckedValuesScopeTwo(checkedValues); // Update the state with selected checkbox values
  };

  return (
    <>
      {pageChange === 0 && (
        <div className="flex flex-col justify-center items-center bg-[#effbf7] w-full md:w-[768px] lg:w-[1152px] md:mx-auto mt-10 md:mt-16 lg:mt-10 p-4 md:p-6 rounded-xl shadow-lg flex-grow min-h-[515px]">
          <div className="w-full md:w-[500px] max-w-2xl rounded-lg p-4 md:p-6 lg:mr-96">
            <h1 className="text-[20px] md:text-[22px] lg:text-[23px] font-black">Scope Factors</h1>

            <Checkbox.Group
              onChange={handleCheckboxChange}  // Ensure the onChange updates state
              value={checkedValuesScopeTwo}    // Pass checkedValues to control the checkboxes
            >
              <div className="flex flex-col gap-4 md:gap-5 lg:gap-6 mt-4 md:mt-6 lg:mt-8">
                {dummyDataScope2factors.map((item) => (
                  <Checkbox key={item.value} value={item.value} className="text-[22px]">
                    {item.label}
                  </Checkbox>
                ))}
              </div>
            </Checkbox.Group>
          </div>
        </div>
      )}

      {pageChange === 1 && (
        <ChooesactivitiesScopeTwo
          checkedValuesScopeTwo={checkedValuesScopeTwo}
          setCheckedValuesScopeTwo={setCheckedValuesScopeTwo}
        />
      )}
    </>
  );
}
