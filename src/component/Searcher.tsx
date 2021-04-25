import axios from "axios";
import React from "react";

const Searcher:React.FC = () => {
    const searchButton = (<button>検索</button>)

    return(<div>{searchButton}</div>)
}

//jsxなので<T extends {}>と書く
const useSearcher =<T extends {}> (url:string) => { 
const fetch = axios.get<T>(url);
    return[(<div/>),fetch]
}

export default useSearcher;