import React, { useState, useEffect } from 'react';
import {
  Box,
  VStack,
  Input,
  Button,
  Text,
  FormControl,
  FormLabel,
  useToast,
  Flex,
  Image,
} from '@chakra-ui/react';
import supabase from '../supabaseclient';

const CollectionCentrePage = () => {
  const [bids, setBids] = useState([]); // Store existing bids
  const [newBid, setNewBid] = useState({
    product: '',
    price: '',
    image: null,
  }); // New bid details
  const [imagePreview, setImagePreview] = useState(null); // Image preview
  const toast = useToast();

  useEffect(() => {
    // Fetch existing bids on page load
    fetchBids();
  }, []);

  const fetchBids = async () => {
    const { data, error } = await supabase.from('bids').select('*').order('created_at', { ascending: false });
    if (error) {
      console.error('Error fetching bids:', error.message);
      toast({
        title: 'Error',
        description: 'Failed to fetch bids.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } else {
      setBids(data);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBid({ ...newBid, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewBid({ ...newBid, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const submitBid = async () => {
    if (!newBid.product || !newBid.price || !newBid.image) {
      toast({
        title: 'Error',
        description: 'All fields are required.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Upload the image to Supabase storage
    const fileName = `${Date.now()}-${newBid.image.name}`;
    const { data: imageData, error: imageError } = await supabase.storage
      .from('product-images')
      .upload(fileName, newBid.image);

    if (imageError) {
      console.error('Error uploading image:', imageError.message);
      toast({
        title: 'Error',
        description: 'Failed to upload image.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Submit the bid with the image URL
    const { data, error } = await supabase.from('bids').insert([
      {
        product: newBid.product,
        price: newBid.price,
        image_url: supabase.storage.from('product-images').getPublicUrl(fileName).data.publicUrl,
      },
    ]);

    if (error) {
      console.error('Error submitting bid:', error.message);
      toast({
        title: 'Error',
        description: 'Failed to submit bid.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: 'Success',
        description: 'Bid submitted successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setNewBid({ product: '', price: '', image: null });
      setImagePreview(null);
      fetchBids(); // Refresh bids
    }
  };

  return (
    <Box maxWidth="600px" margin="auto" padding="20px" boxShadow="lg" borderRadius="md" backgroundColor="white">
      <VStack spacing={4} align="stretch">
        <Text fontSize="2xl" fontWeight="bold" textAlign="center">
          Manage Bids
        </Text>

        <FormControl>
          <FormLabel>Product Name</FormLabel>
          <Input
            type="text"
            name="product"
            value={newBid.product}
            onChange={handleInputChange}
            placeholder="Enter product name"
          />
        </FormControl>

        <FormControl>
          <FormLabel>Price (per KG)</FormLabel>
          <Input
            type="number"
            name="price"
            value={newBid.price}
            onChange={handleInputChange}
            placeholder="Enter price"
          />
        </FormControl>

        <FormControl>
          <FormLabel>Upload Product Image</FormLabel>
          <Input type="file" accept="image/*" onChange={handleImageChange} />
          {imagePreview && (
            <Box marginTop="10px">
              <Image src={imagePreview} alt="Preview" boxSize="100px" objectFit="cover" />
            </Box>
          )}
        </FormControl>

        <Button colorScheme="teal" onClick={submitBid}>
          Submit Bid
        </Button>

        <Box>
          <Text fontSize="xl" fontWeight="bold" marginBottom="10px">
            Existing Bids
          </Text>
          {bids.length === 0 ? (
            <Text>No bids available.</Text>
          ) : (
            bids.map((bid, index) => (
              <Box key={index} padding="10px" border="1px solid #e2e8f0" borderRadius="md" marginBottom="10px">
                <Text fontWeight="bold">Product: {bid.product}</Text>
                <Text>Price: {bid.price} per KG</Text>
                {bid.image_url && <Image src={bid.image_url} alt={bid.product} boxSize="100px" objectFit="cover" />}
              </Box>
            ))
          )}
        </Box>
      </VStack>
    </Box>
  );
};

export default CollectionCentrePage;
