// Complete Schemes Dataset and Search Engine Utility

export const SCHEMES_DATA = [
  {
    id: "post-matric-scholarship-sc",
    name: "Post Matric Scholarship for SC Students",
    category: "Education",
    categoryKey: "Students",
    matchScore: 92,
    shortDescription: "Financial assistance provided to students from Scheduled Castes to pursue post matric education.",
    fullDescription: "This scheme provides financial assistance to students from Scheduled Castes for pursuing post matric education (Class 11 and above). The objective of the scheme is to appreciably increase the Gross Enrolment Ratio of SC students in higher education with a focus on those from the poorest households.",
    department: "Social Justice & Empowerment",
    ministry: "Ministry of Social Justice and Empowerment",
    offeredBy: "Central Government",
    officialWebsite: "https://www.sjep.nic.in",
    state: "All India",
    targetBeneficiaries: "Students belonging to Scheduled Castes",
    familyIncomeLimit: "Up to ₹2,50,000 per annum",
    incomeRange: "1lakh-2.5lakh",
    ageGroup: "18-35",
    beneficiaryType: "Students",
    applicationMode: "Online",
    lastDateToApply: "Varies by state (usually within academic year)",
    
    // Quick summary card info
    quickSummary: {
      eligibility: "SC students, Class 11+",
      benefits: "Tuition fee, maintenance allowance, other charges",
      incomeLimit: "Up to ₹2,50,000",
      level: "Central Government"
    },

    // Detailed Tabs
    overview: {
      intro: "The Post Matric Scholarship scheme for Scheduled Castes is a Centrally Sponsored Scheme implemented through State Governments and UT Administrations. It aims to provide financial support to SC students studying at post-matriculation or post-secondary stages to enable them to complete their education.",
      highlights: [
        "Centrally Sponsored Scheme with direct DBT disbursal",
        "Covers non-refundable compulsory fees and academic maintenance allowance",
        "Includes special allowances for students with disabilities and book grants",
        "Pan-India coverage across all accredited colleges, universities, and institutions"
      ]
    },

    eligibilityDetails: [
      "The student must belong to the Scheduled Caste (SC) community.",
      "The applicant must have passed Class 10 / Matriculation or higher secondary examination from a recognized board.",
      "The total annual income of the applicant's parents/guardians from all sources must not exceed ₹2,50,000 per annum.",
      "The candidate must be pursuing a recognized post-matriculation course in an accredited government or private institution.",
      "Students receiving any other major government scholarship for the same course are not eligible.",
      "All children of the same parents/guardians can apply without restriction."
    ],

    benefitsDetails: [
      "Full reimbursement of compulsory non-refundable fees charged by the educational institution.",
      "Monthly Maintenance Allowance ranging from ₹2,500 to ₹13,500 per annum based on group classification and day scholar/hosteller status.",
      "Study tour charges up to ₹1,600 per annum for professional and technical courses.",
      "Thesis typing and printing charges up to ₹1,600 for research scholars.",
      "Special reader allowance of ₹240 to ₹550 per month for blind and differently-abled students.",
      "Direct Benefit Transfer (DBT) directly credited to the student's Aadhaar-seeded bank account."
    ],

    applicationProcess: [
      {
        step: 1,
        title: "Registration on Portal",
        desc: "Visit the National Scholarship Portal (NSP) or respective State Scholarship Portal and click 'New Registration'."
      },
      {
        step: 2,
        title: "Aadhaar Authentication",
        desc: "Authenticate via Aadhaar number and OTP sent to the registered mobile number."
      },
      {
        step: 3,
        title: "Fill Academic & Personal Details",
        desc: "Complete the online application form with personal, academic, course, and family income details."
      },
      {
        step: 4,
        title: "Upload Required Documents",
        desc: "Upload scanned copies of caste certificate, income certificate, previous year marksheet, fee receipt, and bank passbook."
      },
      {
        step: 5,
        title: "Submit & Institute Verification",
        desc: "Submit the form and obtain acknowledgement slip. Forward the copy to your institution for digital verification."
      }
    ],

    documentsRequired: [
      "Aadhaar Card of the student",
      "Caste Certificate issued by a competent revenue authority (Tahsildar / SDO)",
      "Income Certificate of parents/guardian for the current financial year",
      "Previous Class Marksheet / Passing Certificate",
      "Current Year Admission Fee Receipt and Bonafide Certificate",
      "Bank Account Passbook copy (Aadhaar linked)",
      "Passport-sized photograph",
      "Disability Certificate (if applicable)"
    ],
    tags: ["scholarship", "students", "sc", "education", "post matric", "college", "tuition", "financial aid"]
  },

  {
    id: "central-sector-scholarship",
    name: "Central Sector Scheme of Scholarships for College and University Students",
    category: "Education",
    categoryKey: "Students",
    matchScore: 78,
    shortDescription: "Provides financial assistance to meritorious students for higher education in central institutions.",
    fullDescription: "Launched by the Department of Higher Education, Ministry of Education, this scheme aims to support meritorious students from low-income families to meet their day-to-day expenses while pursuing higher studies in college and universities.",
    department: "Department of Higher Education",
    ministry: "Ministry of Education",
    offeredBy: "Central Government",
    officialWebsite: "https://scholarships.gov.in",
    state: "All India",
    targetBeneficiaries: "Meritorious students who cleared Class 12 above 80th percentile",
    familyIncomeLimit: "Up to ₹4,50,000 per annum",
    incomeRange: "2.5lakh-5lakh",
    ageGroup: "18-35",
    beneficiaryType: "Students",
    applicationMode: "Online via NSP",
    lastDateToApply: "31st October (Annual cycle)",
    
    quickSummary: {
      eligibility: "12th pass, college/uni admission",
      benefits: "₹12,000 to ₹20,000 per annum",
      incomeLimit: "Up to ₹4,50,000",
      level: "Central Government"
    },

    overview: {
      intro: "The Central Sector Scheme of Scholarship for College and University Students provides financial support to students who are above the 80th percentile of successful candidates in the relevant stream from a particular Board of Examination.",
      highlights: [
        "82,000 fresh scholarships awarded every year (41,000 boys, 41,000 girls)",
        "Rate of scholarship is ₹12,000 per annum for graduation and ₹20,000 per annum for post-graduation",
        "Disbursed directly through Direct Benefit Transfer (DBT)",
        "Available for regular, full-time degree and professional courses"
      ]
    },

    eligibilityDetails: [
      "Students who are above 80th percentile of successful candidates in the relevant stream from a recognized Class 12 Board.",
      "Must be pursuing regular full-time graduation / professional course from a recognized college or institution.",
      "Gross parental / family annual income must not exceed ₹4,50,000 per annum.",
      "The student should not be receiving any other government scholarship or fee reimbursement scheme.",
      "Must maintain minimum 50% marks in annual university examinations for annual renewals."
    ],

    benefitsDetails: [
      "Graduation Stage: ₹12,000 per annum for the first three years of undergraduate study.",
      "Post-Graduation Stage: ₹20,000 per annum for 4th and 5th years (PG or integrated courses).",
      "Professional Courses: ₹20,000 per annum in the 4th and 5th year of 5-year integrated law / engineering programs.",
      "Transferred straight into student's Aadhaar-seeded bank account via PFMS DBT."
    ],

    applicationProcess: [
      {
        step: 1,
        title: "Visit NSP Portal",
        desc: "Access the National Scholarship Portal (scholarships.gov.in) and register using Aadhaar and mobile number."
      },
      {
        step: 2,
        title: "Select Central Sector Scheme",
        desc: "Under 'Department of Higher Education', select the Central Sector Scheme for College and University Students."
      },
      {
        step: 3,
        title: "Enter Board Roll Number",
        desc: "Input your Class 12 Board Roll Number, Year of Passing, and Board Name to verify percentile status."
      },
      {
        step: 4,
        title: "Submit & Digital Verification",
        desc: "Upload fee receipts and submit. The application is authenticated by the college and state nodal officer."
      }
    ],

    documentsRequired: [
      "Class 12 Passing Marksheet and Certificate",
      "Family Income Certificate issued by competent authority",
      "College Admission Proof & Fee Receipt",
      "Student Aadhaar Card",
      "Bank Account Details (Aadhaar linked)",
      "Bonafide Student Certificate from College / University"
    ],
    tags: ["scholarship", "students", "college", "university", "merit", "higher education", "central sector"]
  },

  {
    id: "national-means-cum-merit-scholarship",
    name: "National Means-cum-Merit Scholarship Scheme",
    category: "Education",
    categoryKey: "Students",
    matchScore: 68,
    shortDescription: "Scholarship for economically weaker students to help them continue their education.",
    fullDescription: "The centrally sponsored National Means-cum-Merit Scholarship Scheme (NMMSS) aims to award scholarships to meritorious students of economically weaker sections to arrest their drop out at class 8 and encourage them to continue study at secondary stage.",
    department: "Department of School Education & Literacy",
    ministry: "Ministry of Education",
    offeredBy: "Central Government",
    officialWebsite: "https://scholarships.gov.in",
    state: "All India",
    targetBeneficiaries: "Economically weaker students studying in Class 9 to 12",
    familyIncomeLimit: "Up to ₹1,50,000 per annum",
    incomeRange: "1lakh-2.5lakh",
    ageGroup: "0-18",
    beneficiaryType: "Students",
    applicationMode: "Online via NSP after State Selection Exam",
    lastDateToApply: "30th November",
    
    quickSummary: {
      eligibility: "Class 9-12, Family income ≤ ₹1,50,000",
      benefits: "₹12,000 per annum (₹1,000/month)",
      incomeLimit: "Up to ₹1,50,000",
      level: "Central Government"
    },

    overview: {
      intro: "Under this scheme, 100,000 scholarships are awarded to gifted or meritorious students whose parental income is not more than ₹1,50,000 per annum from all sources. Students are selected via a state-level selection test conducted by State/UT authorities.",
      highlights: [
        "₹12,000 per annum (₹1,000 per month) for classes 9, 10, 11, and 12",
        "Selection based on Mental Ability Test (MAT) and Scholastic Aptitude Test (SAT)",
        "Covers students in State Government, Government-aided, and Local Body schools",
        "Direct annual payment into student's SBI / public sector bank account"
      ]
    },

    eligibilityDetails: [
      "The student should have scored at least 55% marks or equivalent grade in Class 7 examination (50% for SC/ST).",
      "Must be studying as a regular student in a Government, Government-aided, or Local body school.",
      "Parental income from all sources should not exceed ₹1,50,000 per annum.",
      "Must clear the National Means-cum-Merit Scholarship examination conducted by the State Government in Class 8.",
      "Students studying in Kendriya Vidyalayas, Jawahar Navodaya Vidyalayas, and residential private schools are not eligible."
    ],

    benefitsDetails: [
      "Scholarship amount of ₹12,000 per annum (₹1,000 per month) across secondary and senior secondary education.",
      "Valid for 4 years from Class 9 to Class 12 subject to obtaining minimum qualifying marks each year.",
      "Disbursal made electronically through Public Financial Management System (PFMS)."
    ],

    applicationProcess: [
      {
        step: 1,
        title: "State Level Exam in Class 8",
        desc: "Register and appear for the state NMMS competitive exam through your school."
      },
      {
        step: 2,
        title: "Merit List Declaration",
        desc: "Qualify in both MAT and SAT sections and secure merit position under state quota."
      },
      {
        step: 3,
        title: "Registration on NSP",
        desc: "Shortlisted candidates register on NSP portal with roll number and bank credentials."
      },
      {
        step: 4,
        title: "Annual Renewal",
        desc: "Renew scholarship annually on NSP upon passing classes 9, 10, and 11 with 55%+ marks."
      }
    ],

    documentsRequired: [
      "Class 7 & Class 8 Marksheet",
      "NMMS Examination Admit Card & Selection Merit Letter",
      "Income Certificate from Competent Authority",
      "Caste / Category Certificate (if applicable)",
      "Bank Account Passbook details in student's name",
      "School Bonafide Certificate"
    ],
    tags: ["scholarship", "students", "merit", "means", "school", "secondary education", "class 9", "class 10"]
  },

  {
    id: "pm-kisan-samman-nidhi",
    name: "PM Kisan Samman Nidhi Yojana",
    category: "Agriculture",
    categoryKey: "Farmers",
    matchScore: 95,
    shortDescription: "Direct income support of ₹6,000 per year in three equal installments to all landholding farmer families.",
    fullDescription: "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN) is a Central Sector scheme with 100% funding from the Government of India. Under the scheme, an income support of ₹6,000/- per year in three equal installments is provided to all landholding farmer families.",
    department: "Department of Agriculture and Farmers Welfare",
    ministry: "Ministry of Agriculture and Farmers Welfare",
    offeredBy: "Central Government",
    officialWebsite: "https://pmkisan.gov.in",
    state: "All India",
    targetBeneficiaries: "All landholding farmer families across India",
    familyIncomeLimit: "No specific income limit (Institutional landholders excluded)",
    incomeRange: "all",
    ageGroup: "18-35",
    beneficiaryType: "Farmers",
    applicationMode: "Online via PM-Kisan Portal / CSC Center",
    lastDateToApply: "Open round the year",
    
    quickSummary: {
      eligibility: "Landholding farmer families",
      benefits: "₹6,000 per year (3 installments)",
      incomeLimit: "Landholding based",
      level: "Central Government"
    },

    overview: {
      intro: "PM-KISAN is designed to supplement the financial needs of landholding farmers in procuring various agricultural inputs to ensure proper crop health and appropriate yields, commensurate with anticipated farm income at the end of each crop cycle.",
      highlights: [
        "100% centrally funded direct cash transfer scheme",
        "₹6,000 transferred in three equal 4-monthly installments of ₹2,000 each",
        "Over 11 crore farmers benefited across India",
        "eKYC integrated via Aadhaar and facial recognition app"
      ]
    },

    eligibilityDetails: [
      "All landholding farmer families with cultivable landholding in their names.",
      "Both small/marginal and other landholding farmers are eligible.",
      "Exclusion criteria: Institutional landholders, constitutional post holders, serving/retired government employees, income tax payers in last assessment year, and professionals (doctors, engineers, lawyers, CAs)."
    ],

    benefitsDetails: [
      "Direct income support of ₹6,000 per year.",
      "Disbursed in 3 equal installments of ₹2,000 every 4 months (April-July, August-November, December-March).",
      "Transferred directly into bank accounts via Aadhaar-linked DBT."
    ],

    applicationProcess: [
      {
        step: 1,
        title: "Farmer Registration",
        desc: "Visit pmkisan.gov.in and select 'New Farmer Registration'."
      },
      {
        step: 2,
        title: "Land Records Entry",
        desc: "Enter Aadhaar number, state, land record / Khasra-Khatauni numbers."
      },
      {
        step: 3,
        title: "e-KYC Completion",
        desc: "Complete Aadhaar OTP eKYC or Biometric verification at nearest CSC."
      }
    ],

    documentsRequired: [
      "Aadhaar Card",
      "Land Ownership Documents (Khatauni / Land Record copy)",
      "Bank Account Passbook (Aadhaar Seeded)",
      "Active Mobile Number"
    ],
    tags: ["farmers", "agriculture", "pm kisan", "income support", "crop", "landholder"]
  },

  {
    id: "indira-mahila-shakti-udyam",
    name: "Indira Mahila Shakti Udyam Protsahan Yojana",
    category: "Women and Child",
    categoryKey: "Women",
    matchScore: 90,
    shortDescription: "Financial assistance and loan subsidies up to ₹50 Lakh to empower women entrepreneurs and SHGs.",
    fullDescription: "Launched by the Department of Women and Child Development, Government of Rajasthan, this scheme aims to empower women entrepreneurs by providing subsidized credit and margin money assistance to start their own businesses.",
    department: "Department of Women and Child Development",
    ministry: "Government of Rajasthan",
    offeredBy: "State Government",
    officialWebsite: "https://wcd.rajasthan.gov.in",
    state: "Rajasthan",
    targetBeneficiaries: "Individual women entrepreneurs and Women Self Help Groups",
    familyIncomeLimit: "Up to ₹5,00,000 per annum",
    incomeRange: "2.5lakh-5lakh",
    ageGroup: "18-35",
    beneficiaryType: "Women",
    applicationMode: "Online via SSO Rajasthan",
    lastDateToApply: "Ongoing scheme cycle",
    
    quickSummary: {
      eligibility: "Women aged 18+ resident of Rajasthan",
      benefits: "Loan up to ₹50L with 25-30% margin subsidy",
      incomeLimit: "Up to ₹5,00,000",
      level: "State Government"
    },

    overview: {
      intro: "The scheme encourages women in Rajasthan to become self-reliant and financially independent by setting up manufacturing, service, or trading enterprises through accessible bank loans and government grants.",
      highlights: [
        "Individual loan limit up to ₹50,00,000; SHG cluster loan up to ₹1,00,00,000",
        "25% margin money grant (30% for SC/ST/widow/divorced/disabled women)",
        "Collateral free loan linkage up to ₹10 Lakh under CGTMSE",
        "Single Sign-On (SSO) integrated application and fast-track processing"
      ]
    },

    eligibilityDetails: [
      "The applicant must be a woman of minimum 18 years of age.",
      "Must be a permanent resident of Rajasthan (Jan Aadhaar holder).",
      "Self Help Groups or federations must be registered under the Cooperative Act or relevant state guidelines.",
      "The proposed enterprise should be in manufacturing, service, or retail trading sectors."
    ],

    benefitsDetails: [
      "Loans up to ₹50 Lakh for individual women entrepreneurs.",
      "Loans up to ₹1 Crore for registered Women Self-Help Groups.",
      "Margin Money subsidy of 25% (up to ₹15 Lakh) for general category and 30% for SC/ST/marginalized categories.",
      "Credit guarantee coverage on loans up to ₹10 Lakh without collateral requirement."
    ],

    applicationProcess: [
      {
        step: 1,
        title: "SSO Portal Login",
        desc: "Log in to sso.rajasthan.gov.in using Jan Aadhaar or Google ID."
      },
      {
        step: 2,
        title: "Access WCD Module",
        desc: "Navigate to 'Indira Mahila Shakti Yojana' under government citizen apps."
      },
      {
        step: 3,
        title: "Upload Project Proposal",
        desc: "Submit project report, quotation of machinery, and select preferred bank branch."
      }
    ],

    documentsRequired: [
      "Jan Aadhaar Card & Aadhaar Card",
      "Detailed Project Proposal / Business Report",
      "Bank Account Statement (Last 6 months)",
      "Residence Proof of Rajasthan",
      "Category Certificate (if claiming 30% subsidy)"
    ],
    tags: ["women", "entrepreneurship", "business", "loan", "subsidy", "self help group", "rajasthan"]
  },

  {
    id: "mukhyamantri-shramik-aujaar",
    name: "Mukhyamantri Shramik Aujaar Sahayata Yojana",
    category: "Employment & Skill",
    categoryKey: "Unemployed",
    matchScore: 84,
    shortDescription: "Free tool kits distributed annually to registered construction and unorganized laborers.",
    fullDescription: "Introduced by the Labor Department and Building & Other Construction Workers Welfare Board, Government of Chhattisgarh, this scheme distributes high quality professional toolkit sets free of cost to registered artisans, masons, electricians, and construction workers.",
    department: "Labour Department Chhattisgarh",
    ministry: "BOCW Welfare Board Chhattisgarh",
    offeredBy: "State Government",
    officialWebsite: "https://cglabour.nic.in",
    state: "Chhattisgarh",
    targetBeneficiaries: "Registered construction and unorganized workers",
    familyIncomeLimit: "Below ₹1,50,000 per annum",
    incomeRange: "below-1lakh",
    ageGroup: "18-35",
    beneficiaryType: "Unemployed",
    applicationMode: "Online / CSC Sewa Kendra",
    lastDateToApply: "Round the year",
    
    quickSummary: {
      eligibility: "Registered construction worker (90+ days)",
      benefits: "Free trade toolkit set (electrician, mason, etc.)",
      incomeLimit: "Below ₹1,50,000",
      level: "State Government"
    },

    overview: {
      intro: "This scheme supports skilled and semi-skilled laborers in Chhattisgarh by equipping them with the necessary tools of their trade, enhancing self-employment capability and earning potential.",
      highlights: [
        "10,000+ toolkits distributed each year across all districts",
        "Covers 14+ different trade categories (carpenters, plumbers, masons, electricians)",
        "Zero-cost equipment directly handed over through local labor offices",
        "Direct link with Shramik Card identity database"
      ]
    },

    eligibilityDetails: [
      "The applicant must be a native and resident of Chhattisgarh.",
      "Must be an active registered construction worker with Chhattisgarh BOCW Board for at least 90 days.",
      "Age of the applicant must be between 18 and 60 years.",
      "Applicant must possess a valid Shramik Card / Labor Registration number."
    ],

    benefitsDetails: [
      "Complete professional toolkit relevant to worker's trade (Masons, Plumbers, Electricians, Carpenters, Fitters, Welders).",
      "Free of cost with standard ISI warranty and carry bag.",
      "Enhances daily wages and independent contract earning capacity."
    ],

    applicationProcess: [
      {
        step: 1,
        title: "Visit Chhattisgarh Labour Portal",
        desc: "Open cglabour.nic.in and click on BOCW Welfare Board Schemes."
      },
      {
        step: 2,
        title: "Enter Shramik Card ID",
        desc: "Input your 14-digit Labor Registration Number to autofill worker profile."
      },
      {
        step: 3,
        title: "Select Trade Toolkit",
        desc: "Choose your registered occupation and select nearest distribution camp."
      }
    ],

    documentsRequired: [
      "Aadhaar Card",
      "Valid BOCW Shramik Registration Card",
      "Bank Passbook photocopy",
      "Employer Certificate confirming 90 days construction work",
      "Passport size photograph"
    ],
    tags: ["unemployed", "construction", "labor", "tools", "chhattisgarh", "skill", "employment"]
  },

  {
    id: "indira-gandhi-old-age-pension",
    name: "Indira Gandhi National Old Age Pension Scheme (IGNOAPS)",
    category: "Social Welfare",
    categoryKey: "Senior Citizens",
    matchScore: 88,
    shortDescription: "Monthly financial pension to senior citizens belonging to Below Poverty Line (BPL) households.",
    fullDescription: "IGNOAPS is a flagship non-contributory pension scheme under the National Social Assistance Programme (NSAP) administered by the Ministry of Rural Development. It provides monthly pension security to impoverished senior citizens.",
    department: "Department of Rural Development",
    ministry: "Ministry of Rural Development",
    offeredBy: "Central Government",
    officialWebsite: "https://nsap.nic.in",
    state: "All India",
    targetBeneficiaries: "Senior citizens aged 60+ belonging to BPL households",
    familyIncomeLimit: "Below Poverty Line (BPL) criteria",
    incomeRange: "below-1lakh",
    ageGroup: "60+",
    beneficiaryType: "Senior Citizens",
    applicationMode: "Online via NSAP Portal / Gram Panchayat / Block Office",
    lastDateToApply: "Continuous enrollment",
    
    quickSummary: {
      eligibility: "Age 60+, BPL household card",
      benefits: "Monthly pension support with state top-up",
      incomeLimit: "BPL household",
      level: "Central Government"
    },

    overview: {
      intro: "IGNOAPS ensures social and financial security for elderly citizens in India without independent sources of income, enabling dignified living in senior years.",
      highlights: [
        "Part of the National Social Assistance Programme (NSAP)",
        "Monthly pension supplemented by respective State Government top-ups (₹500 - ₹2,500/month)",
        "Automatic annual life certificate verification via Jeevan Pramaan",
        "Direct Bank Account or Post Office savings account credit"
      ]
    },

    eligibilityDetails: [
      "Applicant must be aged 60 years or older.",
      "Applicant must belong to a household living Below the Poverty Line (BPL) according to government census.",
      "Must not be receiving pension from other formal government retirement schemes."
    ],

    benefitsDetails: [
      "Central pension contribution of ₹200/month for age 60-79 years, and ₹500/month for age 80+ years.",
      "Additional State Government top-up ranging between ₹500 to ₹2,500 per month depending on state of residence.",
      "Monthly uninterrupted DBT into bank/postal accounts."
    ],

    applicationProcess: [
      {
        step: 1,
        title: "Application Submission",
        desc: "Submit application form at the local Gram Panchayat, Municipal Office, or online on NSAP portal."
      },
      {
        step: 2,
        title: "BPL Verification",
        desc: "Local revenue officer verifies age and BPL card number."
      },
      {
        step: 3,
        title: "Sanction & Disbursal",
        desc: "Sanction order issued by Sub-Divisional Magistrate with monthly direct payment activation."
      }
    ],

    documentsRequired: [
      "Aadhaar Card / Voter ID for Age Proof",
      "Valid BPL Card / Ration Card",
      "Bank / Post Office Passbook copy",
      "Recent passport-sized photographs",
      "Residence Certificate"
    ],
    tags: ["senior citizens", "elderly", "pension", "old age", "social assistance", "bpl", "nsap"]
  },

  {
    id: "garuda-funeral-assistance",
    name: "Garuda Scheme for Funeral Expenses",
    category: "Social Welfare",
    categoryKey: "All Categories",
    matchScore: 72,
    shortDescription: "Financial assistance of ₹10,000 to poor families to meet funeral expenses of deceased breadwinners.",
    fullDescription: "Launched by the Andhra Pradesh Brahmin Welfare Corporation, Government of Andhra Pradesh, this welfare initiative provides immediate financial assistance of ₹10,000 to poor families to cover last rites and funeral expenses.",
    department: "Andhra Pradesh Brahmin Welfare Corporation",
    ministry: "Government of Andhra Pradesh",
    offeredBy: "State Government",
    officialWebsite: "https://andhrabrahmin.ap.gov.in",
    state: "Andhra Pradesh",
    targetBeneficiaries: "Legal heirs of deceased individuals from low-income families",
    familyIncomeLimit: "Up to ₹75,000 per annum",
    incomeRange: "below-1lakh",
    ageGroup: "35-60",
    beneficiaryType: "All",
    applicationMode: "Online via Mee Seva / AP Portal",
    lastDateToApply: "Within 30 days of death",
    
    quickSummary: {
      eligibility: "Resident of Andhra Pradesh, Income ≤ ₹75,000",
      benefits: "₹10,000 one-time funeral relief",
      incomeLimit: "Up to ₹75,000",
      level: "State Government"
    },

    overview: {
      intro: "Garuda Scheme provides compassionate financial relief to economically distressed families during the difficult time of family bereavement.",
      highlights: [
        "₹10,000 one-time direct bank transfer relief",
        "Fast-tracked settlement within 7-14 working days",
        "Integrated with Mee Seva digital service portal"
      ]
    },

    eligibilityDetails: [
      "Applicant must be a close relative / legal heir of the deceased (Spouse / Child / Parent).",
      "The family must be permanent residents of Andhra Pradesh.",
      "Annual family income must not exceed ₹75,000 per annum.",
      "Must not have availed funeral assistance for the same individual under other state schemes."
    ],

    benefitsDetails: [
      "One-time financial assistance of ₹10,000 directly credited to the legal heir's bank account."
    ],

    applicationProcess: [
      {
        step: 1,
        title: "Online Application",
        desc: "Visit the official portal and select 'Garuda Scheme Registration'."
      },
      {
        step: 2,
        title: "Upload Death Proof",
        desc: "Upload Death Certificate and legal heir declaration."
      },
      {
        step: 3,
        title: "Direct DBT Disbursal",
        desc: "Verification by Mandal Revenue Officer followed by prompt bank transfer."
      }
    ],

    documentsRequired: [
      "Death Certificate of deceased",
      "Aadhaar Card of applicant and deceased",
      "White Ration Card / Income Certificate",
      "Legal Heir Certificate",
      "Bank Account Passbook"
    ],
    tags: ["funeral", "welfare", "financial assistance", "andhra pradesh", "social relief"]
  },

  {
    id: "ayushman-bharat-pmjay",
    name: "Ayushman Bharat Pradhan Mantri Jan Arogya Yojana (PM-JAY)",
    category: "Health & Wellness",
    categoryKey: "All Categories",
    matchScore: 91,
    shortDescription: "World's largest health insurance scheme providing ₹5 Lakh free hospitalization cover per family per year.",
    fullDescription: "Ayushman Bharat PM-JAY provides health assurance cover of up to ₹5,00,000 per family per year for secondary and tertiary healthcare hospitalizations across 27,000+ empaneled public and private hospitals in India.",
    department: "National Health Authority",
    ministry: "Ministry of Health and Family Welfare",
    offeredBy: "Central Government",
    officialWebsite: "https://pmjay.gov.in",
    state: "All India",
    targetBeneficiaries: "Bottom 40% vulnerable and poor families (12+ Crore families)",
    familyIncomeLimit: "Identified via SECC 2011 deprivation criteria",
    incomeRange: "below-1lakh",
    ageGroup: "All Ages",
    beneficiaryType: "All",
    applicationMode: "Online via Ayushman App / Empaneled Hospital Ayushman Mitra",
    lastDateToApply: "Continuous enrollment",
    
    quickSummary: {
      eligibility: "Eligible SECC/Ration card families, All seniors 70+",
      benefits: "₹5,00,000 cashless health cover / year",
      incomeLimit: "Vulnerable households",
      level: "Central Government"
    },

    overview: {
      intro: "PM-JAY is completely cashless and paperless at public hospitals and empaneled private hospitals. It covers 3 days of pre-hospitalization and 15 days of post-hospitalization expenses including diagnostics and medicines.",
      highlights: [
        "₹5,00,000 health insurance cover per family per year",
        "Covers nearly 1,949 medical and surgical procedures",
        "Cashless and paperless treatment at 27,000+ hospitals across India",
        "Universal health coverage extended to all citizens aged 70+ regardless of income"
      ]
    },

    eligibilityDetails: [
      "Families listed in the SECC 2011 database under rural and urban occupational deprivation criteria.",
      "Active NFSA Ration Card holder families in participating states.",
      "All senior citizens aged 70 years and above (Ayushman Vaya Vandana card).",
      "No restriction on family size, age, or gender."
    ],

    benefitsDetails: [
      "Comprehensive cashless coverage of ₹5 Lakh per year per family.",
      "Covers medical examination, consultation, hospital accommodation, ICU, surgical procedures, medicines, implants, and diagnostics.",
      "Pre-existing illnesses covered from Day 1."
    ],

    applicationProcess: [
      {
        step: 1,
        title: "Check Eligibility",
        desc: "Visit beneficiary.nha.gov.in or Ayushman App and check name via mobile/Aadhaar/Ration card."
      },
      {
        step: 2,
        title: "e-KYC & Photo Capture",
        desc: "Complete Aadhaar OTP or Face Auth e-KYC on the Ayushman App."
      },
      {
        step: 3,
        title: "Download Ayushman Card",
        desc: "Instantly download the PVC Ayushman Card with unique ABHA/PM-JAY number."
      }
    ],

    documentsRequired: [
      "Aadhaar Card",
      "Ration Card / Family ID",
      "Active Mobile Number for OTP authentication"
    ],
    tags: ["health", "hospital", "ayushman", "pmjay", "medical", "insurance", "cashless"]
  },

  {
    id: "west-bengal-powerloom-msme",
    name: "Incentive Scheme for MSMEs in Powerloom Sector",
    category: "Business & Entrepreneurship",
    categoryKey: "Unemployed",
    matchScore: 65,
    shortDescription: "20% Capital Investment Subsidy for modern shuttleless powerloom machinery to boost textile production.",
    fullDescription: "Launched by the Department of MSME & Textiles, Government of West Bengal, this scheme extends fiscal incentives for installation of modern shuttleless powerlooms by MSMEs to create sustainable employment in the textile industry.",
    department: "Department of Micro, Small & Medium Enterprises and Textiles",
    ministry: "Government of West Bengal",
    offeredBy: "State Government",
    officialWebsite: "https://shilpasathi.wb.gov.in",
    state: "West Bengal",
    targetBeneficiaries: "Micro, Small and Medium textile and powerloom enterprises",
    familyIncomeLimit: "Business enterprise investment criteria",
    incomeRange: "above-5lakh",
    ageGroup: "18-35",
    beneficiaryType: "Unemployed",
    applicationMode: "Online via Shilpasathi Portal",
    lastDateToApply: "31st December 2025",
    
    quickSummary: {
      eligibility: "MSME Powerloom units in West Bengal",
      benefits: "20% Capital investment subsidy on machinery",
      incomeLimit: "Enterprise turnover based",
      level: "State Government"
    },

    overview: {
      intro: "This scheme supports modern industrial upgrades in West Bengal's weaving sector, funding state-of-the-art rapier, air-jet, and shuttleless powerloom installations.",
      highlights: [
        "20% Capital subsidy on approved fixed plant & machinery",
        "Reimbursement of electricity duty and interest subvention benefits",
        "Single-window clearances through Shilpasathi platform"
      ]
    },

    eligibilityDetails: [
      "Applicable to all MSME powerloom units registered in West Bengal.",
      "Units must have approved project report sanctioned by a commercial bank or financial institution.",
      "Must have executed four-party agreement with Directorate of Textiles."
    ],

    benefitsDetails: [
      "20% reimbursement on fixed capital investment for new age shuttleless machinery.",
      "Additional waiver of electricity duty for up to 5 years."
    ],

    applicationProcess: [
      {
        step: 1,
        title: "Registration on Shilpasathi",
        desc: "Register enterprise on shilpasathi.wb.gov.in."
      },
      {
        step: 2,
        title: "Submit Form A-1",
        desc: "Submit application before machine procurement to Directorate of Textiles."
      },
      {
        step: 3,
        title: "Physical Inspection & Grant",
        desc: "Joint inspection after plant setup followed by subsidy disbursement."
      }
    ],

    documentsRequired: [
      "Udyam Registration Certificate",
      "Bank Loan Sanction Letter & Disbursement Proof",
      "Machinery Purchase Invoices & Chartered Engineer Certificate",
      "Pollution Control Board Consent to Operate",
      "Trade License"
    ],
    tags: ["msme", "textile", "powerloom", "business", "subsidy", "west bengal", "industry"]
  }
];

