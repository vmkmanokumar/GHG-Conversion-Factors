import { Flex } from "antd";
import {CheckboxGroup, Checkbox} from "@heroui/checkbox";
export default function ScopeOneSelection() {
  return (
    <>
      <Flex
        justify="center" // Horizontally center
        align="center"   // Vertically center
        className="mt-24 ml-[320px] h-60 w-60 bg-[#effbf7] rounded-lg"
        style={{ height: "60vh",  width:"130vh"}} // Full viewport height
      >
         <CheckboxGroup defaultValue={["buenos-aires", "london"]} label="Select cities">
      <Checkbox value="buenos-aires">Buenos Aires</Checkbox>
      <Checkbox value="sydney">Sydney</Checkbox>
      <Checkbox value="san-francisco">San Francisco</Checkbox>
      <Checkbox value="london">London</Checkbox>
      <Checkbox value="tokyo">Tokyo</Checkbox>
    </CheckboxGroup>



      </Flex>
    </>
  );
}
