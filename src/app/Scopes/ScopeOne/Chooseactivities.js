export default function Chooseactivities({checkedValues}){



    console.log("new page",checkedValues)
    return(
        <>
        
        <div className="flex justify-center items-center bg-[#effbf7] w-full md:w-[768px] lg:w-[1152px] md:mx-auto h-auto md:h-[450px] lg:h-[512px] mt-10 md:mt-16 lg:mt-24 p-4 md:p-6 rounded-xl">
        <div className="w-full md:w-[500px] max-w-2xl rounded-lg p-4 md:p-6 lg:mr-96">
          <h1 className="text-[20px] md:text-[22px] lg:text-[23px] font-black">Scope Factors</h1>

          <div className="mt-4">
            {checkedValues.length === 0 ? (
              <p>No activities selected.</p>
            ) : (
              <ul>
                {checkedValues.map((value, index) => (
                  <li key={index}>{value}</li>
                ))}
              </ul>
            )}
          </div>
         
        </div>
      </div>


        
        
        
        </>


    )





}