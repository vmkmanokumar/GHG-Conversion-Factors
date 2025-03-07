"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // ✅ Import Next.js router
import { Button } from "antd"; // ✅ Import Ant Design Button

const TemplateSelector = () => {
  const [templates, setTemplates] = useState([]); // Store fetched templates
  const [selected, setSelected] = useState(null); // Track selected template
  const [userId, setUserId] = useState("");
  const router = useRouter(); // ✅ Initialize router

  // Load user ID from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("username");
      if (storedUserId) {
        setUserId(storedUserId);
      }
    }
  }, []);

  // Fetch templates after userId is set
  useEffect(() => {
    if (!userId) return;

    const fetchTemplates = async () => {
      try {
        const response = await fetch(
          `https://ghg-conversion-factors-backend.vercel.app/getTemplates?username=${userId}`,
          { method: "GET" }
        );

        const data = await response.json();
        console.log("Fetched Data:", data);
        setTemplates(data.templates || []);
      } catch (error) {
        console.error("Error fetching templates:", error);
      }
    };

    fetchTemplates();
  }, [userId]);

  // ✅ Handle Next button click
  const handleNext = () => {
    if (selected) {
      localStorage.setItem("selectedTemplate", selected); // ✅ Store template in localStorage
      router.push("/tableView"); // ✅ Navigate to the table page
    } else {
      alert("Please select a template before proceeding!");
    }
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h2 className="text-lg font-semibold mb-4">Choose a saved template</h2>
      <div className="w-80">
        {templates.map((template) => (
          <button
            key={template}
            onClick={() => setSelected(template)}
            className={`w-full px-4 py-2 border rounded-lg text-left mb-2 transition-all ${
              selected === template
                ? "border-green-500 text-black bg-green-100"
                : "border-gray-300 text-gray-700"
            }`}
          >
            {template}
          </button>
        ))}
      </div>

      {selected && (
        <div className="mt-4 text-sm text-gray-700">
          Selected Template: <strong>{selected}</strong>
        </div>
      )}

      {/* ✅ Next Button */}
      <Button onClick={handleNext} type="primary" size="large" className="mt-4">
        Next
      </Button>
    </div>
  );
};

export default TemplateSelector;



// "use client";

// import { useState, useEffect } from "react";

// const TemplateSelector = () => {
//   const [templates, setTemplates] = useState([]); // Store fetched templates
//   const [selected, setSelected] = useState(null); // Track selected template
//   const [userId, setUserId] = useState("");

//   // Load user ID from localStorage
//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const storedUserId = localStorage.getItem("username");
//       if (storedUserId) {
//         setUserId(storedUserId);
//       }
//     }
//   }, []);

//   // Fetch templates after userId is set
//   useEffect(() => {
//     if (!userId) return; // Don't fetch if userId is not set

//     const fetchTemplates = async () => {
//       try {
//         const response = await fetch(
//           `http://127.0.0.1:5000/getTemplates?username=${userId}`,
//           { method: "GET" }
//         );

//         const data = await response.json();
//         console.log("Fetched Data:", data);

//         setTemplates(data.templates || []); // Ensure it's an array
//       } catch (error) {
//         console.error("Error fetching templates:", error);
//       }
//     };

//     fetchTemplates();
//   }, [userId]); // Runs only when userId is updated

//   return (
//     <div className="flex flex-col items-center mt-10">
//       <h2 className="text-lg font-semibold mb-4">Choose a saved template</h2>
//       <div className="w-80">
//         {templates.map((template) => (
//           <button
//             key={template}
//             onClick={() => setSelected(template)} // Update selected template
//             className={`w-full px-4 py-2 border rounded-lg text-left mb-2 transition-all ${
//               selected === template
//                 ? "border-green-500 text-black bg-green-100"
//                 : "border-gray-300 text-gray-700"
//             }`}
//           >
//             {template}
//           </button>
//         ))}
//       </div>

//       {selected && (
//         <div className="mt-4 text-sm text-gray-700">
//           Selected Template: <strong>{selected}</strong>
//         </div>
//       )}


// <button className="h-16 w-16 rounded-lg border-2 border-green-500 bg-green-100 text-black font-semibold shadow-md hover:bg-green-200 active:scale-95 transition">
//   Next
// </button>

//     </div>
//   );
// };

// export default TemplateSelector;
