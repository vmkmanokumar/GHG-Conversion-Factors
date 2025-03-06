"use client";
import React, { useState } from "react";
import { useScopeOne } from "../Context/ScopeOneContext";

export default function ParametersAndUnits() {
  const [templateName, setTemplateName] = useState("");
   const {
      selectedFuels,
     
    } = useScopeOne();

    console.log("temp name page",selectedFuels)

  const handleSubmit = async () => {
    if (!templateName.trim()) {
      alert("Please enter a template name.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/saveScope1", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scope: "Scope 1 Data", value: selectedFuels }),
      });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();
      console.log("Scope 1 saved successfully:", data);
      alert("Scope 1 has been saved");

    const confirmNavigation = window.confirm("Move to Scope 2 or Dashboard?");
    if (confirmNavigation) {
      window.location.href = "/scope2";  // Change URL as needed
    }


    } catch (error) {
      console.error("Error saving Scope 1:", error);
      alert("Failed to save. Please try again.");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center bg-[#effbf7] w-full md:w-[500px] mx-auto mt-10 p-6 rounded-xl shadow-lg min-h-[200px]">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Enter Template Name</h1>

      <input
        type="text"
        placeholder="Template Name"
        className="w-full px-4 py-2 border rounded-md text-lg focus:outline-none focus:border-emerald-500"
        value={templateName}
        onChange={(e) => setTemplateName(e.target.value)}
      />

      <button
        className="mt-4 px-6 py-2 bg-emerald-500 text-white rounded-md text-lg font-semibold hover:bg-emerald-600"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
}



// "use client";
// import React, { useEffect, useState, useCallback } from "react";
// import { Disclosure } from "@headlessui/react";
// import { ChevronDown } from "lucide-react";
// import { Input, Select } from "antd";
// import { useScopeOne } from "../Context/ScopeOneContext";

// const { Option } = Select;

// export default function ParametersAndUnits() {
//   const { selectedFuels, setSelectedFuels, userId,setUserId } = useScopeOne();
//   const [biogas, setBiogas] = useState([]); // Fix: Change to an array

//   console.log("Selected Fuels:", selectedFuels);

//   // ✅ Fetch biogas data only once
//   useEffect(() => {
//     const fetchBiogasData = async () => {
//       try {
//         const response = await fetch("https://ghg-conversion-factors-backend.vercel.app/biogasData");
//         if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        
//         const data = await response.json();
//         setBiogas(data);
//         console.log("Biogas Data:", data);
//       } catch (error) {
//         console.error("Error fetching biogas data:", error);
//       }
//     };

//     fetchBiogasData();
//   }, []);

//   // ✅ Move `saveDraftData` outside `updateSelectedValues`
//   const saveDraftData = async () => {
//     try {
//       const response = await fetch(`https://ghg-conversion-factors-backend.vercel.app/saveParameter/vmkmano13@gmail.com`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(selectedFuels),
//       });

//       if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

//       const data = await response.json();
//       console.log("Draft saved successfully:", data);
//     } catch (error) {
//       console.error("Error saving draft:", error);
//     }
//   };


//   const getSaveParameters = useCallback(async () => {
//     try {
//       const response = await fetch("https://ghg-conversion-factors-backend.vercel.app/getsaveParameters/vmkmano13@gmail.com", {
//         method: "GET",
//       });
  
//       if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
  
//       const data = await response.json();
//       console.log("Getting logs:", data.valuesunit);
  
//       // Merge only `maxValue` into existing `selectedFuels`
//       setSelectedFuels((prev) => {
//         const updatedFuels = { ...prev };
  
//         Object.keys(data.valuesunit).forEach((category) => {
//           if (!updatedFuels[category]) updatedFuels[category] = {};
  
//           Object.keys(data.valuesunit[category]).forEach((item) => {
//             if (!updatedFuels[category][item]) updatedFuels[category][item] = {};
  
//             Object.keys(data.valuesunit[category][item]).forEach((parameter) => {
//               if (!updatedFuels[category][item][parameter]) {
//                 updatedFuels[category][item][parameter] = {};
//               }
  
//               // Update only `maxValue`
//               updatedFuels[category][item][parameter].maxValue =
//                 data.valuesunit[category][item][parameter].maxValue;
//             });
//           });
//         });
  
//         return updatedFuels;
//       });
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   }, []); // No dependencies
  


  

//   // ✅ Prevent infinite loop with `useCallback`
//   const updateSelectedValues = useCallback(async () => {
//     if (Object.keys(selectedFuels).length === 0) return; // Avoid unnecessary calls

//     try {
//         const scopeList = [];

//         for (const category in selectedFuels) {
//             for (const item in selectedFuels[category]) {
//                 for (const parameter in selectedFuels[category][item]) {
//                     if (selectedFuels[category][item][parameter].checked) {
//                         scopeList.push({
//                             scope: category,
//                             param: parameter,
//                             item: item,
//                             unit: selectedFuels[category][item][parameter]?.selectedValue,
//                             maxValue: selectedFuels[category][item][parameter]?.maxValue || "",  // ✅ Include maxValue
//                         });
//                     }
//                 }
//             }
//         }

