/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
  useCreateIdeaMutation,
  useUploadIdeasImageMutation,
} from '../slices/ideasApiSlice';
import { useGetAllCategoriesQuery } from '../slices/categoriesApiSlice';

const IdeaScreen = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [upVotes, setUpVotes] = useState([]);
  const [downVotes, setDownVotes] = useState([]);
  const [fileUrl, setFileUrl] = useState(''); // Single file URL

  // Fetch categories
  const {
    data: categories,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useGetAllCategoriesQuery();

  const [createIdea, { isLoading: ideaUploadLoading }] = useCreateIdeaMutation();
  const [uploadIdeasImage, { isLoading: imageUploadLoading }] = useUploadIdeasImageMutation();

  // Submit Idea
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!title || !description || selectedCategories.length === 0 || !agreeToTerms) {
      return toast.error('Please fill in all required fields and accept the terms.');
    }

    try {
      await createIdea({
        title,
        description,
        selectedCategories,
        isAnonymous,
        fileUrl,
        agreeToTerms,
        upVotes,
        downVotes,
      }).unwrap();
      toast.success('Idea submitted successfully!');
      
      // Reset form fields
      setTitle('');
      setDescription('');
      setSelectedCategories([]);
      setIsAnonymous(false);
      setAgreeToTerms(false);
      setFileUrl('');
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to submit idea.');
    }
  };

  // Handle Single File Upload
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      return toast.error('Please select a file.');
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await uploadIdeasImage(formData).unwrap();
      setFileUrl(res.image); // Store single uploaded image URL
      toast.success('Image uploaded successfully!');
    } catch (err) {
      toast.error(err?.data?.message || 'Error uploading image.');
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={8}>
          <h2 className="text-center my-4">Submit Your Idea</h2>
          <Form onSubmit={submitHandler}>
            {/* Title */}
            <Form.Group controlId="title" className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter idea title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Form.Group>

            {/* Description */}
            <Form.Group controlId="description" className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Describe your idea..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Form.Group>

            {/* Category Selection */}
            <Form.Group controlId="category" className="mb-3">
              <Form.Label>Category</Form.Label>
              {categoriesLoading ? (
                <Loader />
              ) : categoriesError ? (
                <Message variant="danger">{categoriesError.message}</Message>
              ) : (
                <Form.Control
                  as="select"
                  multiple
                  value={selectedCategories}
                  onChange={(e) => {
                    const selectedValues = Array.from(
                      e.target.selectedOptions,
                      (o) => o.value
                    );
                    setSelectedCategories(selectedValues);
                  }}
                >
                  {categories?.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </Form.Control>
              )}
            </Form.Group>

            {/* Image Upload */}
            <Form.Group controlId="file" className="mb-3">
              <Form.Label>Upload Image</Form.Label>
              <Form.Control type="file" onChange={uploadFileHandler} />
              {imageUploadLoading && <Loader />}

              {/* Show Uploaded Image Preview */}
              {fileUrl && (
                <div className="mt-2">
                  <strong>Uploaded Image:</strong>
                  <br />
                  <img
                    src={fileUrl}
                    alt="Uploaded"
                    style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '5px' }}
                  />
                </div>
              )}
            </Form.Group>

            {/* Anonymous Submission Checkbox */}
            <Form.Group controlId="isAnonymous" className="mb-3">
              <Form.Check
                type="checkbox"
                label="Submit as Anonymous"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
              />
            </Form.Group>

            {/* Terms and Conditions Checkbox */}
            <Form.Group controlId="agreeToTerms" className="mb-3">
              <Form.Check
                type="checkbox"
                label="I agree to the terms and conditions"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                required
              />
            </Form.Group>

            {/* Submit Button */}
            <Button
              variant="primary"
              type="submit"
              className="w-100"
              disabled={ideaUploadLoading}
            >
              {ideaUploadLoading ? 'Submitting...' : 'Submit Idea'}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default IdeaScreen;
