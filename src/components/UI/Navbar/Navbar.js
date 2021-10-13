import React, { useEffect, useState } from 'react'
import { Button, Menu, Typography, Avatar } from 'antd'
import { HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined, MenuOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import icon from "../../images/logo1.png"
import './Navbar.css'

const Navbar = () => {
    const [activeMenu, setActionMenu] = useState(true);
    const [screenSize, setScreenSize] = useState(null);
    useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth);
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    useEffect(() => {
        if (screenSize < 768) {
            setActionMenu(false);
        }
        else {
            setActionMenu(true);
        }
    }, [screenSize])
    return (
        <div className="nav-container">
            <div className="logo-container">
                <Avatar src={icon} size="large" />
                <Typography.Title level={2} className="logo">
                    <Link to="/">Crypto Info</Link>
                </Typography.Title>
                <Button className="menu-control-container" onClick={() => setActionMenu(!activeMenu)} >
                    <MenuOutlined />
                </Button>
            </div>
            {activeMenu && (
                <Menu theme="dark" >
                    <Menu.Item icon={<HomeOutlined />}>
                        <Link to="/">Home</Link>
                    </Menu.Item>
                    <Menu.Item icon={<FundOutlined />}>
                        <Link to="/cryptocurrencies">Cryptocurrencies</Link>
                    </Menu.Item>
                    <Menu.Item icon={<MoneyCollectOutlined />}>
                        <Link to="/exchanges">Exchanges</Link>
                    </Menu.Item>
                    <Menu.Item icon={<BulbOutlined />}>
                        <Link to="/news">News</Link>
                    </Menu.Item>

                </Menu>
            )}

        </div>
    );
};

export default Navbar
