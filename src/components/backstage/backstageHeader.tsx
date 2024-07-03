import React from "react";
import { user } from '../strapi/strapi_entries'
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from '../../context/authContext'
import { removeToken } from '../strapi/strapi_interface'
import { Button, Space } from "antd";

export const BackstageHeader = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    navigate("/signin", { replace: true });
  };

  return (
    <Space className="">
      <Space className="">
        {user ? (
          <>
            <Button className="" href="/backstage/profile" type="link">
              {user.username}
            </Button>
            <Button className="" type="primary" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button className="" href="/backstage/signin" type="link">
              Login
            </Button>
            <Button className="" href="/backstage/signup" type="primary">
              SignUp
            </Button>
          </>
        )}
      </Space>
    </Space>
  )
};