//         console.log("Scope List:", scopeList);

//         const response = await fetch("https://ghg-conversion-factors-backend.vercel.app/selectedvalues", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(scopeList),
//         });

//         if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

//         const data = await response.json();
//         console.log("Update successful:", data);

//         // saveDraftData(); // ✅ Call `saveDraftData` only after success
    
//     } catch (error) {
//         console.error("Error updating selected values:", error);
//     }
// }, [selectedFuels]); // ✅ Dependency on `selectedFuels`




// useEffect(() => {
//     if (Object.keys(selectedFuels).length === 0) return; // Avoid unnecessary calls
//     updateSelectedValues();
// }, [selectedFuels]); // Run when `selectedFuels` updates


//   const handleChange = (category, item, parameter, field, value) => {
//     setSelectedFuels((prev) => ({
//       ...prev,
//       [category]: {
//         ...prev[category],
//         [item]: {
//           ...prev[category]?.[item],
//           [parameter]: {
//             ...(prev[category]?.[item]?.[parameter] || {}),
//             [field]: value,
//           },
//         },
//       },
//     }));
//   };

//   return (
//     <div className="flex flex-col justify-center items-center bg-[#effbf7] w-full md:w-[768px] lg:w-[1152px] md:mx-auto mt-10 p-4 md:p-6 rounded-xl shadow-lg min-h-[515px]">
//       <div className="w-full mb-[300]">
//         <div className="w-full mb-4">
//           <h1 className="text-2xl font-bold text-gray-800 mr-[700]">Parameters Maximum Value</h1>
//         </div>

//         <div className="w-full text-[22px]">
//           {Object.keys(selectedFuels).map((category) => (
//             <Disclosure key={category}>
//               {({ open }) => (
//                 <div className="bg-[#BFF1DF] w-full mt-4 rounded-lg shadow-sm">
//                   <Disclosure.Button className="flex justify-between items-center w-full px-4 py-3 text-lg font-medium text-gray-700">
//                     <span>{category}</span>
//                     <ChevronDown className={`w-5 h-5 ${open ? "rotate-180" : "rotate-0"}`} />
//                   </Disclosure.Button>

//                   <Disclosure.Panel className="p-4 bg-[#effbf7] rounded-b-lg">
//                     {Object.keys(selectedFuels[category]).map((item, idx) => (
//                       <Disclosure key={idx}>
//                         {({ open }) => (
//                           <div className="mt-2">
//                             <Disclosure.Button className="flex justify-between items-center w-full px-3 py-2 bg-[#BFF1DF] text-gray-600 rounded-md">
//                               <span>{item}</span>
//                               <ChevronDown className={`w-4 h-4 ${open ? "rotate-180" : "rotate-0"}`} />
//                             </Disclosure.Button>

//                             <Disclosure.Panel className="p-2 bg-[#effbf7] rounded-md mt-1 text-gray-500">
//                               {Object.keys(selectedFuels[category][item])
//                                 .filter((parameter) => selectedFuels[category][item][parameter]?.checked)
//                                 .map((parameter) => {
//                                   const fuelData = biogas.find((b) => b.name === parameter);

//                                   return (
//                                     <div key={parameter} className="p-0 shadow-md">
//                                       <Disclosure>
//                                         {({ open }) => (
//                                           <div>
//                                             <Disclosure.Button className="flex justify-between items-center w-full mt-2 px-3 py-2 bg-[#CBF4E5] text-gray-700 rounded-md">
//                                               <span className="text-sm">{parameter}</span>
//                                               <ChevronDown className={`w-4 h-4 ${open ? "rotate-180" : "rotate-0"}`} />
//                                             </Disclosure.Button>

//                                             <Disclosure.Panel className="p-2 bg-white rounded-lg mt-1">
//                                               <div className="flex items-center gap-4">
//                                                 <Input
//                                                   placeholder="Enter max value"
//                                                   className="w-[344px] border-emerald-400"
//                                                   value={selectedFuels[category]?.[item]?.[parameter]?.maxValue || ""}
//                                                   onChange={(e) => handleChange(category, item, parameter, "maxValue", e.target.value)}
//                                                 />

//                                                 <Select
//                                                   className="w-[410px] border-black"
//                                                   placeholder="Select unit"
//                                                   value={selectedFuels[category]?.[item]?.[parameter]?.selectedValue || undefined}
//                                                   onChange={(unit) => handleChange(category, item, parameter, "selectedValue", unit)}
//                                                 >
//                                                   {fuelData?.values?.map((unit) => (
//                                                     <Option key={unit} value={unit}>
//                                                       {unit}
//                                                     </Option>
//                                                   ))}
//                                                 </Select>
//                                               </div>
//                                             </Disclosure.Panel>
//                                           </div>
//                                         )}
//                                       </Disclosure>
//                                     </div>
//                                   );
//                                 })}
//                             </Disclosure.Panel>
//                           </div>
//                         )}
//                       </Disclosure>
//                     ))}
//                   </Disclosure.Panel>
//                 </div>
//               )}
//             </Disclosure>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
