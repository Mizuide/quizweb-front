import { ReactElement, useContext, useEffect, useState } from "react";
import { ItemGroup } from "semantic-ui-react";
import { loginUserContext } from "../../App";
import useFetchQuizes from "../../hooks/useFetchQuizes";
import fetchQuizParam from "../../type/fetchQuizParam";
import searchcondition from "../../type/searchQuizesConditions";
import Pager from "../searchQuiz/Pager";
import MyQuiz from "./MyQuiz";

type prop = {
  searchCondition:searchcondition
}

const MyQuizes: React.FC<prop> = (prop: prop) => {
  const loginUser = useContext(loginUserContext)

  if (loginUser === undefined) {
    throw new Error('ログインしてから利用してください');
  }

  const [quizesInfo, setFetchQuiz] = useFetchQuizes();
  const [page, setPage] = useState<number>(1);
  const [quizCount, setQuizCount] = useState<number>(0);

  const [display, setDispaly] = useState<ReactElement[]>([])

  let initialFetchParan: fetchQuizParam = {
    fetchSize: 10,
    page: page,
    searchConditions: {
      createUserId: loginUser.id
    }
  };

  const [fetchParam, setFetchParam] = useState<fetchQuizParam>(initialFetchParan);

  useEffect(() => setFetchQuiz(fetchParam), [page])
  useEffect(() => {{
    setDispaly(quizesInfo.quizes.map(q => <MyQuiz quiz={q} />));
    setQuizCount(quizesInfo.count);
  }}, [quizesInfo])

  return (
   <>
    <ItemGroup divided>
        {display}
      </ItemGroup>
    <Pager page={page} setPage={setPage} quizCount={quizCount} display={10} />
  </>
  )
}

export default MyQuizes;