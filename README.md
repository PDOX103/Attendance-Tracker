# Attendance-Tracker

## Team Members

| **ID**       | **Name**                 | **Email**                          | **Role**            |
|--------------|--------------------------|------------------------------------|---------------------|
| 20220104103  | Md. Fahmidul Karim Rafi  | fahmidulkarimrafi@gmail.com        | Lead & Frontend     |
| 20220104085  | Priyom Parial            | priyomparial17@gmail.com           | Backend             |
| 20220104097  | Safuan Hasan Tasfee      | tasfim3@gmail.com                  | Frontend & Backend  |
| 20220104083  | Sayek Al Sami            | sayekalsami@gmail.com              | Frontend & Backend  |


## Project Overview

### Project Title
**Attendance Tracker**

### Objective
Attendance Tracker is a digital platform for efficient attendance management, offering Google SSO, real-time tracking, session creation, and secure access, enhancing convenience for students, instructors, and administrators.

### Target Audience
1. Educational Institutions: Schools, colleges, and universities.
2. Students: For easy attendance submission and tracking.
3. Instructors: To streamline session management.
4. Administrators: For assigning roles and managing records.

## Tech Stack

### Backend
- **Framework**: Laravel

### Frontend
- **Framework/Library**: React 

### Rendering Method
- **Client-Side Rendering (CSR)**

### **UI Design**
- **Tool**: Figma  
- **Design Link**:  [Attendance-Tracker Figma Design](https://www.figma.com/design/05CX2gudiR30qwBdfJXfq7/Attendance-Tracker?m=auto&t=bsUZOJtBuLsjncY4-6)


## Project Features

### **1. Authentication**
- **Google Single Sign-On (SSO):**
  - Secure and easy login for all users.
  - Role-based redirection to personalized dashboards (Student, Instructor, Admin).

### **2. Instructor Portal**
- **Session Creation:**
  - Create sessions with details like class name, date, and time.
  - Generate unique session codes for secure attendance submissions.
- **View Sessions:**
  - Access and manage previously created sessions.
  - View attendance records for each session.
- **Attendance Insights:**
  - Generate attendance reports for specific sessions or classes.

### **3. Student Portal**
- **Sign In:**
  - Login using Google SSO for quick access to the student dashboard.
- **Attendance Submission:**
  - Submit attendance for active sessions using session codes or QR codes.
  - Auto-timestamp for accurate tracking.
- **View Attendance Records:**
  - Check attendance history and percentage for each course or session.

### **4. Admin Portal**
- **Assign Instructors:**
  - Manage instructors by assigning them to specific courses or classes.
- **CRUD Operations:**
  - Add, update, or delete records for instructors, students, and sessions.
  - Manage user roles and permissions.
- **Monitor Activity:**
  - View logs for sessions, attendance submissions, and user activities.
- **Generate Reports:**
  - Export attendance summaries and system statistics.

### **5. Common Features**
- **Dashboard:**
  - Personalized dashboards tailored for students, instructors, and admins.
- **Notifications:**
  - Alerts for upcoming sessions, deadlines, and attendance updates.
- **Secure Data Management:**
  - Role-based access control with secure storage of attendance records.
- **Responsive Design:**
  - Accessible from any device: desktop, tablet, or smartphone.

## API Endpoints

### **1. Authentication**
- **POST /auth/login** - Login using Google SSO.  
- **GET /auth/user** - Fetch current user details.

### **2. Instructor Portal**
- **POST /sessions** - Create a new attendance session.  
- **GET /sessions** - Fetch all sessions created by the instructor.  
- **GET /sessions/:id** - Get attendance details for a specific session.

### **3. Student Portal**
- **POST /attendance/submit** - Submit attendance for a session.  
- **GET /attendance/history** - Fetch attendance history for the student.

### **4. Admin Portal**
- **POST /admin/instructors** - Add a new instructor.  
- **GET /admin/instructors** - Fetch all instructors.  
- **DELETE /admin/instructors/:id** - Delete an instructor by ID.  
- **PUT /admin/instructors/:id** - Update instructor details.


## Milestones

### Milestone 1: Initial Setup and Basic Features
- Set up Laravel backend and React frontend.
- Implement Google Single Sign-On (SSO) for user login.
- Create a basic user role structure (Student, Instructor, Admin).

### Milestone 2: Advanced Features and Interactions
- Implement session creation functionality.
- Add functionality for students to submit attendance using session codes.
- Develop CRUD functionality for managing instructors and students.
- Establish relationships between users, sessions, and attendance records.

### Milestone 3: Final Touches and Deployment
- Improve UI design with consistent styling and responsiveness.
- Conduct thorough unit, integration, and end-to-end testing.
- Complete testing and bug fixes.
- Deployment to a hosting platform.
