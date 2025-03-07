import { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { useUploadIdeasImageMutation } from '../slices/ideasApiSlice';

const uploadFileScreen = () => {
  const [fileUrl, setFileUrl] = useState('');
  const [uploadIdeasImage, { isLoading }] = useUploadIdeasImageMutation();

  // Handle File Upload
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      return toast.error('Please select a file.');
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await uploadIdeasImage(formData).unwrap();
      setFileUrl(res.image); // Store uploaded image URL
      toast.success('Image uploaded successfully!');
    } catch (err) {
      toast.error(err?.data?.message || 'Error uploading image.');
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h2 className="text-center my-4">Upload an Image</h2>

          <Form.Group controlId="image" className="mb-3">
            <Form.Label>Choose an Image</Form.Label>
            <Form.Control type="file" onChange={uploadFileHandler} />
            {isLoading && <Loader />}
          </Form.Group>

          {/* Show Uploaded Image Preview */}
          {fileUrl && (
            <div className="mt-3 text-center">
              <strong>Uploaded Image:</strong>
              <br />
              <img
                src={fileUrl}
                alt="Uploaded"
                style={{
                  width: '150px',
                  height: '150px',
                  objectFit: 'cover',
                  borderRadius: '5px',
                  marginTop: '10px',
                }}
              />
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default uploadFileScreen;
