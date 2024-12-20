import supabase from '../supabaseclient';

// Place an order
export const placeOrder = async (orderDetails) => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .insert([orderDetails]);
    if (error) throw error;
    return data;
  } catch (err) {
    console.error('Error placing order:', err.message);
    return null;
  }
};

// Fetch all orders
export const fetchOrders = async () => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*');
    if (error) throw error;
    return data;
  } catch (err) {
    console.error('Error fetching orders:', err.message);
    return null;
  }
};
