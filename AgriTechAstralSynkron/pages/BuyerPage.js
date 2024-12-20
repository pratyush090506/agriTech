import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  useToast,
  Heading,
} from '@chakra-ui/react';
import { createOrder } from '../services/buyerService';

const BuyerPage = () => {
  const [formData, setFormData] = useState({
    quantity: '',
    quality: '',
    region: '',
    loadingDate: '',
    deliveryLocation: '',
  });

  const toast = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    if (
      !formData.quantity ||
      !formData.quality ||
      !formData.region ||
      !formData.loadingDate ||
      !formData.deliveryLocation
    ) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Call service to create order
    const response = await createOrder(formData);
    if (response.success) {
      toast({
        title: 'Success',
        description: 'Order created successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      // Reset the form after successful submission
      setFormData({
        quantity: '',
        quality: '',
        region: '',
        loadingDate: '',
        deliveryLocation: '',
      });
    } else {
      toast({
        title: 'Error',
        description: 'Failed to create order. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxWidth="500px" margin="auto" padding="20px" boxShadow="lg" borderRadius="md" backgroundColor="white">
      <Heading as="h2" size="lg" textAlign="center" marginBottom="20px">
        Create a New Order
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl id="quantity" isRequired marginBottom="10px">
          <FormLabel>Quantity (in KG)</FormLabel>
          <Input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleInputChange}
            placeholder="Enter quantity"
          />
        </FormControl>

        <FormControl id="quality" isRequired marginBottom="10px">
          <FormLabel>Quality</FormLabel>
          <Select
            name="quality"
            value={formData.quality}
            onChange={handleInputChange}
            placeholder="Select quality"
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </Select>
        </FormControl>

        <FormControl id="region" isRequired marginBottom="10px">
          <FormLabel>Region</FormLabel>
          <Input
            type="text"
            name="region"
            value={formData.region}
            onChange={handleInputChange}
            placeholder="Enter region"
          />
        </FormControl>

        <FormControl id="loadingDate" isRequired marginBottom="10px">
          <FormLabel>Loading Date</FormLabel>
          <Input
            type="date"
            name="loadingDate"
            value={formData.loadingDate}
            onChange={handleInputChange}
          />
        </FormControl>

        <FormControl id="deliveryLocation" isRequired marginBottom="10px">
          <FormLabel>Delivery Location</FormLabel>
          <Input
            type="text"
            name="deliveryLocation"
            value={formData.deliveryLocation}
            onChange={handleInputChange}
            placeholder="Enter delivery location"
          />
        </FormControl>

        <Button type="submit" colorScheme="teal" width="full" marginTop="20px">
          Submit Order
        </Button>
      </form>
    </Box>
  );
};

export default BuyerPage;
