import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
    FormControl,
    FormLabel,
    // FormErrorMessage,
    // FormHelperText,
    Input,
    VStack,
    Box,
    Link,
    Heading,
    Button,
    // Alert,
    // AlertIcon,
    // AlertTitle
  } from '@chakra-ui/react';

const ApiUrl = process.env.REACT_APP_API_URL;

const Login = ()=>{
    const [form,setForm] = useState({});
    const navigate = useNavigate();
    const handleChange = (el)=>{
        // console.log(el)
        setForm({...form,[el.target.name]:el.target.value});
    }
    // const AlertMessage = ()=>{
    //     return(
    //         <Alert status='error'>
    //         <AlertIcon />
    //         <AlertTitle>{"something wrong"}</AlertTitle>
    //         </Alert>
    //     )
    // }
    const handleLogin = async (e)=>{
        e.preventDefault();
        console.log(form);
        try {
            console.log("in request post")
            // dispatch(todoRequestAction())
            await axios.post(`${ApiUrl}/login`,form).then((res)=>{
                console.log("in post",res.data);
                if(res.data?.name){
                    console.log("inside if")
                    localStorage.setItem("name",res.data.name);
                    localStorage.setItem("_id",res.data._id);
                    localStorage.setItem("token",res.data.token)
                    navigate("/dashboard");
                    setForm({})
                }else{
                    console.log("inside else")
                }                
                // dispatch(postTodoSuccessAction(res.data))
                
            })
        } 
        catch (error) {
            console.log(error.message);
            window.alert(
            error.message
            );
            console.log("in error")
            // dispatch(todoFailureAction())
        }        
   }

    return(
        <div>
            <Heading noOfLines={1} size="lg">
                Login
            </Heading>
            <Box maxW="md" mx="auto" mt={10}>
                <form onSubmit={handleLogin}>
                    <VStack spacing={4} align="stretch">
                    <FormControl isRequired>            
                    <FormLabel htmlFor='login-email'>Email</FormLabel>
                    <Input 
                        id='login-email'
                        name="email"
                        type='email'
                        value={form?.email?form.email:""}
                        onChange={handleChange}
                        placeholder="Enter your Email"
                    />
                    </FormControl>
                    <FormControl isRequired> 
                    <FormLabel htmlFor='login-password'>Password</FormLabel>
                    <Input 
                        id='login-password'
                        name="password"
                        type='password'
                        value={form?.password?form.password:""}
                        onChange={handleChange}
                        placeholder="Enter your password"
                    />
                    </FormControl>         
                    <Button      
                            // onClick={handleLogin}              
                            type="submit" 
                            colorScheme="teal" 
                            size="md">
                                Login
                    </Button>
                    </VStack>
                </form>
                <Link color='teal.500' href='/register'>
                    Register
                </Link>
                <br/>
                {/* <Link color='pink' onClick={()=>{
                    localStorage.setItem("name","Guest user")
                    localStorage.setItem("_id","12345")
                }} href='/dashboard'>
                    Guset Login
                </Link> */}
            </Box>           
            
        </div>
    )
}
export default Login;