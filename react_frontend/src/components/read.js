import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';


export default function Read() {
    const [APIData, setAPIData] = useState([]);
    useEffect(() => {
        
        axios.get(`http://127.0.0.1:8000/users`)
            .then((response) => {
                console.log(response.data)
                setAPIData(response.data);
            })
    }, []);

    const setData = (data) => {
        let { id, name, email } = data;
        localStorage.setItem('ID', id);
        localStorage.setItem('Name', name);
        localStorage.setItem('Email', email);
        
    }

    const getData = () => {
        
        axios.get(`http://localhost:8000/users`)
            .then((getData) => {
                setAPIData(getData.data);
            })
    }

    const onDelete = (id) => {
        
        axios.delete(`http://localhost:8000/users/${id}`)
        .then(() => {
            getData();
        })
    }


    return (
        <div>
            <Table singleLine>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Email</Table.HeaderCell>
                        <Table.HeaderCell>Update</Table.HeaderCell>
                        <Table.HeaderCell>Delete</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {APIData.map((data) => {
                        return (
                            <Table.Row key={data.id}>
                                <Table.Cell>{data.name}</Table.Cell>
                                <Table.Cell>{data.email}</Table.Cell>
                                    <Table.Cell> 
                                    <Link to='/update'>
                                        <Button onClick={() => setData(data)}>Update</Button>
                                    </Link>
                                    </Table.Cell>
                                
                                <Table.Cell>
                                    <Button onClick={() => onDelete(data.id)}>Delete</Button>
                                </Table.Cell>
                            </Table.Row>
                        )
                    })}
                </Table.Body>
            </Table>
        </div>
    )
}
