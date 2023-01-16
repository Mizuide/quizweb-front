import { throws } from "assert";
import { useContext } from "react";
import { loginUserContext } from "../../App";
import EditProfile from "./EditProfile";
import MyQuizes from "./MyQuizes";

type prop = {
}

const MyPage: React.FC<prop> = (prop: prop) => {
  const loginUser = useContext(loginUserContext)

  if(loginUser === undefined){
      throw new Error('ログイン後にアクセスしてください。');
  }

  return (
    <>
      <EditProfile loginUser={loginUser}/>
      {/* <MyQuizes searchCondition={{createUserId:loginUser.id}}/> */}
    </>
  )}

export default MyPage;