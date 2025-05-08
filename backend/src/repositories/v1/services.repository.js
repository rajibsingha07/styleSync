const { default: mongoose } = require("mongoose");
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


const pushNewService = async (barberId, updatedService) => {
  try {
    const result = await Service.findOneAndUpdate(
      { barberId },
      {
        $push: {
          services: updatedService.map(service => {
            return {
              serviceName: service.name,
              price: service.price,
            };
          }), // should be { serviceName: ..., price: ... }
        },
      },
      { new: true, upsert: true } // upsert creates a new document if not found
    );

    return result;
  } catch (error) {
    throw new Error(`Failed to push new service: ${error.message}`);
  }
};

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
  
const getServiceByBarberId = async (barberId) => {
    const { data, error } = await supabase
      .from("barbers")
      .select("services")
      .eq("barberId", barberId);
  
    if (error) {
      console.error("Error fetching services:", error);
      throw new Error(error.message);
    }

    if (!data || data.length === 0) {
      return [];
    }

    const findServices = await Service.findById(data[0].services);
    if (!findServices) {
      return []
    }
    const services = findServices.services.map(service => ({
        id: service._id,
        serviceName: service.serviceName,
        price: service.price,
    }));
  
    return services;
  }

  const getServiceById = async (serviceId) => {
    try {
      // Find the document where any inner service has the matching _id
      const serviceDoc = await Service.findOne({
        "services._id": serviceId,
      });
  
      if (!serviceDoc) {
        throw new Error("Service not found");
      }
  
      // Extract the matching service from the array
      const matchedService = serviceDoc.services.find(
        (service) => service._id.toString() === serviceId
      );
  
      if (!matchedService) {
        throw new Error("Service not found");
      }
  
      return matchedService;
    } catch (error) {
      throw new Error(`Failed to get service: ${error.message}`);
    }
  };

  const getServicesByIDs = async (serviceIds) => {
    try {
      // Ensure all IDs are strings for matching
      const stringServiceIds = serviceIds.map(id => id.toString());
  
      // Find all documents where at least one of the subdocument IDs match
      const serviceDocs = await Service.find({
        "services._id": { $in: stringServiceIds.map(id => new mongoose.Types.ObjectId(id)) }
      });
  
      // Extract matching services from all documents
      const matchedServices = [];
  
      serviceDocs.forEach(doc => {
        doc.services.forEach(service => {
          if (stringServiceIds.includes(service._id.toString())) {
            matchedServices.push(service);
          }
        });
      });
  
      return matchedServices;
    } catch (error) {
      throw new Error(`Failed to get services: ${error.message}`);
    }
  };
  

module.exports = {
    createService,
    editServiceReference,
    getServiceByBarberId,
    getServiceById,
    getServicesByIDs,
    pushNewService
};