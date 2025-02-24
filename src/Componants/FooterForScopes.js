import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { Button } from "antd";

export default function FooterForScopes({ pageChange, setPageChange, changeShope, setChangeShope }) {

  console.log("ChangeShop", changeShope);

  return (
    <>
      <div className="flex justify-center  gap-4 mt-6 w-full"> {/* Change justify-center to justify-start and width to w-full */}
        {/* Show "Previous Page" button only if `pageChange` is greater than 0 and `changeShope` is 1 */}
        {changeShope === 1 && (
          <Button
            onClick={() => setChangeShope(changeShope - 1)}
            className="bg-green-500 text-black border border-green-500 px-6 py-3 rounded-lg text-lg font-semibold flex hover:bg-green-600 focus:ring-0"
          >
            <ArrowLeftOutlined /> Move to Scope 1
          </Button>
        )}

        {pageChange === 0 && changeShope === 2 && (
          <Button
            onClick={() => {
              setChangeShope(1);
              setPageChange(0);
            }}
            className="bg-green-500 text-black border border-green-500 px-6 py-3 rounded-lg text-lg font-semibold flex items-center hover:bg-green-600 focus:ring-0"
          >
            <ArrowLeftOutlined /> Move to Scope 2
          </Button>
        )}

        {pageChange > 0 && (
          <Button
            type="default"
            onClick={() => setPageChange(pageChange - 1)}
            className="bg-green-500 text-black border border-green-500 px-6 py-3 rounded-lg text-lg font-semibold flex items-center hover:bg-green-600 focus:ring-0"
            disabled={pageChange <= 0} // Disable button when `pageChange` is 0
          >
            <ArrowLeftOutlined className="text-black" />
          </Button>
        )}

        {/* Show "Next Page" button only if `pageChange` is less than 3 */}
        {pageChange < 3 && (
          <Button
            onClick={() => setPageChange(pageChange + 1)}
            className="bg-green-500 text-black border border-green-500 px-6 py-3 rounded-lg text-lg font-semibold flex items-center hover:bg-green-600 focus:ring-0"
            disabled={pageChange >= 6} // Disable button when `pageChange` reaches 6
          >
            <ArrowRightOutlined />
          </Button>
        )}

        {/* Show "Move to Scope 2" button when `pageChange` is 3 and `changeShope` is 1 */}
        {pageChange === 3 && changeShope === 0 && (
          <Button
            onClick={() => {
              setChangeShope(changeShope + 1);
              setPageChange(0);
            }}
            className="bg-green-500 text-black border border-green-500 px-6 py-3 rounded-lg text-lg font-semibold flex items-center hover:bg-green-600 focus:ring-0"
          >
            Move to Scope 2 <ArrowRightOutlined />
          </Button>
        )}

        {pageChange === 3 && changeShope === 1 && (
          <Button
            onClick={() => {
              setChangeShope(changeShope + 1);
              setPageChange(0);
            }}
            className="bg-green-500 text-black border border-green-500 px-6 py-3 rounded-lg text-lg font-semibold flex items-center hover:bg-green-600 focus:ring-0"
          >
            Move to Scope 3 <ArrowRightOutlined />
          </Button>
        )}
      </div>
    </>
  );
}