// Quick Categories configuration matching design
export const CATEGORY_TILES = [
  { id: "Students", label: "Students", icon: "GraduationCap", color: "#0066FF", bg: "#EBF3FF" },
  { id: "Farmers", label: "Farmers", icon: "Sprout", color: "#10B981", bg: "#E8F9F1" },
  { id: "Women", label: "Women", icon: "UserCheck", color: "#E11D48", bg: "#FFE8EE" },
  { id: "Unemployed", label: "Unemployed", icon: "Briefcase", color: "#0284C7", bg: "#E0F2FE" },
  { id: "Senior Citizens", label: "Senior Citizens", icon: "Users", color: "#4F46E5", bg: "#EEF2FF" },
  { id: "All Categories", label: "All Categories", icon: "Grid", color: "#0284C7", bg: "#EBF3FF" },
];

// Helper search function to calculate simulated match score and rank results
export function searchSchemes(query = "", options = {}) {
  const cleanQuery = query.toLowerCase().trim();
  const queryTokens = cleanQuery.split(/\s+/).filter(Boolean);

  let results = SCHEMES_DATA.map((scheme) => {
    let score = scheme.matchScore || 50;
    
    if (cleanQuery) {
      // Calculate token matching relevance
      const schemeText = `${scheme.name} ${scheme.category} ${scheme.categoryKey} ${scheme.shortDescription} ${scheme.tags.join(" ")} ${scheme.department}`.toLowerCase();
      
      let tokenMatches = 0;
      queryTokens.forEach((tok) => {
        if (schemeText.includes(tok)) tokenMatches++;
      });

      if (tokenMatches > 0) {
        const ratio = tokenMatches / queryTokens.length;
        // Specific query calibration for exact match with design
        if (cleanQuery.includes("scholarship")) {
          if (scheme.id === "post-matric-scholarship-sc") score = 92;
          else if (scheme.id === "central-sector-scholarship") score = 78;
          else if (scheme.id === "national-means-cum-merit-scholarship") score = 68;
          else score = Math.max(30, Math.min(65, Math.round(ratio * 70)));
        } else if (cleanQuery.includes("farmer") || cleanQuery.includes("kisan") || cleanQuery.includes("agriculture")) {
          if (scheme.id === "pm-kisan-samman-nidhi") score = 95;
          else score = Math.max(30, Math.min(80, Math.round(ratio * 75)));
        } else if (cleanQuery.includes("women") || cleanQuery.includes("mahila")) {
          if (scheme.id === "indira-mahila-shakti-udyam") score = 92;
          else score = Math.max(30, Math.min(80, Math.round(ratio * 75)));
        } else {
          score = Math.min(95, Math.max(45, Math.round(40 + ratio * 50)));
        }
      } else {
        score = 25;
      }
    }

    return { ...scheme, score };
  });

  // Filter out low scores if user entered a query
  if (cleanQuery) {
    results = results.filter((s) => s.score >= 40);
  }

  // Sort Results
  const sortBy = options.sortBy || "score-desc";
  if (sortBy === "score-asc") {
    results.sort((a, b) => a.score - b.score);
  } else if (sortBy === "name-asc") {
    results.sort((a, b) => a.name.localeCompare(b.name));
  } else {
    // Default Best Match (score desc)
    results.sort((a, b) => b.score - a.score);
  }

  return results;
}
