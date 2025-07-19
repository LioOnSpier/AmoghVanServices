# EmailJS Setup Guide for Amogh Van/Bus Services

## 🚀 Quick Setup Instructions

To enable email functionality for your student registration form, follow these steps:

### 1. Create EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### 2. Set Up Email Service

1. In your EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail recommended)
4. Connect your Gmail account (kharwaramog02@gmail.com)
5. Note down your **Service ID** (e.g., "service_abc123")

### 3. Create Email Template

1. Go to **Email Templates** in your dashboard
2. Click **Create New Template**
3. Use this template content:

```
Subject: New Student Registration - {{student_name}}

Dear Rajesh Kumar J Kharwar,

A new student registration has been submitted through the Amogh Van/Bus Services website.

=== STUDENT INFORMATION ===
Name: {{student_name}}
Date of Birth: {{date_of_birth}}
Grade: {{grade}}
School: {{school}}
Home Address: {{student_address}}

=== PARENT/GUARDIAN INFORMATION ===
Name: {{parent_name}}
Phone: {{parent_phone}}
Email: {{parent_email}}
Emergency Contact: {{emergency_contact}}
Emergency Phone: {{emergency_phone}}

=== TRANSPORTATION DETAILS ===
Service Type: {{service_type}}
Pickup Address: {{pickup_address}}
Drop-off Address: {{dropoff_address}}
Preferred Pickup Time: {{preferred_pickup_time}}

=== MEDICAL INFORMATION ===
Medical Conditions: {{medical_conditions}}
Current Medications: {{medications}}
Special Needs: {{special_needs}}

=== PERMISSIONS ===
Photo Permission: {{photo_permission}}
Terms Accepted: {{terms_accepted}}

Submitted on: {{submission_date}}

Please contact the parent at {{parent_phone}} or {{parent_email}} to follow up on this registration.

Best regards,
Amogh Van/Bus Services Website
```

4. Save the template and note down your **Template ID** (e.g., "template_xyz789")

### 4. Get Your Public Key

1. Go to **Account** settings in your EmailJS dashboard
2. Find your **Public Key** (e.g., "abc123def456")

### 5. Update the Code

Replace these values in the `StudentRegistration.tsx` file:

```typescript
// Line 97: Replace with your EmailJS public key
emailjs.init("YOUR_PUBLIC_KEY"); // Replace with: "your_actual_public_key"

// Line 135: Replace with your service ID
"YOUR_SERVICE_ID", // Replace with: "service_abc123"

// Line 136: Replace with your template ID
"YOUR_TEMPLATE_ID", // Replace with: "template_xyz789"
```

### Example of Updated Code:

```typescript
emailjs.init("abc123def456"); // Your actual public key

const result = await emailjs.send(
  "service_gmail123", // Your actual service ID
  "template_student_reg", // Your actual template ID
  templateParams,
);
```

## 🔧 Configuration Values You Need

After completing the setup, you'll have these three values:

1. **Public Key**: `abc123def456`
2. **Service ID**: `service_gmail123`
3. **Template ID**: `template_student_reg`

## 📧 Email Template Variables

The form sends these variables to your email template:

- `{{student_name}}` - Full student name
- `{{date_of_birth}}` - Student's date of birth
- `{{grade}}` - Student's grade level
- `{{school}}` - School name
- `{{student_address}}` - Student's home address
- `{{parent_name}}` - Parent/guardian name
- `{{parent_phone}}` - Parent's phone number
- `{{parent_email}}` - Parent's email address
- `{{emergency_contact}}` - Emergency contact name
- `{{emergency_phone}}` - Emergency contact phone
- `{{service_type}}` - Type of transportation service
- `{{pickup_address}}` - Pickup location
- `{{dropoff_address}}` - Drop-off location
- `{{preferred_pickup_time}}` - Preferred pickup time
- `{{medical_conditions}}` - Any medical conditions
- `{{medications}}` - Current medications
- `{{special_needs}}` - Special accommodations needed
- `{{photo_permission}}` - Photo permission (Yes/No)
- `{{terms_accepted}}` - Terms acceptance (Yes/No)
- `{{submission_date}}` - When form was submitted

## 🎯 Email Destination

All form submissions will be sent to: **kharwaramog02@gmail.com**

## 🆓 Free Tier Limits

EmailJS free tier includes:

- 200 emails per month
- 2 email services
- 1 email template
- Basic support

This should be sufficient for a school transportation service registration system.

## 🔒 Security Notes

- Your EmailJS public key is safe to use in frontend code
- Never share your private keys
- EmailJS handles all the email sending securely
- Form data is sent directly to EmailJS, not stored on your website

## ✅ Testing

After setup:

1. Fill out a test registration form
2. Submit the form
3. Check kharwaramog02@gmail.com for the registration email
4. Verify all form data appears correctly in the email

## 🆘 Support

If you need help with setup:

- EmailJS Documentation: https://www.emailjs.com/docs/
- EmailJS Support: https://www.emailjs.com/contact/

The form is now ready to automatically send all student registrations directly to your email!
