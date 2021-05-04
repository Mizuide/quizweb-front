
type panelProp = {
   display: string,
   onClick: () => void

}

const Panel: React.FC<panelProp> = (prop) => {
   return (<div className='panel' onClick={prop.onClick} >{prop.display}</div>)
}

type prop = {
   page: number,
   setPage: (number:number) => void
}

const Pager: React.FC<prop> = (prop) => {

   return (<div className='pager'>
      <Panel display={'next'} onClick={() => prop.setPage(prop.page + 1)} />
      <div className='current_page'>{prop.page}</div>
      <Panel display={'prev'} onClick={() => prop.setPage(prop.page - 1)} />
   </div>);
}

export default Pager;