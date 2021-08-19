import axios from 'axios';
import { ReactElement, useContext, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { Container, Menu, MenuItemProps } from 'semantic-ui-react';
import { loginUserContext } from "../../App";
import api from "../../property/api.json";
import loginUser from "../../type/loginUser";

type prop = {
  setLoginUser: React.Dispatch<React.SetStateAction<loginUser | undefined>>

}

const Header: React.FC<prop> = (prop: prop) => {
  const loginUser = useContext(loginUserContext)
  const [loginZone, setLoginZone] = useState<ReactElement>(<span />);
  useEffect(() => {
    if (loginUser !== undefined) {
      setLoginZone(<span>ようこそ{loginUser.name}さん</span>);
    } else {
      const loginHTML: ReactElement = (<a href="/quizWeb/doAuth" >
        <img alt="twitterログイン" src="/quizWeb/img/sign-in-with-twitter-gray.png.img.fullhd.medium.png" />
      </a>)
      setLoginZone(loginHTML);
    }
  }, [loginUser])


  useEffect(() => {
    axios.get(api.login.url).then(res => prop.setLoginUser(res.data)).catch(e => prop.setLoginUser(undefined));
  }, [])

  const [activeItem, setActiveItem] = useState<string|undefined>('ranking');
  
  const clickHandler = (e:React.MouseEvent<HTMLAnchorElement, MouseEvent>,data:MenuItemProps) => {
    setActiveItem(data.name)
    e.currentTarget.querySelector('a')?.click()
  }
  return (
      <Menu stackable pointing>
        <Menu.Item name='ranking' active={activeItem === 'ranking'} onClick={clickHandler}>
          ランキング
        </Menu.Item>
        <Menu.Item name='search' active={activeItem === 'search'} onClick={clickHandler}>
          <Link to={'/search'} >
            クイズを探す
          </Link>
        </Menu.Item>
        <Menu.Item name='create' active={activeItem === 'create'} onClick={clickHandler}>
          <Link to={'/create'} >
            クイズを作る
          </Link>
        </Menu.Item>
        <Menu.Item position={'right'}>
          {loginZone}
        </Menu.Item>
      </Menu>
  )
}

export default Header;