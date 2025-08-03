import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Calendar, 
  Clock, 
  Users, 
  Shield, 
  CheckCircle, 
  Heart,
  Phone,
  Mail,
  MapPin
} from "lucide-react"
import { FaTooth } from "react-icons/fa"
import Navbar from "./Navbar"

const Homepage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Header */}
        <Navbar isHomePage={true}/>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-100">
            University Training Program
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Quality Dental Care by
            <span className="text-blue-600"> Future Dentists</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Receive professional dental treatment while supporting the education of tomorrow&apos;s dental professionals. 
            Our supervised student clinic provides high-quality care at accessible rates.
          </p>
          
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Our Student Clinic?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience quality dental care while contributing to dental education under expert supervision.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-gray-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle className="text-xl text-gray-900">Expert Supervision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  All treatments are supervised by licensed dental professionals ensuring quality and safety.
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle className="text-xl text-gray-900">Comprehensive Care</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Wide range of dental services including cleanings, fillings, crowns, and preventive care.
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Calendar className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle className="text-xl text-gray-900">Flexible Scheduling</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Convenient appointment times to fit your schedule with extended hours available.
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CheckCircle className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle className="text-xl text-gray-900">Quality Assurance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Modern equipment and evidence-based treatment protocols ensure excellent outcomes.
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Clock className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle className="text-xl text-gray-900">Thorough Treatment</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Students take extra time to ensure comprehensive care and attention to detail.
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Heart className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle className="text-xl text-gray-900">Supporting Education</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Your participation helps train the next generation of dental professionals.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What to Expect
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Your journey to better oral health in our educational environment.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Initial Consultation</h3>
              <p className="text-gray-600">
                Comprehensive examination and treatment planning with student and supervisor.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Treatment Planning</h3>
              <p className="text-gray-600">
                Detailed treatment plan discussion and scheduling of appointments.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality Care</h3>
              <p className="text-gray-600">
                Receive treatment from supervised students using modern techniques and equipment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Contact us today to schedule your appointment or learn more about our services.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <Phone className="h-8 w-8 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Call Us</h3>
              <p className="text-gray-600">(555) 123-4567</p>
              <p className="text-sm text-gray-500">Mon-Fri 8AM-5PM</p>
            </div>

            <div>
              <Mail className="h-8 w-8 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Us</h3>
              <p className="text-gray-600">clinic@dentalcenter.edu</p>
              <p className="text-sm text-gray-500">24-48 hour response</p>
            </div>

            <div>
              <MapPin className="h-8 w-8 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Visit Us</h3>
              <p className="text-gray-600">123 University Ave</p>
              <p className="text-sm text-gray-500">Dental School Building</p>
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <FaTooth className='w-5 h-5' />
                <span className="ml-2 text-lg font-bold">Dental Education Center</span>
              </div>
              <p className="text-gray-400">
                Training tomorrow&apos;s dental professionals while providing quality care today.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>General Dentistry</li>
                <li>Preventive Care</li>
                <li>Restorative Treatments</li>
                <li>Oral Health Education</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">For Patients</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Schedule Appointment</li>
                <li>Patient Forms</li>
                <li>Insurance Information</li>
                <li>Preparation Guidelines</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Phone: (555) 123-4567</li>
                <li>Email: clinic@dentalcenter.edu</li>
                <li>Address: 123 University Ave</li>
                <li>Hours: Mon-Fri 8AM-5PM</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Dental Education Center. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Homepage