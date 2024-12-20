import supabase from '../supabaseclient';

// Fetch analytics data
export const fetchAnalytics = async () => {
  try {
    const { data, error } = await supabase.rpc('get_analytics'); // Use a stored procedure for analytics if available
    if (error) throw error;
    return data;
  } catch (err) {
    console.error('Error fetching analytics:', err.message);
    return null;
  }
};
