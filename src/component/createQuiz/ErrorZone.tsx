import css  from "../../css/createQuizForm.module.scss"
 
type prop = {
  errorMessage:string;
}

const ErrorZone: React.FC<prop> = (prop: prop) => {
  return(
    <div className={css.error}>
      {prop.errorMessage}
    </div>
  )
}

export default ErrorZone;