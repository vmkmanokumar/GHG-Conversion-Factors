import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { Button } from "antd";

export default function FooterForScopes({ pageChange, setPageChange, changeShope, setChangeShope }) {

  console.log("ChangeShope:", changeShope);
  console.log("PageChange:", pageChange);

  return (
    <>
      <div className="flex justify-center sm:justify-start flex-wrap gap-3 sm:gap-4 mt-6 w-full px-4">
        
        {/* Move to Previous Scope */}
        {changeShope > 0 && (
          <Button
            onClick={() => setChangeShope(changeShope - 1)}
            className="bg-[#27A376] text-black border border-green-500 
                      px-4 sm:px-6 py-2 sm:py-3 rounded-lg 
                      text-sm sm:text-lg font-semibold flex items-center 
                      hover:bg-green-600 focus:ring-0"
          >
            <ArrowLeftOutlined className="mr-2" /> Move to Scope {changeShope}
          </Button>
        )}

        {/* Move to Previous Page */}
        {pageChange > 0 && (
          <Button
            onClick={() => setPageChange(pageChange - 1)}
            className="bg-[#27A376] text-black border border-green-500 
                      px-3 sm:px-5 py-2 sm:py-3 rounded-lg 
                      text-sm sm:text-lg font-semibold flex items-center 
                      hover:bg-green-600 focus:ring-0"
          >
            <ArrowLeftOutlined />
          </Button>
        )}

        {/* Move to Next Page */}
        {pageChange < 2 && (
          <Button
            onClick={() => setPageChange(pageChange + 1)}
            className="bg-[#27A376] text-black border border-green-500 
                      px-3 sm:px-5 py-2 sm:py-3 rounded-lg 
                      text-sm sm:text-lg font-semibold flex items-center 
                      hover:bg-green-600 focus:ring-0"
          >
            <ArrowRightOutlined />
          </Button>
        )}

        {/* Move to Scope 2 */}
        {pageChange === 2 && changeShope === 0 && (
          <Button
            onClick={() => {
              setChangeShope(changeShope + 1);
              setPageChange(0);
            }}
            className="bg-[#27A376] text-black border border-green-500 
                      px-4 sm:px-6 py-2 sm:py-3 rounded-lg 
                      text-sm sm:text-lg font-semibold flex items-center 
                      hover:bg-green-600 focus:ring-0"
          >
            Move to Scope 2 <ArrowRightOutlined className="ml-2" />
          </Button>
        )}

        {/* Move to Scope 3 */}
        {pageChange === 3 && changeShope === 1 && (
          <Button
            onClick={() => {
              setChangeShope(changeShope + 1);
              setPageChange(0);
            }}
            className="bg-[#27A376] text-black border border-green-500 
                      px-4 sm:px-6 py-2 sm:py-3 rounded-lg 
                      text-sm sm:text-lg font-semibold flex items-center 
                      hover:bg-green-600 focus:ring-0"
          >
            Move to Scope 3 <ArrowRightOutlined className="ml-2" />
          </Button>
        )}
      </div>
    </>
  );
}
