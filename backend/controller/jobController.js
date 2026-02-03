import { Job } from "../models/jobModel.js";

export const postJob = async (req, res) => {
   try {
      const { 
         title, 
         description, 
         requirements, 
         experience, 
         location, 
         salary, 
         jobtype, 
         companyId, 
         position 
      } = req.body;

      const userId = req.id;

      if (!title || !description || !requirements || !experience || !location || !salary || !jobtype || !companyId || !position ) {
         return res.status(400).json({
            message: "Please fill all the fields",
            status: false
         });
      }

      const job = await Job.create({
         title, 
         description, 
         requirements: requirements.split(","), 
         experience: Number(experience),
         location, 
         salary: Number(salary), 
         jobtype, 
         company: companyId, 
         position, 
         created_by: userId
      });
      return res.status(201).json({
         message: "Job posted successfully",
         status: true,
         job,
      });
   } catch (error) {
      console.error(error);
      return res.status(500).json({
         message: "Server error to posting a job",
         status: false
      });
   }
};

export const getAllJobs = async (req, res) => {
   try {
      const keyword = req.query.keyword || "";
      const query = {
         $or: [
            { title: {$regex: keyword, $options: "i" }},
            { description: {$regex: keyword, $options: "i" }}
         ],
      };

      const jobs = await Job.find(query).populate({
         path: "company",
      }).sort({createdAt:-1});

      if (!jobs) {
         return res.status(404).json({
            message: "No job found",
            status: false,
         });
      }

      return res.status(200).json({
         jobs,
         status: true,
      });      
      
   } catch (error) {
      console.error(error);
      return res.status(500).json({
         message: "Server Error",
         status: false
      });     
   }
}

export const getJobById = async (req, res) => {
   try {
      const jobId = req.params.id;
      const job = await Job.findById(jobId);

      if (!job) {
         return res.status(404).json({
            message: "No job found",
            status: false,
         });
      }
      
      return res.status(200).json({
         job,
         status: false,
      });
      
   } catch (error) {
      console.error(error);
      return res.status(500).json({
         message: "Server Error",
         status: false,
      });
   }
}

// Admin job created

export const getAdminJob = async (req, res) => {
   try {
      const adminId = req.id;
      const jobs = await Job.find({
         created_by: adminId
      });

      if (!jobs) {
         return res.status().json({
            message: "No job found",
            status: false,
         });
      }
      return res.status(200).json({
         jobs,
         status: false,
      });
      
   } catch (error) {
      console.error(error);
      
      return res.status(500).json({
         message: "Server error",
         status: false,
      });
   }
}