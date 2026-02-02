import { Company } from "../models/companyModel.js";

export const registerCompany = async (req, res) => {
   try {
      const { companyName, description } = req.body;

      if (!companyName) {
         return res.status(400).json({
            message: "Company name is required"
         }); 
      }

      let company = await Company.findOne({name:companyName});

      if (company) {
         return res.status(400).json({
            message: "Company already exist"
         });
      }

      company = await Company.create({
         name: companyName,
         description, // Include description here
         userId: req.id
      });

      return res.status(201).json({
         message: "company created successfully",
         company,
         success: true
      });
      
   } catch (error) {
      console.error(error);
   }
}

export const getAllCompanies = async (req, res) => {
   try {
      const userId = req.id; // loggedin user id
      const companies = await Company.find({ userId });

      if (!companies) {
         return res.status(404).json({
            message: "No companies found",
         });
      }
      return res.status(200).json({
         companies,
         success: true
      })
      
   } catch (error) {
      console.error(error); 
   }
}

// get companies by id 
export const getCompanyById = async (req, res) => {
   try {
      const companyId = req.params.id;
      const company = await Company.findById(companyId);

      if (!company) {
         return res.status(404).json({
            message: "Company not found",
         })
      }

      return res.status(200).json({company, success: true});  
   } catch (error) {
      console.error(error);
   }
}

// update company details
export const updateCompany = async (req, res) => {
   try {
      const { name, description, website, location, logo } = req.body;
      const file = req.file;
      
      // cloudinary

      // const updateData = { name, description, website, location };
      const updateData = { };

      if (name) {
         updateData.name = name;
      }

      if (description) {
         updateData.description = name;
      }

      if (website) {
         updateData.website = website;
      }

      if (location) {
         updateData.location = location;
      }

      const company = await Company.findByIdAndUpdate(req.params.id, updateData,{
         new: true,
      });

      if (!company) {
         return res.status(404).json({
            message: "Company not found"
         });
      }
      return res.status(200).json({
         message: "Company updated"
      });
      
   } catch (error) {
      console.error(error);
   }
}