import { useEffect, useState } from "react";
import { Menu } from "semantic-ui-react";

type prop = {
   page: number;
   quizCount: number;
   display: number;
   setPage: (number: number) => void
}

const Pager: React.FC<prop> = (prop) => {
   console.log(prop);
   const pageNum: number = Math.ceil(prop.quizCount / prop.display);
   const panel: React.FC<number> = (num) => (
      <Menu.Item key={num} active={prop.page === num} onClick={() => {
         prop.setPage(num)
      }} > {num} </Menu.Item>
   )

   const [panels, setPanels] = useState<React.ReactElement[]>([]);
   useEffect(() => {
      let tmp = [];
      for (let i = 1; i <= pageNum; i++) {
         let p = panel(i);
         if (p !== null)
            tmp.push(p);
      }
      setPanels(tmp);
   }, [prop.page, prop.quizCount])

   const extract = (panels: React.ReactElement[], page: number) => {
      const displayNum: number = 6;
      if (page < displayNum) {
         let start = 0;
         let end = start + displayNum;
         if (pageNum > end)
            return panels.slice(start, end).concat([<Menu.Item key={end + 1}>...</Menu.Item>]);
         return panels.slice(start, end);
      } else {
         let ret = [panel(1), (<Menu.Item key={2}>...</Menu.Item>)]

         let start = page - ret.length;
         let end = start + (displayNum - ret.length);

         while (ret.concat(panels.slice(start, end)).length < displayNum)
            start--;
         if (pageNum > end)
            return ret.concat(panels.slice(start, end).concat([<Menu.Item key={end + 1}>...</Menu.Item>]));
         return ret.concat(panels.slice(start, end))
      }
   }

   const disp = extract(panels, prop.page);
   if (prop.quizCount === 0) {
      return null
   } else {
      return (
         <div className='pager'>
            <Menu pagination>
               {disp}
            </Menu>
         </div>);
   }
}

export default Pager;