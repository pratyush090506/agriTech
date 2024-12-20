import React, { useState } from 'react';
import { createOrder } from '../services/buyerService';
import { useToast } from '@chakra-ui/react';

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
    <div>
      <h2>Create a New Order</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Quantity:
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />

        <label>
          Quality:
          <select
            name="quality"
            value={formData.quality}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Quality</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </label>
        <br />

        <label>
          Region:
          <input
            type="text"
            name="region"
            value={formData.region}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />

        <label>
          Loading Date:
          <input
            type="date"
            name="loadingDate"
            value={formData.loadingDate}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />

        <label>
          Delivery Location:
          <input
            type="text"
            name="deliveryLocation"
            value={formData.deliveryLocation}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />

        <button type="submit">Submit Order</button>
      </form>
    </div>
  );
};

export default BuyerPage;
