import React, { useState } from 'react'
import axios from 'axios'
import { Container, Card, Form, InputGroup, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'

export default function Upload() {

    const [image, setImage] = useState(null)

    const HandleUpload = async e => {
        e.preventDefault()
        if (image.type !== 'image/jpeg' && image.type !== 'image/png' && image.type !== 'image/webm' && image.type !== 'image/gif') {
            Swal.fire({ icon: 'error', title: 'Error!', text: 'File type is not supported.', timer: 10000, timerProgressBar: true })
            .then(() => window.location.href = '/')
        }
        else {
            const formData = new FormData()
            formData.append('image', image)
            Swal.fire({ icon: 'info', title: 'Processing..', timer: 9999999, timerProgressBar: false, showConfirmButton: false, allowEnterKey: false, allowEscapeKey: false, allowOutsideClick: false })
            const response = await axios.post('/upload', formData)
            if (response.status === 200) {
                 Swal.fire({ icon: 'success', title: 'Success!', text: response.data.success, timer: 10000, timerProgressBar: true })
                .then(() => window.location.href = `/view`)
            }
        }
    }

  return (
    <Container className='mt-5'>
        
        <Card className='col-sm-5 m-auto'>
            
            <Card.Header className='text-center'><h5>Upload Image</h5></Card.Header>
            <Card.Body>
                
                {image !== null && <div className='d-flex justify-content-center mb-3'>
                    <img src={URL.createObjectURL(image)} style={{width: '200px',borderRadius: '50%', border: '3px solid black'}} />
                </div>}

                <Form onSubmit={HandleUpload} encType='multipart/form-data'>
                    <InputGroup className='mb-3'>
                        <InputGroup.Text><FontAwesomeIcon icon={faImage} /></InputGroup.Text>
                        <Form.Control onChange={e => setImage(e.target.files[0])} required type='file'></Form.Control>
                    </InputGroup>
                    <Button type='submit' variant='success'>Upload</Button>
                    {image !== null && <Button onClick={() => window.location.href = '/'} className='mx-2' variant='danger'>Cancel</Button>}
                </Form>
                <hr />

                <Link to={'/view'}><Button variant='primary'>View All Image</Button></Link>
            </Card.Body>

        </Card>

    </Container>
  )
}
