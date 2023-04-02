import axios from 'axios';
import { ReactElement, useContext, useEffect, useState } from "react";
import { Link, useHistory } from 'react-router-dom';
import { Dropdown, Menu, MenuItemProps } from 'semantic-ui-react';
import { loginUserContext } from "../../App";
import api from "../../property/api.json";
import loginUser from "../../type/loginUser";
import MediaQuery from "react-responsive";


type prop = {
  setLoginUser: React.Dispatch<React.SetStateAction<loginUser | undefined>>
}

const Header: React.FC<prop> = (prop: prop) => {

  const history = useHistory();
  const loginUser = useContext(loginUserContext)
  const [loginZone, setLoginZone] = useState<ReactElement>(<span />);

  useEffect(() => {
    if (loginUser !== undefined) {
      const hamburgerMenu = (
        <>
          <Dropdown text='メニュー'
            floating
            labeled
            className='icon'
            icon='align justify'
          >
            <Dropdown.Menu>
              <Dropdown.Item text='マイページ' icon='user' onClick={() => history.push('/mypage')} />
              <Dropdown.Item text='ログアウト' icon='log out' />
            </Dropdown.Menu>
          </Dropdown>
        </>)
      setLoginZone(hamburgerMenu);
    } else {
      const loginHTML: ReactElement = (<a href="/quizWeb/api/doAuth" >
        <img alt="twitterログイン" src="/quizWeb/img/sign-in-with-twitter-gray.png.img.fullhd.medium.png" />
      </a>)
      setLoginZone(loginHTML);
    }
  }, [loginUser])

  useEffect(() => {
    axios.post(api.login.url).then(res => prop.setLoginUser(res.data)).catch(e => prop.setLoginUser(undefined));
  }, [])

  const [activeItem, setActiveItem] = useState<string | undefined>('ranking');
  const clickHandler =
    (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, data: MenuItemProps) => {
      setActiveItem(data.name);
      e.currentTarget.querySelector('a')?.click();
    }


  return (
    <>
      <MediaQuery query='(min-width: 768px)'>
        <Menu pointing>
          {/* <Menu.Item name='ranking'
            active={activeItem === 'ranking'} onClick={clickHandler} >
            ランキング
          </Menu.Item> */}
          <Menu.Item name='search'
            active={activeItem === 'search'} onClick={clickHandler} >
            <Link to={'/search'} >
              クイズを探す
            </Link>
          </Menu.Item>
          <Menu.Item
            name='create' active={activeItem === 'create'} onClick={clickHandler} >
            {/* <a
              onClick={(e) => {
                axios.get(api.createQuiz.url).then(res => history.push(`/edit/${res.data.id}`));
                // HACK:a要素をクリックするとa要素+itemで2回走ってしまうのでバブリングを抑止する
                e.stopPropagation();
              }
              }
            >
              クイズを作る
            </a> */}
            {/* <Link to={'/edit/0'} >
              クイズを作る
            </Link> */}
            <Link to={'/create'} >
              クイズを作る
            </Link>
          </Menu.Item>
          <Menu.Item position='right'>
            {loginZone}
          </Menu.Item>
        </Menu>
      </MediaQuery>
      <MediaQuery query='(max-width: 767px)'>
        <Menu style={{ 'font-size': '0.8rem' }} pointing widths={4}>
          {/* <Menu.Item name='ranking'
            active={activeItem === 'ranking'} onClick={clickHandler} >
            ランキング
          </Menu.Item> */}
          <Menu.Item name='search'
            active={activeItem === 'search'} onClick={clickHandler} >
            <Link to={'/search'} >
              クイズを探す
            </Link>
          </Menu.Item>
          <Menu.Item
            name='create' active={activeItem === 'create'} onClick={clickHandler} >
            <Link to={'/create'} >
              クイズを作る
            </Link>

            {/* <a
              onClick={(e) => {
                axios.get(api.createQuiz.url).then(res => history.push(`/edit/${res.data.id}`));
                // HACK:a要素をクリックするとa要素+itemで2回走ってしまうのでバブリングを抑止する
                e.stopPropagation();
              }
              }
            >
              クイズを作る
            </a> */}
          </Menu.Item>
          <Menu.Item />
          <Menu.Item position='right'>
            {loginZone}
          </Menu.Item>
        </Menu>

      </MediaQuery>
    </>
  )
}

export default Header;