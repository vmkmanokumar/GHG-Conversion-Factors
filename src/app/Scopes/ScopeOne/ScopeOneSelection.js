import { Flex } from "antd";
import { Checkbox } from "antd";
import "./ScopeOneSelection.css";

export default function ScopeOneSelection() {
  const onChange = (checkedValues) => {
    console.log("checked = ", checkedValues);
  };

  return (
    <div className="flex justify-center items-center bg-[#effbf7] w-full md:w-[768px] lg:w-[1152px] md:mx-auto h-auto md:h-[450px] lg:h-[512px] mt-10 md:mt-16 lg:mt-24 p-4 md:p-6 rounded-xl">
      <div className="w-full md:w-[500px] max-w-2xl rounded-lg p-4 md:p-6 lg:mr-96">
        <h1 className="text-[20px] md:text-[22px] lg:text-[23px] font-black ">Scope Factors</h1>

        <Checkbox.Group onChange={onChange}>
          <div className="flex flex-col gap-4 md:gap-5 lg:gap-6 mt-4 md:mt-6 lg:mt-8 text-[18px] md:text-[20px] lg:text-[23px]">
            <Checkbox className="text-[18px] md:text-[20px] lg:text-[23px]" value="Fuels">Fuels</Checkbox>
            <Checkbox className="text-[18px] md:text-[20px] lg:text-[23px]" value="Bioenergy">Bioenergy</Checkbox>
            <Checkbox className="text-[18px] md:text-[20px] lg:text-[23px]" value="Refrigerant and others">Refrigerant and others</Checkbox>
            <Checkbox className="text-[18px] md:text-[20px] lg:text-[23px]" value="Passenger vehicles">Passenger vehicles</Checkbox>
            <Checkbox className="text-[18px] md:text-[20px] lg:text-[23px]" value="Delivery vehicles">Delivery vehicles</Checkbox>
            <Checkbox className="text-[18px] md:text-[20px] lg:text-[23px]" value="SEWR KWh pass and delivery vehicles">SEWR KWh pass and delivery vehicles</Checkbox>
          </div>
        </Checkbox.Group>
      </div>
    </div>
  );
}
