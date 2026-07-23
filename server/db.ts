import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load variables from .env.local for Node.js
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('CRITICAL ERROR: Missing Supabase environment variables in Node server.');
}

// Initialize the Supabase Client for the server
export const supabase = createClient(supabaseUrl || '', supabaseKey || '');

export const db = {
  // Push a new lead to the Supabase 'leads' table
  async saveLead(leadData: any) {
    const { data, error } = await supabase
      .from('leads')
      .insert([
        {
          name: leadData.name,
          email: leadData.email,
          company: leadData.company,
          phone: leadData.phone,
          details: leadData.details,
          budget: leadData.budget,
          service_interest: leadData.serviceInterest,
          status: leadData.status || 'new',
        }
      ])
      .select();

    if (error) {
      console.error('Supabase Insert Error:', error);
      throw error;
    }
    
    return data;
  },

  // Fetch all leads for the admin dashboard
  async getLeads() {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase Fetch Error:', error);
      throw error;
    }
    
    return data;
  }
};