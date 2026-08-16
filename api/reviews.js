import supabase from './db-client.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    if (req.method === 'GET') {
      const { doctor_id } = req.query;
      let query = supabase.from('reviews').select('*');

      if (doctor_id) {
        query = query.eq('doctor_id', doctor_id);
      }

      const { data, error } = await query.order('created_at', { ascending: false });
      if (error) throw error;
      return res.status(200).json(data || []);
    }

    if (req.method === 'POST') {
      const { doctor_id, doctor_name, patient_name, rating, punctuality_rating, hygiene_rating, bedside_manner_rating, comment } = req.body;

      const reviewPayload = {
        doctor_id: Number(doctor_id),
        doctor_name: doctor_name || 'Verified Doctor',
        patient_name: patient_name || 'Anonymous Patient',
        verified: true,
        rating: Number(rating) || 5,
        punctuality_rating: Number(punctuality_rating) || 5,
        hygiene_rating: Number(hygiene_rating) || 5,
        bedside_manner_rating: Number(bedside_manner_rating) || 5,
        comment: comment || 'Great service and prompt doctor consultation.',
        date: new Date().toISOString().split('T')[0],
      };

      const { data, error } = await supabase
        .from('reviews')
        .insert([reviewPayload])
        .select()
        .single();

      if (error) throw error;
      return res.status(201).json(data);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('API Error /api/reviews:', err);
    return res.status(500).json({ error: err.message });
  }
}
