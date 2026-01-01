import React from "react";
import WalletValue from "./WalletValue";
import TopWinners from "./TopWinners";
import WatchList from "./WatchList";
import PortfolioDistribution from "./PortfolioDistribution";
import PortfolioTable from "./PortfolioTable";

const Analytics = () => {
  //https://www.google.com/search?sca_esv=bd4d588058061689&rlz=1C1VDKB_enCA1019CA1019&sxsrf=AE3TifOY8h-18iOFVSOYVDfjQe3KlG82lQ:1762665309649&udm=2&fbs=AIIjpHxU7SXXniUZfeShr2fp4giZrjP_Cx0LI1Ytb_FGcOviEiTm5uW1q0uNfK7KsnoL8hWZUZ3ZEPhe0cPqXxrOlmBaXNrzSbxDmRd08BPr8JCE3pVXYUHMVNzdlQeeldqIj87HIh_qeWv2dsxbnJ6fPc2VELOiSSXbq2vRa_L6GfTrXQznUpA3DmHKLfLVZ-NW_OcQP4WcPD_F2IquG9nkLmmIOrc7Ug&q=crypto+tracker+analytics+dashboard&sa=X&ved=2ahUKEwiV3Y79p-SQAxXnkokEHU5ROYUQtKgLegQIEhAB&biw=1920&bih=945&dpr=1#sv=CAMSVhoyKhBlLVdiakxKZS1yRTVSdm9NMg5XYmpMSmUtckU1UnZvTToOOXVtVHV5aWJaaEVxMk0gBCocCgZtb3NhaWMSEGUtV2JqTEplLXJFNVJ2b00YADABGAcg6Oi5NDACSgoIAhACGAIgAigC
  //https://www.google.com/search?sca_esv=bd4d588058061689&rlz=1C1VDKB_enCA1019CA1019&sxsrf=AE3TifOY8h-18iOFVSOYVDfjQe3KlG82lQ:1762665309649&udm=2&fbs=AIIjpHxU7SXXniUZfeShr2fp4giZrjP_Cx0LI1Ytb_FGcOviEiTm5uW1q0uNfK7KsnoL8hWZUZ3ZEPhe0cPqXxrOlmBaXNrzSbxDmRd08BPr8JCE3pVXYUHMVNzdlQeeldqIj87HIh_qeWv2dsxbnJ6fPc2VELOiSSXbq2vRa_L6GfTrXQznUpA3DmHKLfLVZ-NW_OcQP4WcPD_F2IquG9nkLmmIOrc7Ug&q=crypto+tracker+analytics+dashboard&sa=X&ved=2ahUKEwiV3Y79p-SQAxXnkokEHU5ROYUQtKgLegQIEhAB&biw=1920&bih=945&dpr=1#sv=CAMSVhoyKhBlLVNsZXdoSkszcWZmQWtNMg5TbGV3aEpLM3FmZkFrTToOSUZOV2VTQWZBenRVRE0gBCocCgZtb3NhaWMSEGUtU2xld2hKSzNxZmZBa00YADABGAcgp8avhw4wAkoKCAIQAhgCIAIoAg
  //https://www.google.com/search?sca_esv=bd4d588058061689&rlz=1C1VDKB_enCA1019CA1019&sxsrf=AE3TifOY8h-18iOFVSOYVDfjQe3KlG82lQ:1762665309649&udm=2&fbs=AIIjpHxU7SXXniUZfeShr2fp4giZrjP_Cx0LI1Ytb_FGcOviEiTm5uW1q0uNfK7KsnoL8hWZUZ3ZEPhe0cPqXxrOlmBaXNrzSbxDmRd08BPr8JCE3pVXYUHMVNzdlQeeldqIj87HIh_qeWv2dsxbnJ6fPc2VELOiSSXbq2vRa_L6GfTrXQznUpA3DmHKLfLVZ-NW_OcQP4WcPD_F2IquG9nkLmmIOrc7Ug&q=crypto+tracker+analytics+dashboard&sa=X&ved=2ahUKEwiV3Y79p-SQAxXnkokEHU5ROYUQtKgLegQIEhAB&biw=1920&bih=945&dpr=1#sv=CAMSVhoyKhBlLXAzS2RpWU9GN1haVkNNMg5wM0tkaVlPRjdYWlZDTToONkJTRmVvX1FhTTZMY00gBCocCgZtb3NhaWMSEGUtcDNLZGlZT0Y3WFpWQ00YADABGAcg-_ziiwswAkoKCAIQAhgCIAIoAg
  return (
    <div>
      <div className="mb-10">
        <h1 className="text-3xl font-semibold pt-5 bg-gradient-to-br from-orange-400 via-rose-500 to-purple-700 bg-clip-text text-transparent">
          Investment Overview
        </h1>
        <p1 className="text-lg mb-15 bg-gradient-to-br from-purple-500 to-purple-700 bg-clip-text text-transparent">
          Your portfolio at a glance — track, analyze, and optimize your
          investments.
        </p1>
        <hr className="border-gray-500 my-1 w-[50%] mx-auto mt-5"></hr>
      </div>
      <div className="flex flex-row justify-center ">
        <WalletValue></WalletValue>
      </div>
      <div className="ml-80 mt-15 pb-10">
        <div className="flex flex-row justify-between w-[1280px] ">
          <PortfolioTable></PortfolioTable>
          <PortfolioDistribution></PortfolioDistribution>
        </div>
        <WatchList></WatchList>
      </div>
    </div>
  );
};

export default Analytics;
