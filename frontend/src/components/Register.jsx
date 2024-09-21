import React, { useState } from 'react';
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
  } from '@chakra-ui/react'
  import { Button} from '@chakra-ui/react'
import axios from 'axios';
const ApiUrl = process.env.REACT_APP_API_URL
const Register = ()=>{
   const [form,setForm] = useState({})
   const handleChange = (el)=>{
    // console.log(el.target.name,el.target.value)
    setForm({...form,[el.target.name]:el.target.value})
   }
   const handleSubmit = async (e)=>{
        e.preventDefault();
        try {
            // dispatch(todoRequestAction())
            await axios.post(`${ApiUrl}/register`,form).then((res)=>{
                // dispatch(postTodoSuccessAction(res.data))
                // setForm({})
            })
        } 
        catch (error) {
            // dispatch(todoFailureAction())
        }
   }
   
    return(
        <div>
            <Heading noOfLines={1} size="lg">
                Register
            </Heading>
            <Box maxW="md" mx="auto" mt={10}>
                <form onSubmit={handleSubmit}>
                    <VStack spacing={4} align="stretch">
                    <FormControl id="name" isRequired>
                        <FormLabel htmlFor="name">Name</FormLabel>
                        <Input                        
                        name="name"
                        value={form?.name?form.name:""}
                        onChange={handleChange}
                        type="text" 
                        placeholder="Enter your name" />
                    </FormControl>

                    <FormControl id="email" isRequired>
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <Input 
                        name="email"
                        value={form?.name?form.email:""}
                        onChange={handleChange} 
                        type="email" 
                        placeholder="Enter your email" />
                    </FormControl>

                    <FormControl id="password" isRequired>
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <Input 
                        name="password"
                        value={form?.name?form.password:""}
                        onChange={handleChange} 
                        type="password" 
                        placeholder="Enter your password" />
                    </FormControl>

                    <Button                    
                    type="submit" 
                    colorScheme="teal" 
                    size="md">
                        Register
                    </Button>
                    </VStack>
                </form>
                <Link color='teal.500' href='/login'>
                    Login
                </Link>         
            </Box>
            {/* <form>
            <FormControl>
            <FormLabel>Name</FormLabel>
            <Input 
                id='register-name'
                name='name'
                type='text' 
                value={form?.name?form.name:""}
                onChange={handleChange} 
            />
            </FormControl>
            <FormControl>
            <FormLabel>Email address</FormLabel>
            <Input 
            id='register-email'
            name="email"
            type='email'
            value={form?.email?form.email:""}
            onChange={handleChange} 
            />
            </FormControl>
            <FormControl>
            <FormLabel>Password</FormLabel>
            <Input 
                id='register-password'
                name="password"
                type='password'
                value={form?.password?form.password:""}
                onChange={handleChange}
            />
            
            </FormControl>
            </form> */}
            {/* <Button onClick={handleSubmit} colorScheme='blue'>Button</Button> */}
        </div>
    )
}
export default Register;