import supabase from './db-client.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    if (req.method === 'GET') {
      const { number } = req.query;
      if (number) {
        const { data, error } = await supabase
          .from('abha_profiles')
          .select('*')
          .eq('abha_number', number)
          .single();
        if (error && error.code !== 'PGRST116') throw error;
        return res.status(200).json(data || null);
      }

      const { data, error } = await supabase.from('abha_profiles').select('*');
      if (error) throw error;
      return res.status(200).json(data || []);
    }

    if (req.method === 'POST') {
      const { full_name, mobile, gender, dob, blood_group } = req.body;
      
      const randAbha = '91-' + Math.floor(1000 + Math.random() * 9000) + '-' + Math.floor(1000 + Math.random() * 9000) + '-' + Math.floor(1000 + Math.random() * 9000);
      const randAddress = (full_name || 'user').toLowerCase().replace(/\s+/g, '.') + '@abha';

      const payload = {
        abha_number: randAbha,
        abha_address: randAddress,
        full_name: full_name || 'Aarogya Patient',
        gender: gender || 'Male',
        dob: dob || '1992-08-15',
        mobile: mobile || '+91 9876543210',
        blood_group: blood_group || 'O+',
        linked_records_count: 3,
      };

      const { data, error } = await supabase
        .from('abha_profiles')
        .insert([payload])
        .select()
        .single();

      if (error) throw error;
      return res.status(201).json(data);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('API Error /api/abha:', err);
    return res.status(500).json({ error: err.message });
  }
}
