import { ReactElement } from "react";

interface WhereTitle extends ReactElement { }

type prop = {
    setWhereTitle: (title: string) => void
}

const WhereTitle: React.FC<prop> = (prop) => {
    return (
        <div className='whereTitle'>
            <input type='search' className='input' onChange={(e) => prop.setWhereTitle(e.target.value)} />
        </div>
    )
}



export default WhereTitle;