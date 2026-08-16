import supabase from './db-client.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    if (req.method === 'GET') {
      const { phone, abha, id } = req.query;
      let query = supabase.from('appointments').select('*');

      if (id) {
        query = query.eq('id', id);
      } else if (phone) {
        query = query.eq('patient_phone', phone);
      } else if (abha) {
        query = query.eq('abha_id', abha);
      }

      const { data, error } = await query.order('created_at', { ascending: false });
      if (error) throw error;
      return res.status(200).json(data || []);
    }

    if (req.method === 'POST') {
      const body = req.body;
      const refNumber = 'AG-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000);

      const appointmentPayload = {
        booking_reference: refNumber,
        doctor_id: body.doctor_id,
        doctor_name: body.doctor_name,
        specialization: body.specialization,
        visit_type: body.visit_type || 'telehealth',
        appointment_date: body.appointment_date,
        time_slot: body.time_slot,
        patient_name: body.patient_name,
        patient_phone: body.patient_phone,
        patient_email: body.patient_email || '',
        patient_age: Number(body.patient_age) || 30,
        patient_gender: body.patient_gender || 'Male',
        abha_id: body.abha_id || '',
        symptoms: body.symptoms || '',
        nmc_consent: Boolean(body.nmc_consent),
        status: 'Confirmed',
        amount_paid: Number(body.amount_paid) || 500,
      };

      const { data, error } = await supabase
        .from('appointments')
        .insert([appointmentPayload])
        .select()
        .single();

      if (error) throw error;
      return res.status(201).json(data);
    }

    if (req.method === 'PUT') {
      const { id, status } = req.body;
      const { data, error } = await supabase
        .from('appointments')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return res.status(200).json(data);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('API Error /api/appointments:', err);
    return res.status(500).json({ error: err.message });
  }
}
