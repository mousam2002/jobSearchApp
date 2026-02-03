import { Application } from "../models/applicationModel.js"
import { Job } from "../models/jobModel";

export const applyJob = async (req, res) =>{
   try {
      const userId = req.id;
      // const { id:jobId } = req.params;
      const jobId = req.params.id

      if (!jobId) {
         return res.status(400).josn({
            message: "Invalid job id",
            success: false,
         })
      }

      // check if the user already has applied foe this job

      const existingApplication = await Application.findOne({
         job: jobId,
         applicant: userId,
      })

      if (existingApplication) {
         return res.status(400).josn({
            message: "You have already applied for this job",
            success: false,
         })
      }

      // check if the job exists or not
      const job = await Job.findById(jobId);
      if (!jobId) {
         return res.status(400).josn({
            message: "Job not found",
            success: false,
         })
      }

      // create a new application 
      const application = new Application({
         job: jobId,
         applicant: userId,
      });
      job.applications.push(newApplication._id);
      await Job.save();

      return res.status(201).json({
         message: "Application submitted",
         success: "true",
      })
      
   } catch (error) {
      console.error(error);

      return res.status(500).json({
         message: "Server error",
         status: false,
      });
   }
}

export const getAppliedJobs = async (req, res) => {
   try {
      const userId = req.id;
      const applications = await Application.find({
         applicant: userId,
      })
      .sort({createdAt: -1})
      .populate({
         path: 'job', 
         options:{sort: {createdAt: -1}}, 
         populate: {path: "company", options: {sort: {createdAt: -1}}},
      });

      if (!applications) {
         return res.status(404).json({
            message: "No application found",
            success: false
         })
      }

      return res.status(200).json({
         applications,
         success: false
      })
   } catch (error) {
      console.error(error);

      return res.status(500).json({
         message: "Server error",
         status: false,
      });     
   }
}

export const getApplicants = async (req, res) => {
   try {

   } catch (error) {
      console.error(error);

      return res.status(500).json({
         message: "Server error",
         status: false,
      });     
   }
}