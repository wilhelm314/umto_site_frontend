import React from "react";
import { user_entry } from '../strapi/strapi_entries'
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from '../../context/authContext'
import { Button, Space } from "antd";

export const BackstageHeader = () => {
  const { user, isLoading, setToken } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken(null);
    navigate("/backstage/signin", { replace: true });
  };

  return (
    <Space className="">
      <Space className="">
        {
          isLoading ?
            <div>loading...</div>
            :
            user ? (
              <>
                <Button className="" href="/backstage/profile" type="link">
                  {user.username}
                </Button>
                <Button className="" type="primary" onClick={handleLogout}>
                  Log ud
                </Button>
              </>
            ) : (
              <>
                <Button className="" href="/backstage/signin" type="primary">
                  Log ind
                </Button>
              </>
            )
        }
      </Space>
    </Space>
  )
};

