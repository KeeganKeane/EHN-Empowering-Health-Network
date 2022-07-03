import React, {useState} from "react";
import LikeComment from "./LikeComment";
import ReportComment from "./ReportComment";

const LikeReport = (props) => {
    const [likeCount, setLikeCount] = useState(props.msgObject.overallRating);

    const likeBtnClickHandler = (num) => {
      setLikeCount(likeCount + num);
    }

    return (
      <div className="flex flex-col w-2/4 lg:w-1/3 mx-auto sm:pr-4 lg:pr-0">
        <div className="flex h-full"></div>
        <div className="flex flex-col sm:flex-row py-2 gap-3 h-full object-contain justify-center">
          <div className="flex flex-col sm:flex-row self-center">
            <div className="relative">
              <LikeComment key={props.msgObject.journalId}
                           msgObject={props.msgObject}
                           setErrorFunc={props.setErrorFunc}
                           likeBtnClickHandler={likeBtnClickHandler}
                            className="relative" />
                <div className="absolute -bottom-5 text-sm -right-2 bg-gray-200 px-4 py-3 rounded-full">
                  {likeCount}
                </div>
              </div>
          </div>

          <div className="self-center">
            <ReportComment key={props.msgObject.journalId} msgObject={props.msgObject}  setErrorFunc={props.setErrorFunc} />
          </div>
        </div>
        <div className="flex h-full"></div>
      </div>
    )
}

export default LikeReport;