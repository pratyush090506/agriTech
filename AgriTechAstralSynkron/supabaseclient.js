import { createClient } from '@supabase/supabase-js';

// Your Supabase project URL and key
const SUPABASE_URL = 'https://lofrcouzknugosjzmhwp.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvZnJjb3V6a251Z29zanptaHdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ2MzUxMzQsImV4cCI6MjA1MDIxMTEzNH0.lwd1u4eArsTgx45M4VauJnDVl1OmwB5D-OmdqtrhyAE';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default supabase;
