import { useEffect, useRef, useState } from "react"
import { Menu } from "semantic-ui-react"

type panelProp = {
   display: string;
   onClick: () => void;
   disable: boolean;
}

const Panel: React.FC<panelProp> = (prop) => {
   return (<Menu.Item className={`panel disable ${prop.disable}`} onClick={prop.disable ? () => false : prop.onClick} >{prop.display}</Menu.Item>)
}

type prop = {
   page: number;
   quizCount: number;
   display: number;
   setPage: (number: number) => void
}

const Pager: React.FC<prop> = (prop) => {
   const pageNum: number = prop.quizCount / prop.display;
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
   return (
      <div className='pager'>
         <Menu pagination>
            {disp}
         </Menu>
      </div>);
}

export default Pager;