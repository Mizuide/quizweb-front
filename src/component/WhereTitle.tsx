import { ReactElement } from "react";
import { Input } from "semantic-ui-react";

interface WhereTitle extends ReactElement { }

type prop = {
    setWhereTitle: (title: string) => void
    onButtonClick:() => void
}

const WhereTitle: React.FC<prop> = (prop) => {
    return (
        <div className='whereTitle'>
            <Input onChange={(e) => prop.setWhereTitle(e.target.value)} action={{"content":'検索',"icon":'search','onClick':prop.onButtonClick }} />
        </div>
    )
}



export default WhereTitle;