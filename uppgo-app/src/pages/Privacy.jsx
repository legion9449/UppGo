import { Link } from "react-router-dom";

export default function Privacy() {
  return (
    <div className="pt-24 bg-white min-h-screen px-6">

      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-12">

          <h1 className="text-4xl font-bold mb-4 text-black">
            Privacy Policy
          </h1>

          <p className="text-gray-500">
            Last updated: March 2026
          </p>

        </div>

        {/* CONTENT CARD */}
        <div className="bg-white shadow-xl rounded-2xl p-10 border border-gray-100 mb-12 space-y-8">

          {/* INTRO */}
          <p className="text-gray-700 leading-relaxed">
            UppGo respects your privacy and is committed to protecting your personal information.
          </p>

          {/* SECTION */}
          <div>
            <h2 className="text-xl font-semibold mb-3 text-black">
              Information We Collect
            </h2>

            <p className="text-gray-700 mb-3">
              When you create an account or use UppGo, we may collect:
            </p>

            <ul className="space-y-2 text-gray-700">
              <li>✔ Name</li>
              <li>✔ Email address</li>
              <li>✔ Username</li>
              <li>✔ Account information</li>
              <li>✔ Event participation data</li>
            </ul>
          </div>

          {/* SECTION */}
          <div>
            <h2 className="text-xl font-semibold mb-3 text-black">
              How We Use Your Information
            </h2>

            <p className="text-gray-700 mb-3">
              Your information is used to:
            </p>

            <ul className="space-y-2 text-gray-700">
              <li>✔ Create and manage your account</li>
              <li>✔ Allow you to participate in events</li>
              <li>✔ Improve the platform and user experience</li>
              <li>✔ Provide technical support</li>
            </ul>
          </div>

          {/* SECTION */}
          <div>
            <h2 className="text-xl font-semibold mb-3 text-black">
              Data Security
            </h2>

            <p className="text-gray-700 leading-relaxed">
              We take reasonable technical and organizational measures to protect your data from unauthorized access, misuse, or disclosure.
            </p>
          </div>

          {/* SECTION */}
          <div>
            <h2 className="text-xl font-semibold mb-3 text-black">
              Third-Party Services
            </h2>

            <p className="text-gray-700 leading-relaxed">
              UppGo may use third-party services such as hosting providers and analytics tools to operate the platform. These services may process limited data required to run the platform.
            </p>
          </div>

          {/* SECTION */}
          <div>
            <h2 className="text-xl font-semibold mb-3 text-black">
              Your Rights
            </h2>

            <p className="text-gray-700 leading-relaxed">
              Users can request to update or delete their account information by contacting the platform administrators.
            </p>
          </div>

          {/* SECTION */}
          <div>
            <h2 className="text-xl font-semibold mb-3 text-black">
              Changes to This Policy
            </h2>

            <p className="text-gray-700 leading-relaxed">
              We may update this privacy policy when necessary. Changes will be posted on this page.
            </p>
          </div>

          {/* CONTACT */}
          <div>
            <h2 className="text-xl font-semibold mb-3 text-black">
              Contact
            </h2>

            <p className="text-gray-700 leading-relaxed">
              If you have any questions about this policy, please contact the UppGo team.
            </p>
          </div>

        </div>

        {/* CTA */}
        <div className="text-center mb-16">

          <Link
            to="/events"
            className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition"
          >
            Back to Events
          </Link>

        </div>

      </div>

    </div>
  );
}