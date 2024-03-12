import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Container, Card, Button, Spinner } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Buffer } from 'buffer'

export default function View() {

  const [allImage, setAllImage] = useState([])
  const [allImageLoad, setAllImageLoad] = useState(true)

  useEffect(() => {
    const fetchImage = async () => {
      const response = await axios.get('/image')
      if (response.status === 200) {
        setAllImage(response.data.all_image)
        setAllImageLoad(false)
      }
    }
    fetchImage()
  }, [])

  return (
    <Container className='mt-5'>
      
      <Card className='col-sm-5 m-auto'>

        <Card.Header className='text-center'><h5>All Image</h5></Card.Header>
        <Card.Body>

        <Link to={'/'}><Button variant='primary'>Go to upload image</Button></Link>
        <hr />

          {allImageLoad ? <div className='mt-5 mb-5 d-flex justify-content-center'>
              <Spinner variant='primary' animation='border' />
          </div> : <>
          
              {allImage !== 'none' ? <>

                  {allImage.map(img => (
                    <div key={img._id}>
                      <div className='d-flex justify-content-center mb-3'>
                        <img src={`data:${img.image.contentType};base64,${Buffer.from(img.image.data).toString('base64')}`} style={{width: '200px',borderRadius: '50%', border: '3px solid black'}} />
                      </div>
                      <hr />
                    </div>
                  ))}

              </> : <p className='text-center'>No image now.</p>}

          </>}

        </Card.Body>

      </Card>
      
    </Container>
  )
}
