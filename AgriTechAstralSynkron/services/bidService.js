import supabase from '../supabaseclient';

// Submit a bid
export const submitBid = async (price, productImage, bidDetails) => {
  try {
    const { data, error } = await supabase
      .from('bids')
      .insert([{ price, productImage, bidDetails }]);
    if (error) throw error;
    return data;
  } catch (err) {
    console.error('Error submitting bid:', err.message);
    return null;
  }
};

// Get all bids for a specific order
export const fetchBidsByOrderId = async (orderId) => {
  try {
    const { data, error } = await supabase
      .from('bids')
      .select('*')
      .eq('order_id', orderId);
    if (error) throw error;
    return data;
  } catch (err) {
    console.error('Error fetching bids:', err.message);
    return null;
  }
};
