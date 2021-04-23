
 const Panel:React.FC<number> = (number:number) =>{

    return(<div className='panel'> </div>)
 } 


 const Pager:React.FC<[number,React.Dispatch<React.SetStateAction<number>>]> = ([page,setPage]) => {

    return(<div onClick={() => setPage(page+1)}>next</div>);
}

export default Pager;