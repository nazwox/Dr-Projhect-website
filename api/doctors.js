import supabase from './db-client.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    if (req.method === 'GET') {
      const { id, specialization, city, tpa, search } = req.query;

      if (id) {
        const { data, error } = await supabase
          .from('doctors')
          .select('*')
          .eq('id', id)
          .single();
        if (error) throw error;
        return res.status(200).json(data);
      }

      let query = supabase.from('doctors').select('*');

      if (specialization && specialization !== 'All Specializations') {
        query = query.eq('specialization', specialization);
      }
      if (city && city !== 'All Cities') {
        query = query.eq('city', city);
      }

      const { data, error } = await query.order('id', { ascending: true });
      if (error) throw error;

      let filteredData = data || [];

      if (search) {
        const q = search.toLowerCase();
        filteredData = filteredData.filter(
          (doc) =>
            doc.name.toLowerCase().includes(q) ||
            doc.specialization.toLowerCase().includes(q) ||
            doc.city.toLowerCase().includes(q) ||
            doc.degrees.toLowerCase().includes(q)
        );
      }

      if (tpa && tpa !== 'All Insurances / TPAs') {
        filteredData = filteredData.filter((doc) =>
          Array.isArray(doc.tpa_accepted)
            ? doc.tpa_accepted.includes(tpa)
            : String(doc.tpa_accepted).includes(tpa)
        );
      }

      return res.status(200).json(filteredData);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('API Error /api/doctors:', err);
    return res.status(500).json({ error: err.message });
  }
}
