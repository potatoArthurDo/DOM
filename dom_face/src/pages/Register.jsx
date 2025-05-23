import Form from "../components/Form"
import { Link } from "react-router-dom"

function Register() {
    return (
       <div className="custom-dark-gradient h-[100vh] w-[100vw] flex flex-col justify-center items-center">
            <img src="assets/images/logo.png" alt="logo" className="w-[7rem]" />
            <h1 className="text-white text-4xl font-bold my-4">Register</h1>
        <Form route="/dom_app/user/register" method="register" />
        
        </div>
        
    )
}
export default Register