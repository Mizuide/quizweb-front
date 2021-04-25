import axios from "axios";
import React from "react";

const Searcher:React.FC = () => {
return(<div/>)
}

//jsxなので<T extends {}>と書く
const useSearcher =<T extends {}> (url:string) => { 
const fetch = axios.get<T>(url);
    return[('<div/>'),fetch]
}

export default useSearcher;