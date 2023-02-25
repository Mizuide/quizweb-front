
type prop = {
  
}

const EditError: React.FC<prop> = (prop: prop) => {
  return(
    <>
      パスワードが間違っています
      <br/>
      認証に失敗しました
    </>
  )
}

export default EditError;