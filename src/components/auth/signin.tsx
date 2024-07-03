
import {
    Alert,
    Button,
    Card,
    Col,
    Form,
    Input,
    message,
    Row,
    Spin,
    Typography,
} from "antd";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/authContext";
import { api_adress } from "../strapi/strapi_interface";
import { setToken } from "../strapi/strapi_interface";

interface signInInput {
    email: string;
    password: string;
}

type signInError = {
    status: number,
    name: string,
    message: string,
    details: {}
}


const SignIn = () => {

    const isSignInError = (error: any): error is signInError => {
        return (error as signInError).message !== undefined;
    };

    const navigate = useNavigate();

    const { setUser } = useAuthContext();

    const [isLoading, setIsLoading] = useState(false);

    const [error, setError] = useState("");

    const onFinish = async (values: signInInput) => {
        setIsLoading(true);
        try {
            const value = {
                identifier: values.email,
                password: values.password,
            };
            const response = await fetch(`${api_adress}/api/auth/local`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(value),
            });

            const data = await response.json();
            if (data?.error) {
                throw data?.error;
            } else {
                // set the token
                setToken(data.jwt);

                // set the user
                setUser(data.user);

                message.success(`Welcome back ${data.user.username}!`);

                navigate("/backstage/profile", { replace: true });
            }
        } catch (err) {
            if (isSignInError(err)) {
                setError(err.message);
            } else {
                setError("Something went wrong!");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Fragment>
            <Row className="mx-auto">
                <Col >
                    <Card title="SignIn">
                        {error ? (<Alert className="" message={error} type="error" closable afterClose={() => setError("")} />) : null}
                        <Form name="basic" layout="vertical" onFinish={onFinish} autoComplete="off" >

                            <Form.Item label="Email" name="email" rules={[{ required: true, type: "email", },]} >
                                <Input placeholder="Email address" />
                            </Form.Item>

                            <Form.Item label="Password" name="password" rules={[{ required: true }]} >
                                <Input.Password placeholder="Password" />
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="" >
                                    Login {isLoading && <Spin size="small" />}
                                </Button>
                            </Form.Item>

                        </Form>
                        <Typography.Paragraph className="">
                            New to Social Cards? <Link to="/backstage/signup">Sign Up</Link>
                        </Typography.Paragraph>
                    </Card>
                </Col>
            </Row>
        </Fragment>
    );
};

export default SignIn;