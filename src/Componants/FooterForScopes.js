import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons"
import { useState } from "react";
import { Button } from "antd";

export default function FooterForScopes(){

 
      const [pageChange, setPageChange] = useState(1);

    <>

    <div className="flex justify-center gap-4 mt-6">
        {/* Transparent Button with Green Border & Arrow */}
        {pageChange == 0 ? null : ( <Button onPress={() => setPageChange(pageChange - 1)}
          className="bg-transparent text-green-500 border border-green-500 px-6 py-3 rounded-lg text-lg font-semibold flex items-center
          hover:border-green-500 focus:border-green-500 focus:ring-0 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={pageChange <= 0 }

        >
          <ArrowLeftOutlined className="text-green-500" />
        </Button>) }
       

        {/* White Background Button with Green Border & Arrow */}
        <Button onPress={() => setPageChange(pageChange + 1)}
          className="bg-[#27a376] text-green-500 border border-green-500 px-6 py-3 rounded-lg text-lg font-semibold flex items-center
          hover:border-green-500 focus:border-green-500 focus:ring-0 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={pageChange >= 6}
        >
          <ArrowRightOutlined className="text-white bg-[]" />
        </Button>
      </div>


    
    </>




}