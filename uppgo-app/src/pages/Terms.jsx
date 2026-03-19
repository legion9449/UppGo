import { Link } from "react-router-dom";

export default function Terms() {
  return (
    <div className="pt-24 bg-white min-h-screen px-6">

      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-12">

          <h1 className="text-4xl font-bold mb-4 text-black">
            Terms & Conditions
          </h1>

          <p className="text-gray-500">
            Last updated: March 2026
          </p>

        </div>

        {/* CONTENT CARD */}
        <div className="bg-white shadow-xl rounded-2xl p-10 border border-gray-100 mb-12 space-y-8">

          {/* INTRO */}
          <p className="text-gray-700 leading-relaxed">
            Welcome to UppGo. By using this platform, you agree to the following terms and conditions.
          </p>

          {/* SECTION */}
          <div>
            <h2 className="text-xl font-semibold mb-3 text-black">
              User Accounts
            </h2>

            <p className="text-gray-700 leading-relaxed">
              Users must create an account to access certain features of UppGo. You are responsible for maintaining the confidentiality of your account credentials.
            </p>
          </div>

          {/* SECTION */}
          <div>
            <h2 className="text-xl font-semibold mb-3 text-black">
              Acceptable Use
            </h2>

            <p className="text-gray-700 mb-3">
              Users agree not to:
            </p>

            <ul className="space-y-2 text-gray-700">
              <li>✔ Use the platform for illegal activities</li>
              <li>✔ Upload harmful or malicious content</li>
              <li>✔ Attempt to disrupt or damage the system</li>
            </ul>
          </div>

          {/* SECTION */}
          <div>
            <h2 className="text-xl font-semibold mb-3 text-black">
              Event Information
            </h2>

            <p className="text-gray-700 leading-relaxed">
              UppGo provides event listings created by administrators or organizers. While we strive for accuracy, we cannot guarantee that all event information is always complete or correct.
            </p>
          </div>

          {/* SECTION */}
          <div>
            <h2 className="text-xl font-semibold mb-3 text-black">
              Platform Availability
            </h2>

            <p className="text-gray-700 leading-relaxed">
              We aim to keep the platform available at all times but cannot guarantee uninterrupted service.
            </p>
          </div>

          {/* SECTION */}
          <div>
            <h2 className="text-xl font-semibold mb-3 text-black">
              Limitation of Liability
            </h2>

            <p className="text-gray-700 leading-relaxed">
              UppGo is provided as a learning project and is offered without warranties. The platform is not responsible for any losses or damages resulting from the use of the service.
            </p>
          </div>

          {/* SECTION */}
          <div>
            <h2 className="text-xl font-semibold mb-3 text-black">
              Changes to Terms
            </h2>

            <p className="text-gray-700 leading-relaxed">
              These terms may be updated from time to time. Continued use of the platform means you accept the updated terms.
            </p>
          </div>

          {/* FINAL NOTE */}
          <p className="text-gray-700 leading-relaxed">
            If you do not agree with these terms, please discontinue using UppGo.
          </p>

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