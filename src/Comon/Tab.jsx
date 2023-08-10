import React from "react";

export default function Tab({ accountData, tabData, setTabData }) {
  return (
    <div className="flex w-[215px] h-[44px] items-center justify-center rounded-full bg-richblack-800 mt-5 mb-5 p-1">
      {accountData.map((data) => (
        <div key={data.id}>
          <button
            className={`w-[100px] h-[36px] rounded-full ${tabData === data.account_type 
            ? (" bg-richblack-900") : ("")}`}
            onClick={() => setTabData(data.account_type)}
          >
            {data.account_type}
          </button>
        </div>
      ))}
    </div>
  );
}
