
import { EditOutlined, FormOutlined, TableOutlined, CheckCircleOutlined, FileDoneOutlined } from "@ant-design/icons";
import Link from "next/link";

export function TemplateCreation() {
  const options = [
    { icon: <FormOutlined />, text: "Create Template"  ,move : "/ScopeOne"},
    { icon: <EditOutlined />, text: "Edit Template" ,move : "/ScopeOne"},
    { icon: <TableOutlined />, text: "Enter Actual Data" ,move : "/ScopeOne"},
    { icon: <FileDoneOutlined />, text: "Enter Target Data" ,move : "/ScopeOne" },
    { icon: <CheckCircleOutlined />, text: "Validate Actual Data" ,move : "/ScopeOne"},
    { icon: <CheckCircleOutlined />, text: "Validate Target Data" ,move : "/ScopeOne"},
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="rounded-lg p-6 w-full max-w-md ">
        <h2 className="text-2xl font-bold text-center mb-4">What do you want to do?</h2>
        <div className="flex flex-col gap-4 ">
          {options.map((option, index) => (
            <div
              key={index}
              className="flex items-center gap-3 bg-[#39CD98] hover:shadow-xl text-white text-lg font-semibold rounded-lg p-4 cursor-pointer transition duration-300"
            >
              {option.icon}
            <Link href={option.move}>{option.text}</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TemplateCreation;
