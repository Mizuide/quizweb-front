

 const Panel:React.FC<string> = (display:string,onClick:()=>{}) =>{
    return(<div className='panel' onClick={onClick}>{display}</div>)
   } 


 const Pager:React.FC<[number,React.Dispatch<React.SetStateAction<number>>]> = ([page,setPage]) => {

    return(<div onClick={() => setPage(page+1)}>next</div>);
}

export default Pager;