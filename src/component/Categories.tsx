import { ReactElement } from 'react';
import * as categoryConst from '../const/category'

interface Categories extends ReactElement{}

type CategotyProp = {
    key:number,
    category:categoryConst.category,
    setCategory: (id:categoryConst.categoryId) => void
}

const Category:React.FC<CategotyProp> = (prop: CategotyProp) => {
   return (<div className='category' key={prop.key} onClick={() => { prop.setCategory(prop.category.id) }}>
        <div className='name'>
            {prop.category.name}
        </div>
        <div className='img'>
            <img src={prop.category.img} />
        </div>
    </div>)
}

type prop = {
        setCategory: (id:categoryConst.categoryId) => void
}

const Categories:React.FC<prop> = (prop: prop) => {

    let categories:ReactElement[] = [];
    let keyCount = 0
    for (let category of categoryConst.categoryList) {
        let categoryElement = Category({key:keyCount,category: category, setCategory: prop.setCategory })
        if(categoryElement !== null){
            categories.push(categoryElement);
        }
        keyCount++;
    }

    return(<div className='categories'>{categories}</div>)
}

export default Categories;