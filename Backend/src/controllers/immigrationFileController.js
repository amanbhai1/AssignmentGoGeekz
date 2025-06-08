import ImmigrationFile from '../models/immigrationFileModel.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getActiveImmigrationFile = async (req, res) => {
  try {
    let immigrationFile = await ImmigrationFile.findOne({ 
      userId: req.user._id,
      isActive: true
    });

    // If no active file exists, create a default one
    if (!immigrationFile) {
      // Generate a unique file number
      const fileNumber = `IMM-${Date.now()}-${req.user._id.toString().slice(-4)}`;
      
      immigrationFile = await ImmigrationFile.create({
        userId: req.user._id,
        fileNumber,
        category: 'Express Entry', // Default category
        CRSScore: 0,
        status: 'New',
        notes: 'Default immigration file created automatically',
        checklist: [
          {
            title: 'Complete Personal Information',
            description: 'Fill in your personal details in the Immigration File section',
            isCompleted: false,
            dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
          },
          {
            title: 'Calculate CRS Score',
            description: 'Use the CRS Score calculator to determine your ranking',
            isCompleted: false,
            dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
          },
          {
            title: 'Upload Required Documents',
            description: 'Upload all necessary documents for your application',
            isCompleted: false,
            dueDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000), // 21 days from now
          }
        ],
        documents: [],
        isActive: true,
      });
    }

    res.json({
      success: true,
      immigrationFile,
    });
  } catch (error) {
    console.error('Error in getActiveImmigrationFile:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// @desc    Create a new immigration file
// @route   POST /api/immigration-files
// @access  Private

const updateImmigrationProfile = async (req, res) => {
  try {
    const { personalInfo, contactInfo, education, workExperience, languageProficiency } = req.body;
    
    const immigrationFile = await ImmigrationFile.findById(req.params.id);

    if (!immigrationFile) {
      return res.status(404).json({
        success: false,
        message: 'Immigration file not found',
      });
    }

    // Update profile sections
    if (personalInfo) immigrationFile.personalInfo = personalInfo;
    if (contactInfo) immigrationFile.contactInfo = contactInfo;
    if (education) immigrationFile.education = education;
    if (workExperience) immigrationFile.workExperience = workExperience;
    if (languageProficiency) immigrationFile.languageProficiency = languageProficiency;

    const updatedImmigrationFile = await immigrationFile.save();

    res.json({
      success: true,
      immigrationFile: updatedImmigrationFile,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const createImmigrationFile = async (req, res) => {
  try {
    const { fileNumber, category, CRSScore, status, notes } = req.body;

    // Check if file number already exists
    const fileExists = await ImmigrationFile.findOne({ fileNumber });

    if (fileExists) {
      return res.status(400).json({
        success: false,
        message: 'Immigration file with this number already exists',
      });
    }

    // Create new immigration file
    const immigrationFile = await ImmigrationFile.create({
      userId: req.user._id,
      fileNumber,
      category,
      CRSScore: CRSScore || 0,
      status: status || 'New',
      notes,
      checklist: [],
      documents: [],
    });

    res.status(201).json({
      success: true,
      immigrationFile,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get all immigration files for the logged-in user
// @route   GET /api/immigration-files
// @access  Private
const getImmigrationFiles = async (req, res) => {
  try {
    // For regular users, show only their own files
    // For admin/consultant, show all files
    const filter = req.user.role === 'client' ? { userId: req.user._id } : {};

    const immigrationFiles = await ImmigrationFile.find(filter)
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: immigrationFiles.length,
      immigrationFiles,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get single immigration file by ID
// @route   GET /api/immigration-files/:id
// @access  Private
const getImmigrationFileById = async (req, res) => {
  try {
    const immigrationFile = await ImmigrationFile.findById(req.params.id)
      .populate('userId', 'name email');

    if (!immigrationFile) {
      return res.status(404).json({
        success: false,
        message: 'Immigration file not found',
      });
    }

    // Check if user has permission to view this file
    if (
      req.user.role === 'client' &&
      immigrationFile.userId._id.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this file',
      });
    }

    res.json({
      success: true,
      immigrationFile,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update immigration file
// @route   PUT /api/immigration-files/:id
// @access  Private
const updateImmigrationFile = async (req, res) => {
  try {
    const { fileNumber, category, CRSScore, status, notes } = req.body;

    const immigrationFile = await ImmigrationFile.findById(req.params.id);

    if (!immigrationFile) {
      return res.status(404).json({
        success: false,
        message: 'Immigration file not found',
      });
    }

    // Check if user has permission to update this file
    if (
      req.user.role === 'client' &&
      immigrationFile.userId.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this file',
      });
    }

    // Update fields
    immigrationFile.fileNumber = fileNumber || immigrationFile.fileNumber;
    immigrationFile.category = category || immigrationFile.category;
    immigrationFile.CRSScore = CRSScore !== undefined ? CRSScore : immigrationFile.CRSScore;
    immigrationFile.status = status || immigrationFile.status;
    immigrationFile.notes = notes !== undefined ? notes : immigrationFile.notes;

    const updatedImmigrationFile = await immigrationFile.save();

    res.json({
      success: true,
      immigrationFile: updatedImmigrationFile,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Delete immigration file
// @route   DELETE /api/immigration-files/:id
// @access  Private
const deleteImmigrationFile = async (req, res) => {
  try {
    const immigrationFile = await ImmigrationFile.findById(req.params.id);

    if (!immigrationFile) {
      return res.status(404).json({
        success: false,
        message: 'Immigration file not found',
      });
    }

    // Check if user has permission to delete this file
    if (
      req.user.role === 'client' &&
      immigrationFile.userId.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this file',
      });
    }

    // Delete associated document files from storage
    if (immigrationFile.documents && immigrationFile.documents.length > 0) {
      immigrationFile.documents.forEach((doc) => {
        try {
          const filePath = path.join(__dirname, '../../uploads', path.basename(doc.fileUrl));
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
        } catch (err) {
          console.error('Error deleting file:', err);
        }
      });
    }

    await immigrationFile.deleteOne();

    res.json({
      success: true,
      message: 'Immigration file removed',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Add checklist item to immigration file
// @route   POST /api/immigration-files/:id/checklist
// @access  Private
const addChecklistItem = async (req, res) => {
  try {
    const { title, description, dueDate, notes } = req.body;

    const immigrationFile = await ImmigrationFile.findById(req.params.id);

    if (!immigrationFile) {
      return res.status(404).json({
        success: false,
        message: 'Immigration file not found',
      });
    }

    // Check if user has permission
    if (
      req.user.role === 'client' &&
      immigrationFile.userId.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this file',
      });
    }

    const checklistItem = {
      title,
      description,
      dueDate,
      notes,
      isCompleted: false,
    };

    immigrationFile.checklist.push(checklistItem);
    await immigrationFile.save();

    res.status(201).json({
      success: true,
      checklist: immigrationFile.checklist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update checklist item
// @route   PUT /api/immigration-files/:id/checklist/:itemId
// @access  Private
const updateChecklistItem = async (req, res) => {
  try {
    const { title, description, isCompleted, dueDate, notes } = req.body;

    const immigrationFile = await ImmigrationFile.findById(req.params.id);

    if (!immigrationFile) {
      return res.status(404).json({
        success: false,
        message: 'Immigration file not found',
      });
    }

    // Check if user has permission
    if (
      req.user.role === 'client' &&
      immigrationFile.userId.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this file',
      });
    }

    // Find checklist item
    const checklistItem = immigrationFile.checklist.id(req.params.itemId);

    if (!checklistItem) {
      return res.status(404).json({
        success: false,
        message: 'Checklist item not found',
      });
    }

    // Update checklist item
    checklistItem.title = title || checklistItem.title;
    checklistItem.description = description !== undefined ? description : checklistItem.description;
    checklistItem.isCompleted = isCompleted !== undefined ? isCompleted : checklistItem.isCompleted;
    checklistItem.dueDate = dueDate || checklistItem.dueDate;
    checklistItem.notes = notes !== undefined ? notes : checklistItem.notes;

    await immigrationFile.save();

    res.json({
      success: true,
      checklist: immigrationFile.checklist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Delete checklist item
// @route   DELETE /api/immigration-files/:id/checklist/:itemId
// @access  Private
const deleteChecklistItem = async (req, res) => {
  try {
    const immigrationFile = await ImmigrationFile.findById(req.params.id);

    if (!immigrationFile) {
      return res.status(404).json({
        success: false,
        message: 'Immigration file not found',
      });
    }

    // Check if user has permission
    if (
      req.user.role === 'client' &&
      immigrationFile.userId.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this file',
      });
    }

    // Find and remove checklist item
    const checklistItem = immigrationFile.checklist.id(req.params.itemId);

    if (!checklistItem) {
      return res.status(404).json({
        success: false,
        message: 'Checklist item not found',
      });
    }

    checklistItem.deleteOne();
    await immigrationFile.save();

    res.json({
      success: true,
      checklist: immigrationFile.checklist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Upload document to immigration file
// @route   POST /api/immigration-files/:id/documents
// @access  Private
const uploadDocument = async (req, res) => {
  try {
    const { title, description } = req.body;
    
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload a file',
      });
    }

    const immigrationFile = await ImmigrationFile.findById(req.params.id);

    if (!immigrationFile) {
      // Delete uploaded file if immigration file not found
      fs.unlinkSync(req.file.path);
      
      return res.status(404).json({
        success: false,
        message: 'Immigration file not found',
      });
    }

    // Check if user has permission
    if (
      req.user.role === 'client' &&
      immigrationFile.userId.toString() !== req.user._id.toString()
    ) {
      // Delete uploaded file if not authorized
      fs.unlinkSync(req.file.path);
      
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this file',
      });
    }

    // Create document object
    const document = {
      title: title || 'Untitled Document',
      description: description || '',
      fileUrl: `/uploads/${req.file.filename}`,
      fileType: req.file.mimetype,
      uploadedAt: Date.now(),
    };

    // Add document to immigration file
    immigrationFile.documents.push(document);
    await immigrationFile.save();

    res.status(201).json({
      success: true,
      document,
      documents: immigrationFile.documents,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Delete document from immigration file
// @route   DELETE /api/immigration-files/:id/documents/:documentId
// @access  Private
const deleteDocument = async (req, res) => {
  try {
    const immigrationFile = await ImmigrationFile.findById(req.params.id);

    if (!immigrationFile) {
      return res.status(404).json({
        success: false,
        message: 'Immigration file not found',
      });
    }

    // Check if user has permission
    if (
      req.user.role === 'client' &&
      immigrationFile.userId.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this file',
      });
    }

    // Find document
    const document = immigrationFile.documents.id(req.params.documentId);

    if (!document) {
      return res.status(404).json({
        success: false,
        message: 'Document not found',
      });
    }

    // Delete file from filesystem
    try {
      const filePath = path.join(__dirname, '../..', document.fileUrl);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch (err) {
      console.error('Error deleting file:', err);
    }

    // Remove document from immigration file
    document.deleteOne();
    await immigrationFile.save();

    res.json({
      success: true,
      message: 'Document removed',
      documents: immigrationFile.documents,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update CRS score
// @route   PUT /api/immigration-files/:id/crs-score
// @access  Private
const updateCRSScore = async (req, res) => {
  try {
    const { CRSScore } = req.body;

    if (CRSScore === undefined) {
      return res.status(400).json({
        success: false,
        message: 'CRS score is required',
      });
    }

    const immigrationFile = await ImmigrationFile.findById(req.params.id);

    if (!immigrationFile) {
      return res.status(404).json({
        success: false,
        message: 'Immigration file not found',
      });
    }

    // Check if user has permission
    if (
      req.user.role === 'client' &&
      immigrationFile.userId.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this file',
      });
    }

    immigrationFile.CRSScore = CRSScore;
    await immigrationFile.save();

    res.json({
      success: true,
      CRSScore: immigrationFile.CRSScore,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get checklist items for active immigration file
// @route   GET /api/immigration-files/checklist
// @access  Private
const getChecklistItems = async (req, res) => {
  try {
    const immigrationFile = await ImmigrationFile.findOne({ 
      userId: req.user._id,
      isActive: true
    });

    if (!immigrationFile) {
      return res.status(404).json({
        success: false,
        message: 'No active immigration file found',
      });
    }

    res.json({
      success: true,
      checklist: immigrationFile.checklist,
      fileId: immigrationFile._id,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get application categories (available immigration categories)
// @route   GET /api/immigration-files/categories
// @access  Private
const getApplicationCategories = async (req, res) => {
  try {
    const categories = [
      {
        id: 'express-entry',
        name: 'Express Entry',
        description: 'Federal Skilled Worker Program application for permanent residency',
        icon: '🇨🇦',
        eligibility: [
          'At least 1 year of continuous full-time skilled work experience',
          'Language proficiency in English and/or French',
          'Education equivalent to Canadian high school',
          'Meet minimum requirements in all six selection factors'
        ],
        requirements: [
          'Minimum CLB 7 in all language abilities',
          'Educational Credential Assessment (ECA)',
          'Proof of work experience',
          'Proof of funds ($13,310 for single applicant)'
        ],
        processingTime: '6 months',
        minCRS: 470,
        popularity: 'high'
      },
      {
        id: 'study-permit',
        name: 'Study Permit',
        description: 'Student visa application for studying in Canada',
        icon: '🎓',
        eligibility: [
          'Letter of acceptance from a designated learning institution',
          'Proof of financial support',
          'No criminal record',
          'Good health (medical exam may be required)'
        ],
        requirements: [
          'Letter of acceptance',
          'Proof of funds',
          'Statement of purpose',
          'Language proficiency test results'
        ],
        processingTime: '4-12 weeks',
        minCRS: 0,
        popularity: 'high'
      },
      {
        id: 'work-permit',
        name: 'Work Permit',
        description: 'LMIA-based work permit application',
        icon: '💼',
        eligibility: [
          'Job offer from Canadian employer',
          'Labour Market Impact Assessment (LMIA)',
          'Meet job requirements',
          'No criminal record'
        ],
        requirements: [
          'Job offer letter',
          'LMIA (if required)',
          'Proof of qualifications',
          'Medical exam (if required)'
        ],
        processingTime: '8-16 weeks',
        minCRS: 0,
        popularity: 'medium'
      },
      {
        id: 'family-sponsorship',
        name: 'Family Sponsorship',
        description: 'Sponsoring spouse for permanent residency in Canada',
        icon: '👪',
        eligibility: [
          'Canadian citizen or permanent resident sponsor',
          'Meet financial requirements',
          'Eligible relationship to sponsored person'
        ],
        requirements: [
          'Sponsorship agreement and undertaking',
          'Financial evaluation',
          'Relationship proof',
          'Background checks'
        ],
        processingTime: '12-24 months',
        minCRS: 0,
        popularity: 'medium'
      },
      {
        id: 'visitor-visa',
        name: 'Visitor Visa',
        description: 'Temporary resident visa for visiting Canada',
        icon: '✈️',
        eligibility: [
          'Valid travel document',
          'Good health',
          'No criminal record',
          'Ties to home country'
        ],
        requirements: [
          'Completed application form',
          'Proof of funds',
          'Travel itinerary',
          'Invitation letter (if applicable)'
        ],
        processingTime: '2-4 weeks',
        minCRS: 0,
        popularity: 'medium'
      },
      {
        id: 'citizenship',
        name: 'Citizenship',
        description: 'Canadian citizenship application',
        icon: '📜',
        eligibility: [
          'Permanent resident status',
          'Physical presence in Canada',
          'Language requirements',
          'Knowledge of Canada'
        ],
        requirements: [
          'Citizenship test',
          'Language proof',
          'Tax documents',
          'Physical presence calculator'
        ],
        processingTime: '12-18 months',
        minCRS: 0,
        popularity: 'low'
      },
      {
        id: 'other',
        name: 'Other',
        description: 'Other immigration programs and applications',
        icon: '📋',
        eligibility: [
          'Varies by specific program',
          'Consult with immigration consultant'
        ],
        requirements: [
          'Program-specific requirements',
          'Professional assessment recommended'
        ],
        processingTime: 'Varies',
        minCRS: 0,
        popularity: 'low'
      }
    ];

    // Get user's current immigration file to mark selected category
    const immigrationFile = await ImmigrationFile.findOne({ 
      userId: req.user._id,
      isActive: true
    });

    const categoriesWithStatus = categories.map(category => ({
      ...category,
      status: immigrationFile && immigrationFile.category.toLowerCase().replace(' ', '-') === category.id 
        ? 'selected' 
        : 'available'
    }));

    res.json({
      success: true,
      categories: categoriesWithStatus,
      currentCategory: immigrationFile?.category || null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update application category for active immigration file
// @route   PUT /api/immigration-files/category
// @access  Private
const updateApplicationCategory = async (req, res) => {
  try {
    const { category } = req.body;

    if (!category) {
      return res.status(400).json({
        success: false,
        message: 'Category is required',
      });
    }

    const immigrationFile = await ImmigrationFile.findOne({ 
      userId: req.user._id,
      isActive: true
    });

    if (!immigrationFile) {
      return res.status(404).json({
        success: false,
        message: 'No active immigration file found',
      });
    }

    immigrationFile.category = category;
    await immigrationFile.save();

    res.json({
      success: true,
      message: 'Application category updated successfully',
      category: immigrationFile.category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export {
  createImmigrationFile,
  getImmigrationFiles,
  getImmigrationFileById,
  updateImmigrationFile,
  deleteImmigrationFile,
  addChecklistItem,
  updateChecklistItem,
  deleteChecklistItem,
  uploadDocument,
  deleteDocument,
  updateCRSScore,
  getActiveImmigrationFile,
  updateImmigrationProfile,
  getChecklistItems,
  getApplicationCategories,
  updateApplicationCategory
};