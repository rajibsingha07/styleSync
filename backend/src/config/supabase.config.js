const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
    process.env.EXPRESS_SUPABASE_URL,
    process.env.EXPRESS_SUPABASE_KEY
);

module.exports = supabase;