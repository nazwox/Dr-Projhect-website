import supabase from './db-client.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    if (req.method === 'GET') {
      const { appointment_id, abha } = req.query;
      let query = supabase.from('prescriptions').select('*');

      if (appointment_id) {
        query = query.eq('appointment_id', appointment_id);
      } else if (abha) {
        query = query.eq('patient_abha', abha);
      }

      const { data, error } = await query.order('created_at', { ascending: false });
      if (error) throw error;
      return res.status(200).json(data || []);
    }

    if (req.method === 'POST') {
      const body = req.body;
      const rxNum = 'RX-' + Math.floor(10000 + Math.random() * 90000);

      const payload = {
        rx_number: rxNum,
        appointment_id: body.appointment_id || null,
        patient_name: body.patient_name,
        patient_abha: body.patient_abha || '',
        doctor_name: body.doctor_name,
        doctor_reg: body.doctor_reg,
        diagnosis: body.diagnosis,
        medicines: body.medicines || [],
        advice: body.advice || 'Drink plenty of water and rest well.',
        date: new Date().toISOString().split('T')[0],
      };

      const { data, error } = await supabase
        .from('prescriptions')
        .insert([payload])
        .select()
        .single();

      if (error) throw error;
      return res.status(201).json(data);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('API Error /api/prescriptions:', err);
    return res.status(500).json({ error: err.message });
  }
}
