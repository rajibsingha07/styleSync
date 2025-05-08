const supabase = require("../../config/supabase.config");

const addBarbersCustomer = async (barberId, customer) => {
  const { gender, services, total_price } = customer;

  const { data, error } = await supabase
    .from('customers') // replace with your table name if different
    .insert([
      {
        barberId,
        Gender: gender,
        Services: services,
        total_price
      },
    ])
    .select(); // Optional, returns inserted row

  if (error) {
    throw new Error(`Failed to add customer: ${error.message}`);
  }

  return data;
};

const getBarbersCustomer = async (barberId) => {
  const { data, error } = await supabase
    .from('customers')
    .select('*')
    .eq('barberId', barberId);

  if (error) {
    throw new Error(`Failed to fetch customers: ${error.message}`);
  }

  return data;
}

const getBarbersCustomerById = async (customerId) => {
  const { data, error } = await supabase
    .from('customers')
    .select()
    .eq('id', customerId)
    .single(); // Ensures a single object is returned

  if (error) {
    throw new Error(`Failed to fetch customer: ${error.message}`);
  }

  return data;
};


module.exports = {
  addBarbersCustomer,
  getBarbersCustomer,
  getBarbersCustomerById,
};
