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
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Bus,
  User,
  Phone,
  MapPin,
  Calendar,
  Clock,
  AlertCircle,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  FileText,
  Heart,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

const studentSchema = z.object({
  // Student Information
  studentFirstName: z.string().min(1, "First name is required"),
  studentLastName: z.string().min(1, "Last name is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  grade: z.string().min(1, "Grade is required"),
  school: z.string().min(1, "School is required"),
  studentAddress: z.string().min(5, "Address is required"),

  // Parent/Guardian Information
  parentFirstName: z.string().min(1, "Parent first name is required"),
  parentLastName: z.string().min(1, "Parent last name is required"),
  parentPhone: z.string().min(10, "Valid phone number is required"),
  parentEmail: z.string().email("Valid email is required"),
  emergencyContact: z.string().min(1, "Emergency contact is required"),
  emergencyPhone: z.string().min(10, "Emergency phone is required"),

  // Transportation Details
  serviceType: z.string().min(1, "Service type is required"),
  pickupAddress: z.string().min(5, "Pickup address is required"),
  dropoffAddress: z.string().min(5, "Drop-off address is required"),
  preferredPickupTime: z.string().min(1, "Pickup time is required"),

  // Medical/Special Needs
  medicalConditions: z.string().optional(),
  medications: z.string().optional(),
  specialNeeds: z.string().optional(),

  // Agreement
  termsAccepted: z
    .boolean()
    .refine((val) => val === true, "You must accept the terms"),
  photoPermission: z.boolean(),
});

type StudentFormData = z.infer<typeof studentSchema>;

const StudentRegistration = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    trigger,
  } = useForm<StudentFormData>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      photoPermission: false,
      termsAccepted: false,
    },
  });

  const totalSteps = 4;

  const nextStep = async () => {
    let fieldsToValidate: (keyof StudentFormData)[] = [];

    switch (step) {
      case 1:
        fieldsToValidate = [
          "studentFirstName",
          "studentLastName",
          "dateOfBirth",
          "grade",
          "school",
          "studentAddress",
        ];
        break;
      case 2:
        fieldsToValidate = [
          "parentFirstName",
          "parentLastName",
          "parentPhone",
          "parentEmail",
          "emergencyContact",
          "emergencyPhone",
        ];
        break;
      case 3:
        fieldsToValidate = [
          "serviceType",
          "pickupAddress",
          "dropoffAddress",
          "preferredPickupTime",
        ];
        break;
    }

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const onSubmit = async (data: StudentFormData) => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("Form submitted:", data);
    toast.success(
      "Registration submitted successfully! Amogh Van/Bus Services will contact you within 24 hours.",
    );
    setIsSubmitting(false);
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center space-x-4 mb-8">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="flex items-center">
          <div
            className={`
            w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold
            ${i <= step ? "bg-school-yellow-500 text-white" : "bg-gray-200 text-gray-500"}
          `}
          >
            {i < step ? <CheckCircle className="h-5 w-5" /> : i}
          </div>
          {i < totalSteps && (
            <div
              className={`w-12 h-1 mx-2 ${i < step ? "bg-school-yellow-500" : "bg-gray-200"}`}
            />
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
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
            <Link
              to="/"
              className="flex items-center text-gray-600 hover:text-school-blue-600 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </div>
        </div>
      </nav>

      <div className="py-12">
        <div className="section-container max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge className="bg-school-yellow-100 text-school-yellow-700 mb-4">
              Student Registration
            </Badge>
            <h1 className="text-4xl font-bold text-gray-900 font-manrope mb-4">
              Register Your Student
            </h1>
            <p className="text-lg text-gray-600">
              Please fill out all required information to register your child
              for Amogh Van/Bus Services transportation.
            </p>
          </div>

          {renderStepIndicator()}

          <form onSubmit={handleSubmit(onSubmit)}>
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-school-yellow-50 to-school-blue-50">
                <CardTitle className="flex items-center text-2xl">
                  {step === 1 && (
                    <>
                      <User className="mr-3 h-6 w-6" />
                      Student Information
                    </>
                  )}
                  {step === 2 && (
                    <>
                      <Phone className="mr-3 h-6 w-6" />
                      Parent/Guardian Information
                    </>
                  )}
                  {step === 3 && (
                    <>
                      <MapPin className="mr-3 h-6 w-6" />
                      Transportation Details
                    </>
                  )}
                  {step === 4 && (
                    <>
                      <FileText className="mr-3 h-6 w-6" />
                      Medical Information & Agreement
                    </>
                  )}
                </CardTitle>
                <CardDescription className="text-base">
                  {step === 1 &&
                    "Enter your child's basic information and school details."}
                  {step === 2 &&
                    "Provide parent/guardian and emergency contact information."}
                  {step === 3 &&
                    "Specify pickup, drop-off locations and service preferences."}
                  {step === 4 &&
                    "Add any medical information and accept our terms of service."}
                </CardDescription>
              </CardHeader>

              <CardContent className="p-8">
                {/* Step 1: Student Information */}
                {step === 1 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="studentFirstName">
                        Student First Name *
                      </Label>
                      <Input
                        id="studentFirstName"
                        {...register("studentFirstName")}
                        className="mt-1"
                        placeholder="Enter first name"
                      />
                      {errors.studentFirstName && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.studentFirstName.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="studentLastName">
                        Student Last Name *
                      </Label>
                      <Input
                        id="studentLastName"
                        {...register("studentLastName")}
                        className="mt-1"
                        placeholder="Enter last name"
                      />
                      {errors.studentLastName && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.studentLastName.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        {...register("dateOfBirth")}
                        className="mt-1"
                      />
                      {errors.dateOfBirth && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.dateOfBirth.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="grade">Grade *</Label>
                      <Select
                        onValueChange={(value) => setValue("grade", value)}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select grade" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pre-k">Pre-K</SelectItem>
                          <SelectItem value="k">Kindergarten</SelectItem>
                          <SelectItem value="1">1st Grade</SelectItem>
                          <SelectItem value="2">2nd Grade</SelectItem>
                          <SelectItem value="3">3rd Grade</SelectItem>
                          <SelectItem value="4">4th Grade</SelectItem>
                          <SelectItem value="5">5th Grade</SelectItem>
                          <SelectItem value="6">6th Grade</SelectItem>
                          <SelectItem value="7">7th Grade</SelectItem>
                          <SelectItem value="8">8th Grade</SelectItem>
                          <SelectItem value="9">9th Grade</SelectItem>
                          <SelectItem value="10">10th Grade</SelectItem>
                          <SelectItem value="11">11th Grade</SelectItem>
                          <SelectItem value="12">12th Grade</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.grade && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.grade.message}
                        </p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <Label htmlFor="school">School Name *</Label>
                      <Input
                        id="school"
                        {...register("school")}
                        className="mt-1"
                        placeholder="Enter school name"
                      />
                      {errors.school && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.school.message}
                        </p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <Label htmlFor="studentAddress">
                        Student Home Address *
                      </Label>
                      <Textarea
                        id="studentAddress"
                        {...register("studentAddress")}
                        className="mt-1"
                        placeholder="Enter complete home address"
                        rows={3}
                      />
                      {errors.studentAddress && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.studentAddress.message}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Step 2: Parent Information */}
                {step === 2 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="parentFirstName">
                        Parent/Guardian First Name *
                      </Label>
                      <Input
                        id="parentFirstName"
                        {...register("parentFirstName")}
                        className="mt-1"
                        placeholder="Enter first name"
                      />
                      {errors.parentFirstName && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.parentFirstName.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="parentLastName">
                        Parent/Guardian Last Name *
                      </Label>
                      <Input
                        id="parentLastName"
                        {...register("parentLastName")}
                        className="mt-1"
                        placeholder="Enter last name"
                      />
                      {errors.parentLastName && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.parentLastName.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="parentPhone">
                        Primary Phone Number *
                      </Label>
                      <Input
                        id="parentPhone"
                        {...register("parentPhone")}
                        className="mt-1"
                        placeholder="(555) 123-4567"
                      />
                      {errors.parentPhone && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.parentPhone.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="parentEmail">Email Address *</Label>
                      <Input
                        id="parentEmail"
                        type="email"
                        {...register("parentEmail")}
                        className="mt-1"
                        placeholder="parent@email.com"
                      />
                      {errors.parentEmail && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.parentEmail.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="emergencyContact">
                        Emergency Contact Name *
                      </Label>
                      <Input
                        id="emergencyContact"
                        {...register("emergencyContact")}
                        className="mt-1"
                        placeholder="Emergency contact name"
                      />
                      {errors.emergencyContact && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.emergencyContact.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="emergencyPhone">
                        Emergency Contact Phone *
                      </Label>
                      <Input
                        id="emergencyPhone"
                        {...register("emergencyPhone")}
                        className="mt-1"
                        placeholder="(555) 987-6543"
                      />
                      {errors.emergencyPhone && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.emergencyPhone.message}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Step 3: Transportation Details */}
                {step === 3 && (
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="serviceType">Service Type *</Label>
                      <Select
                        onValueChange={(value) =>
                          setValue("serviceType", value)
                        }
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select service type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily-route">
                            Daily School Route
                          </SelectItem>
                          <SelectItem value="field-trip">
                            Field Trip Only
                          </SelectItem>
                          <SelectItem value="private">
                            Private Transportation
                          </SelectItem>
                          <SelectItem value="special-needs">
                            Special Needs Support
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.serviceType && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.serviceType.message}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="pickupAddress">Pickup Address *</Label>
                        <Textarea
                          id="pickupAddress"
                          {...register("pickupAddress")}
                          className="mt-1"
                          placeholder="Enter pickup address"
                          rows={3}
                        />
                        {errors.pickupAddress && (
                          <p className="text-red-500 text-sm mt-1 flex items-center">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            {errors.pickupAddress.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="dropoffAddress">
                          Drop-off Address *
                        </Label>
                        <Textarea
                          id="dropoffAddress"
                          {...register("dropoffAddress")}
                          className="mt-1"
                          placeholder="Enter drop-off address"
                          rows={3}
                        />
                        {errors.dropoffAddress && (
                          <p className="text-red-500 text-sm mt-1 flex items-center">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            {errors.dropoffAddress.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="preferredPickupTime">
                        Preferred Pickup Time *
                      </Label>
                      <Select
                        onValueChange={(value) =>
                          setValue("preferredPickupTime", value)
                        }
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select preferred pickup time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="6:30">6:30 AM</SelectItem>
                          <SelectItem value="7:00">7:00 AM</SelectItem>
                          <SelectItem value="7:30">7:30 AM</SelectItem>
                          <SelectItem value="8:00">8:00 AM</SelectItem>
                          <SelectItem value="8:30">8:30 AM</SelectItem>
                          <SelectItem value="flexible">Flexible</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.preferredPickupTime && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.preferredPickupTime.message}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Step 4: Medical & Agreement */}
                {step === 4 && (
                  <div className="space-y-6">
                    <div className="bg-school-yellow-50 p-6 rounded-lg">
                      <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                        <Heart className="h-5 w-5 mr-2 text-school-red-500" />
                        Medical Information (Optional)
                      </h3>

                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="medicalConditions">
                            Medical Conditions
                          </Label>
                          <Textarea
                            id="medicalConditions"
                            {...register("medicalConditions")}
                            className="mt-1"
                            placeholder="Any medical conditions we should be aware of?"
                            rows={2}
                          />
                        </div>

                        <div>
                          <Label htmlFor="medications">
                            Current Medications
                          </Label>
                          <Textarea
                            id="medications"
                            {...register("medications")}
                            className="mt-1"
                            placeholder="List any medications your child takes"
                            rows={2}
                          />
                        </div>

                        <div>
                          <Label htmlFor="specialNeeds">
                            Special Needs/Accommodations
                          </Label>
                          <Textarea
                            id="specialNeeds"
                            {...register("specialNeeds")}
                            className="mt-1"
                            placeholder="Any special accommodations needed?"
                            rows={2}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id="photoPermission"
                          checked={watch("photoPermission")}
                          onCheckedChange={(checked) =>
                            setValue("photoPermission", checked as boolean)
                          }
                        />
                        <Label
                          htmlFor="photoPermission"
                          className="text-sm leading-relaxed"
                        >
                          I give permission for my child to be photographed for
                          Amogh Van/Bus Services promotional materials and
                          safety documentation.
                        </Label>
                      </div>

                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id="termsAccepted"
                          checked={watch("termsAccepted")}
                          onCheckedChange={(checked) =>
                            setValue("termsAccepted", checked as boolean)
                          }
                        />
                        <Label
                          htmlFor="termsAccepted"
                          className="text-sm leading-relaxed"
                        >
                          I accept the{" "}
                          <span className="text-school-blue-600 underline cursor-pointer">
                            Terms of Service
                          </span>{" "}
                          and
                          <span className="text-school-blue-600 underline cursor-pointer">
                            {" "}
                            Privacy Policy
                          </span>
                          . I understand the transportation policies and safety
                          procedures. *
                        </Label>
                      </div>
                      {errors.termsAccepted && (
                        <p className="text-red-500 text-sm flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.termsAccepted.message}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center p-8 bg-gray-50">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={step === 1}
                  className="flex items-center"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>

                <div className="text-sm text-gray-500">
                  Step {step} of {totalSteps}
                </div>

                {step < totalSteps ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="btn-primary flex items-center"
                  >
                    Next
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary flex items-center"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Registration
                        <CheckCircle className="h-4 w-4 ml-2" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </Card>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentRegistration;
