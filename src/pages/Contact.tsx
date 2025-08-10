import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Bus,
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  Send,
  CheckCircle,
  AlertCircle,
  Calendar,
  Users,
  FileText,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";
import SEO from "@/components/SEO";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  subject: z.string().min(1, "Subject is required"),
  inquiryType: z.string().min(1, "Please select inquiry type"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    try {
      // Initialize EmailJS with the same configuration as registration form
      emailjs.init("StvI1RsGaSZOvZp1H"); // Same public key as registration

      // Format the email template parameters similar to parent details
      const templateParams = {
        to_email: "kharwaramog02@gmail.com",
        from_name: "Amogh Van/Bus Services Contact Form",
        subject: `Contact Form Inquiry: ${data.subject}`,

        // Contact Information (similar to parent details format)
        contact_name: data.name,
        contact_email: data.email,
        contact_phone: data.phone,
        inquiry_type: data.inquiryType,
        inquiry_subject: data.subject,
        contact_message: data.message,

        // Formatted submission time
        submission_date: new Date().toLocaleString(),

        // Complete message body formatted like registration form
        message: `
CONTACT FORM INQUIRY SUBMISSION

=== CONTACT INFORMATION ===
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}

=== INQUIRY DETAILS ===
Inquiry Type: ${data.inquiryType}
Subject: ${data.subject}

=== MESSAGE ===
${data.message}

=== SUBMISSION INFO ===
Submitted on: ${new Date().toLocaleString()}
Form Type: Contact Inquiry

---
This inquiry was submitted through the Amogh Van/Bus Services website contact form.
Please respond to the contact within 24 hours as promised.
        `,
      };

      // Send email using EmailJS with same configuration as registration
      const result = await emailjs.send(
        "service_1nqvjzw", // Same service ID as registration
        "template_4dhuycr", // Same template ID as registration
        templateParams,
      );

      console.log("Contact email sent successfully:", result);

      toast.success(
        "Message sent successfully! We'll get back to you within 24 hours.",
      );

      reset();
    } catch (error) {
      console.error("Failed to send contact email:", error);
      toast.error(
        "Failed to send message. Please try calling us directly at 9870525637.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "mainEntity": {
      "@type": "Organization",
      "name": "Amogh Van/Bus Services",
      "telephone": ["+91-9870525637", "+91-9321025627"],
      "email": "kharwaramog02@gmail.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Prabhadevi",
        "addressLocality": "Dadar West",
        "addressRegion": "Maharashtra",
        "addressCountry": "India"
      },
      "openingHours": "Mo-Sa 07:00-19:00"
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <SEO
        title="Contact Amogh Van/Bus Services - Get School Transportation Quote in Mumbai"
        description="Contact Amogh Van/Bus Services for reliable school transportation in Mumbai. Call 9870525637 or 9321025627. Email: kharwaramog02@gmail.com. Located in Prabhadevi, Dadar West. Get instant quote!"
        keywords="contact school bus service Mumbai, school transport contact number Mumbai, Amogh Van Services phone number, school transport inquiry Mumbai, get school bus quote Mumbai"
        canonicalUrl="https://amoghvanservices.com/contact"
        schema={contactSchema}
      />
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="section-container">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-3">
              <div className="bg-school-yellow-500 p-2 rounded-lg">
                <Bus className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 font-manrope">
                Amogh Van/Bus Services
              </span>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link
                to="/"
                className="text-gray-600 hover:text-school-blue-600 transition-colors"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="text-gray-600 hover:text-school-blue-600 transition-colors"
              >
                About
              </Link>
              <Link
                to="/blog"
                className="text-gray-600 hover:text-school-blue-600 transition-colors"
              >
                Blog
              </Link>
              <Link
                to="/contact"
                className="text-school-blue-600 font-semibold"
              >
                Contact
              </Link>
              <Link to="/register" className="btn-primary">
                Register Student
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-school-yellow-50 to-school-blue-50">
        <div className="section-container">
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <Badge className="bg-school-blue-100 text-school-blue-700">
              <MessageSquare className="w-4 h-4 mr-2" />
              Get In Touch
            </Badge>
            <h1 className="text-5xl font-bold text-gray-900 font-manrope">
              Contact Us
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Have questions about our transportation services? We're here to
              help you find the perfect solution for your child's daily commute.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 bg-white">
        <div className="section-container">
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            <Card className="text-center shadow-lg border-0 card-hover">
              <CardContent className="p-8">
                <div className="bg-school-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Phone className="h-8 w-8 text-school-blue-600" />
                </div>
                <CardTitle className="text-xl mb-4">Call Us Directly</CardTitle>
                <CardDescription className="mb-6">
                  Speak with our team for immediate assistance
                </CardDescription>
                <div className="space-y-3">
                  <a
                    href="tel:9870525637"
                    className="block text-school-blue-600 hover:text-school-blue-700 font-semibold text-lg transition-colors"
                  >
                    9870525637
                  </a>
                  <a
                    href="tel:9321025627"
                    className="block text-school-blue-600 hover:text-school-blue-700 font-semibold text-lg transition-colors"
                  >
                    9321025627
                  </a>
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  Available Mon-Sat, 7:00 AM - 7:00 PM
                </p>
              </CardContent>
            </Card>

            <Card className="text-center shadow-lg border-0 card-hover">
              <CardContent className="p-8">
                <div className="bg-school-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Mail className="h-8 w-8 text-school-green-600" />
                </div>
                <CardTitle className="text-xl mb-4">Email Us</CardTitle>
                <CardDescription className="mb-6">
                  Send us a detailed message and we'll respond quickly
                </CardDescription>
                <a
                  href="mailto:kharwaramog02@gmail.com"
                  className="text-school-blue-600 hover:text-school-blue-700 font-semibold text-lg transition-colors"
                >
                  kharwaramog02@gmail.com
                </a>
                <p className="text-sm text-gray-500 mt-4">
                  We respond within 24 hours
                </p>
              </CardContent>
            </Card>

            <Card className="text-center shadow-lg border-0 card-hover">
              <CardContent className="p-8">
                <div className="bg-school-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MapPin className="h-8 w-8 text-school-yellow-600" />
                </div>
                <CardTitle className="text-xl mb-4">Visit Our Office</CardTitle>
                <CardDescription className="mb-6">
                  Meet with us in person to discuss your needs
                </CardDescription>
                <div className="space-y-2">
                  <p className="font-semibold text-gray-900">
                    Prabhadevi, Dadar West
                  </p>
                  <p className="text-gray-600">Mumbai, Maharashtra</p>
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  By appointment only
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form & Info */}
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="shadow-lg border-0">
                <CardHeader className="bg-gradient-to-r from-school-yellow-50 to-school-blue-50">
                  <CardTitle className="text-2xl flex items-center">
                    <Send className="mr-3 h-6 w-6" />
                    Send Us a Message
                  </CardTitle>
                  <CardDescription className="text-base">
                    Fill out the form below and we'll get back to you as soon as
                    possible.
                  </CardDescription>
                </CardHeader>

                <CardContent className="p-8">
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          {...register("name")}
                          className="mt-1"
                          placeholder="Enter your full name"
                        />
                        {errors.name && (
                          <p className="text-red-500 text-sm mt-1 flex items-center">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            {errors.name.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          {...register("phone")}
                          className="mt-1"
                          placeholder="Enter your phone number"
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-sm mt-1 flex items-center">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            {errors.phone.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        {...register("email")}
                        className="mt-1"
                        placeholder="Enter your email address"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="inquiryType">Type of Inquiry *</Label>
                      <Select
                        onValueChange={(value) =>
                          setValue("inquiryType", value)
                        }
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select inquiry type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new-registration">
                            New Student Registration
                          </SelectItem>
                          <SelectItem value="pricing">
                            Pricing Information
                          </SelectItem>
                          <SelectItem value="routes">
                            Route Information
                          </SelectItem>
                          <SelectItem value="safety">
                            Safety Questions
                          </SelectItem>
                          <SelectItem value="general">
                            General Inquiry
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.inquiryType && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.inquiryType.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        {...register("subject")}
                        className="mt-1"
                        placeholder="Brief subject of your message"
                      />
                      {errors.subject && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.subject.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        {...register("message")}
                        className="mt-1"
                        placeholder="Please provide details about your inquiry..."
                        rows={5}
                      />
                      {errors.message && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.message.message}
                        </p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary w-full flex items-center justify-center"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Sending Message...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Additional Info */}
            <div className="space-y-6">
              {/* Business Hours */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="mr-2 h-5 w-5" />
                    Business Hours
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Monday - Friday</span>
                      <span className="font-semibold">7:00 AM - 7:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Saturday</span>
                      <span className="font-semibold">8:00 AM - 5:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sunday</span>
                      <span className="font-semibold">Closed</span>
                    </div>
                    <div className="pt-3 border-t">
                      <p className="text-sm text-gray-500">
                        Emergency contact available 24/7 for registered students
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Link to="/register">
                    <Button variant="outline" className="w-full justify-start">
                      <Users className="mr-2 h-4 w-4" />
                      Register Your Student
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Important Information */}
              <Card className="shadow-lg border-0 bg-school-yellow-50">
                <CardHeader>
                  <CardTitle className="text-school-yellow-700">
                    Important Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-school-green-500 mt-0.5 flex-shrink-0" />
                      <span>We respond to all inquiries within 24 hours</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-school-green-500 mt-0.5 flex-shrink-0" />
                      <span>
                        Emergency contact available for registered families
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-school-green-500 mt-0.5 flex-shrink-0" />
                      <span>
                        Free consultation for new student registrations
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-school-green-500 mt-0.5 flex-shrink-0" />
                      <span>
                        Multilingual support available (Hindi, Marathi, English)
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="section-container">
          <div className="text-center space-y-4 mb-16">
            <Badge className="bg-school-green-100 text-school-green-700">
              Frequently Asked Questions
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 font-manrope">
              Common Questions
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find quick answers to the most common questions about our
              services.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card className="shadow-lg border-0">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-3">
                  What areas do you cover in Mumbai?
                </h3>
                <p className="text-gray-600">
                  We primarily serve Prabhadevi, Dadar West, and surrounding
                  areas. Contact us to check if we cover your specific location.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-3">
                  How do I register my child?
                </h3>
                <p className="text-gray-600">
                  You can register online through our website or call us
                  directly. We'll need basic information about your child and
                  transportation needs.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-3">
                  What safety measures do you have?
                </h3>
                <p className="text-gray-600">
                  All our drivers are licensed and trained, vehicles are
                  regularly inspected, and we use GPS tracking for real-time
                  monitoring.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Can I track my child's bus?
                </h3>
                <p className="text-gray-600">
                  Yes, we provide real-time location updates through our GPS
                  tracking system. Contact our office during service hours for
                  updates.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-bg">
        <div className="section-container text-center">
          <h2 className="text-4xl font-bold text-white font-manrope mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join hundreds of families who trust Amogh Van/Bus Services for safe,
            reliable student transportation.
          </p>
          <Link to="/register">
            <Button className="bg-white text-school-blue-600 hover:bg-gray-50 font-semibold px-8 py-4 text-lg">
              Register Your Student Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Contact;
