


import React, { useEffect, useState, useCallback } from 'react';
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import BackendService from '../../services/BackendService';
import {
    useQuery,
    useMutation,
    useQueryClient,
} from 'react-query'


export function Createuser(props) {
    const [userdata, setUserdata] = useState({})
    const queryClient = useQueryClient()
    const { isLoading, error, data } = useQuery('allusers', BackendService.getAllUsers)

    const mutation = useMutation(BackendService.createUser, {
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries('allusers')
        },
    })
    // Queries
    if (isLoading) return <div>its loading.....</div>
    return (
        <>
            <Form onSubmit={(e) => {
                e.preventDefault();
                console.log("Form data", userdata)
                mutation.mutate(userdata)

            }}>
                <FormGroup controlId="forUserName">
                    <Label for="user_id">UserId</Label>
                    <Input
                        type="text"
                        placeholder="Enter User Id"
                        name="user_id" id="user_id"
                        value={userdata.user_id}
                        autoComplete="user_name"
                        onChange={(e) => { setUserdata({ ...userdata, user_id: e.target.value }) }}
                    />

                </FormGroup>
                <FormGroup controlId="formPassword">
                    <Label for="password">Password</Label>
                    <Input required
                        type="password"
                        placeholder="Enter Password"
                        name="password" id="password"
                        value={userdata.password}
                        autoComplete="password"
                        onChange={(e) => { setUserdata({ ...userdata, password: e.target.value }) }}
                    />
                </FormGroup>

                <Button variant="primary" >
                    Create
              </Button>
            </Form>
            <div className='App'>
                <div className='container'>

                </div>
                <div className='repo-container'>
                    <ul>
                        {data.data.user_list.map(user => (
                            <li key={user.user_id}>{user.user_id}</li>
                        ))}
                    </ul>
                </div>

            </div>
        </>
    )
}
