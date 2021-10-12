import axios from 'axios';
import React, { useContext, useEffect, useState } from "react";
import { loginUserContext } from "../../App";
import loginUser from "../../type/loginUser";

const LOGIN_URL = "/quizWeb/login";

type prop = {
   setLoginUser: React.Dispatch<React.SetStateAction<loginUser|undefined>>
}

const LoginForm: React.FC<prop> = (prop: prop) => {
    const loginUser = useContext(loginUserContext)
    const [message,setMessage] = useState<string>('ログイン処理中…');
    useEffect(() => {
        axios.get(LOGIN_URL).then(res => prop.setLoginUser(res.data)).catch(e => prop.setLoginUser(undefined));
    },[])

    useEffect(() => {
        if(loginUser !== undefined)
            setMessage(`ログインしました　ようこそ${loginUser.name}さん`)
    },[loginUser])

return(
    <div>
      {message}
    </div>
  )
}

export default LoginForm;