import { useEffect, useState } from "react";
import api from "../api";

function UserDashboard() {

  const [user, setUser] = useState(null);
  const [interests, setInterests] = useState([]);
  const [editing, setEditing] = useState(false);
  const [recommendations, setRecommendations] = useState([]);

  const interestOptions = [
    "Music",
    "Sports",
    "Food",
    "Culture",
    "Nature"
  ];

  useEffect(() => {

    const storedUser = localStorage.getItem("user");

    if (storedUser) {

      const parsed = JSON.parse(storedUser);

      setUser(parsed);

      const userInterests = Array.isArray(parsed.interests)
        ? parsed.interests
        : [];

      setInterests(userInterests);

      loadRecommendations(parsed.id);

    }

  }, []);

  const loadRecommendations = async (userId) => {

    try {

      const res = await api.get(`/recommendations/${userId}`);

      setRecommendations(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  const toggleInterest = (interest) => {

    if (interests.includes(interest)) {

      setInterests(interests.filter(i => i !== interest));

    } else {

      setInterests([...interests, interest]);

    }

  };

  const saveInterests = async () => {

    try {

      const res = await api.put(`/user/interests/${user.id}`, {
        interests: interests
      });

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      setUser(res.data.user);

      loadRecommendations(user.id);

      setEditing(false);

    } catch {

      alert("Failed to update interests");

    }

  };

  if (!user) return <div className="pt-32 text-center">Loading...</div>;

  return (
    <div className="pt-32 p-10 max-w-4xl mx-auto">

      <h1 className="text-4xl font-bold mb-6">
        Welcome {user.name}
      </h1>

      <div className="bg-white shadow-xl rounded-xl p-8 mb-10">

        <p className="mb-4">
          <b>Email:</b> {user.email}
        </p>

        <h2 className="text-xl font-semibold mb-3">
          Interests
        </h2>

        {!editing ? (

          <div>

            <p className="mb-4">
              {interests.length > 0 ? interests.join(", ") : "No interests selected"}
            </p>

            <button
              onClick={()=>setEditing(true)}
              className="bg-black text-white px-4 py-2 rounded"
            >
              Edit Interests
            </button>

          </div>

        ) : (

          <div>

            {interestOptions.map((interest)=>(
              <label
                key={interest}
                className="flex gap-2 mb-2"
              >
                <input
                  type="checkbox"
                  checked={interests.includes(interest)}
                  onChange={()=>toggleInterest(interest)}
                />
                {interest}
              </label>
            ))}

            <div className="flex gap-3 mt-4">

              <button
                onClick={saveInterests}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Save
              </button>

              <button
                onClick={()=>setEditing(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>

            </div>

          </div>

        )}

      </div>

      <div>

        <h2 className="text-2xl font-bold mb-6">
          Recommended Events
        </h2>

        {recommendations.length === 0 ? (

          <p>No recommendations yet.</p>

        ) : (

          <div className="grid md:grid-cols-2 gap-6">

            {recommendations.map((event)=>(
              <div
                key={event.id}
                className="border rounded-xl p-4 shadow hover:shadow-lg transition"
              >

                <h3 className="text-lg font-semibold">
                  {event.title}
                </h3>

                <p className="text-gray-600">
                  {event.date}
                </p>

                <p className="text-sm text-gray-500">
                  {event.location}
                </p>

              </div>
            ))}

          </div>

        )}

      </div>

    </div>
  );

}

export default UserDashboard;