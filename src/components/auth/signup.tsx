
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/authContext";
import { api_adress } from "../strapi/strapi_interface";
import { setToken } from "../strapi/strapi_interface";

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

interface signUpInput {
    email: string;
    password: string;
    username: string;
}

type signUpError = {
    status: number,
    name: string,
    message: string,
    details: {}
}

const SignUp = () => {

    const isSignUpError = (error: any): error is signUpError => {
        return (error as signUpError).message !== undefined;
    };
    const navigate = useNavigate();

    const { setUser } = useAuthContext();

    const [isLoading, setIsLoading] = useState(false);

    const [error, setError] = useState("");

    const onFinish = async (values: signUpInput) => {
        setIsLoading(true);
        try {
            const response = await fetch(`${api_adress}/api/auth/local/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });


            const data = await response.json();
            if (data?.error) {
                throw data?.error as signUpError;
            } else {
                // set the token
                setToken(data.jwt);

                // set the user
                setUser(data.user);

                message.success(`Welcome to Social Cards ${data.user.username}!`);

                navigate("/backstage/profile", { replace: true });
            }
        } catch (err) {
            if (isSignUpError(err)) {
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
            <Row align="middle">
                <Col >
                    <Card title="SignUp">
                        {error ? (<Alert className="alert_error" message={error} type="error" closable afterClose={() => setError("")} />) : null}
                        <Form name="basic" layout="vertical" onFinish={onFinish} autoComplete="off">

                            <Form.Item label="Username" name="username" rules={[{ required: true, type: "string", },]}>
                                <Input placeholder="Username" />
                            </Form.Item>

                            <Form.Item label="Email" name="email" rules={[{ required: true, type: "email", },]}>
                                <Input placeholder="Email address" />
                            </Form.Item>

                            <Form.Item label="Password" name="password" rules={[{ required: true }]}>
                                <Input.Password placeholder="Password" />
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login_submit_btn">
                                    Submit {isLoading && <Spin size="small" />}
                                </Button>
                            </Form.Item>

                        </Form>
                        <Typography.Paragraph className="form_help_text">
                            Already have an account? <Link to="/signin">Sign In</Link>
                        </Typography.Paragraph>
                    </Card>
                </Col>
            </Row>
        </Fragment>
    );
};

export default SignUp;