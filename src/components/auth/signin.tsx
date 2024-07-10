
import {
    Button,
    Card,
    Col,
    Row,
} from "antd";
import { Fragment, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/authContext";
import { user_entry } from "../strapi/strapi_entries";



interface GoogleAuthResponse {
    jwt: string,
    user: user_entry
}



export const GoogleAuthCallback = () => {
    const location = useLocation();
    const authContext = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!location) {
            return;
        }
        const { search } = location;

        fetch(`http://localhost:1337/api/auth/google/callback?${search}`, {
            method: 'GET',
        })
            .then((response) => {
                return response.json() as Promise<GoogleAuthResponse>;
            })
            .then((data) => {
                authContext.setToken(data.jwt);
            })
            .finally(() => {
                navigate("/backstage/profile", { replace: true });
            })
    }, [location]);

    return (
        <Fragment>
            <></>
        </Fragment>
    )



};

const SignIn = () => {

    return (
        <Fragment>
            <Row className="mx-auto">
                <Col >
                    <Card title="SignIn">
                        <Button type="primary" href="http://localhost:1337/api/connect/google" className="">
                            Log ind med Google
                        </Button>
                    </Card>
                </Col>
            </Row>
        </Fragment>
    );
};

export default SignIn;