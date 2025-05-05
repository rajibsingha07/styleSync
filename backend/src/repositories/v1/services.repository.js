const supabase = require("../../config/supabase.config");
const Service = require("../../models/services.model");

const createService = async (barberId, services) => {
        const newService = new Service({
          barberId,
          services: services.map(service => ({
            serviceName: service.name,
            price: service.price,
          })),
        });
    
        const savedService = await newService.save();
        return savedService;
}

const editServiceReference = async (barberId, serviceId) => {
    const { data, error } = await supabase
      .from("barbers")
      .update({ services: serviceId })
      .eq("barberId", barberId)
      .select(); // If you want to return the updated row(s)
  
    if (error) {
      console.error("Error updating service reference:", error);
      throw new Error(error.message);
    }
  
    return data;
  };
  

module.exports = {
    createService,
    editServiceReference
};