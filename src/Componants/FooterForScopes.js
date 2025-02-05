import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { Button } from "antd";

// FooterForScopes component receives `pageChange`, `setPageChange`, `changeShope`, and `setChangeShope` as props
export default function FooterForScopes({ pageChange, setPageChange, changeShope, setChangeShope }) {
  return (
    <>
      <div className="flex justify-center  gap-4 mt-6 w-1">
        {/* Show "Previous Page" button only if `pageChange` is greater than 0 and `changeShope` is 1 */}

        {changeShope === 2 && (
          <Button
            onClick={() => setChangeShope(changeShope - 1)}
            className="bg-[#27a376] gap-4 text-white border  border-green-500 px-6 py-3 rounded-lg text-lg font-semibold flex 
            hover:border-green-500 focus:border-green-500 focus:ring-0 disabled:opacity-50 disabled:cursor-not-allowed "
          >
            <ArrowLeftOutlined /> Move to Scope 1
          </Button>
        )}


        {pageChange > 0 &&    (
          <Button
            type="default"
            onClick={() => setPageChange(pageChange - 1)}
            className="bg-transparent text-green-500 border border-green-500 px-6 py-3 rounded-lg text-lg font-semibold flex items-center
            hover:border-green-500 focus:border-green-500 focus:ring-0 disabled:opacity-50 disabled:cursor-not-allowed "
            disabled={pageChange <= 0} // Disable button when `pageChange` is 0
          >
            <ArrowLeftOutlined className="text-green-500" />
          </Button>
        )}

        {/* Show "Next Page" button only if `pageChange` is less than 3 */}
        {pageChange < 3 &&(
          <Button
            onClick={() => setPageChange(pageChange + 1)}
            className="bg-[#27a376] text-white border border-green-500 px-6 py-3 rounded-lg text-lg font-semibold flex items-center
            hover:border-green-500 focus:border-green-500 focus:ring-0 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={pageChange >= 6} // Disable button when `pageChange` reaches 6
          >
            <ArrowRightOutlined />
          </Button>
        )}





        {/* Show "Move to Scope 2" button when `pageChange` is 3 and `changeShope` is 1 */}
        {pageChange === 3 && changeShope === 1 && (
          <Button
            onClick={() => { setChangeShope(changeShope + 1);
                          setPageChange(0)}
             }
            className="bg-[#27a376] gap-4 text-white border border-green-500 px-6 py-3 rounded-lg text-lg font-semibold flex items-center
            hover:border-green-500 focus:border-green-500 focus:ring-0 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Move to Scope 2 <ArrowRightOutlined />
          </Button>
        )}

        {/* Show "Move to Scope 1" button when `changeShope` is 2 */}
   
      </div>
    </>
  );
}
