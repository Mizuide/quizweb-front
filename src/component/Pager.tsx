
type panelProp = {
   display: string;
   onClick: () => void;
   disable: boolean;
}

const Panel: React.FC<panelProp> = (prop) => {
   return (<div className={`panel disable ${prop.disable}`} onClick={prop.disable ? () => false : prop.onClick} >{prop.display}</div>)
}

type prop = {
   page: number;
   maxFlg: boolean;
   setPage: (number: number) => void
}

const Pager: React.FC<prop> = (prop) => {



   return (<div className='pager'>
      <Panel display={'next'} onClick={() => prop.setPage(prop.page + 1)} disable={prop.maxFlg} />
      <div className='current_page'>{prop.page}</div>
      <Panel display={'prev'} onClick={() => prop.setPage(prop.page - 1)} disable={prop.page <= 1} />
   </div>);
}

export default Pager;