import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";

function OrganizerEditEventPage() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    date: "",
    location: "",
    category: "",
    eventType: "Non-Nations",
    description: "",
    image: null
  });

  const [currentImage, setCurrentImage] = useState("");

  useEffect(() => {

    window.scrollTo(0,0);

    api.get(`/events/${id}`)
      .then((res)=>{

        const event = res.data;

        setForm({
          title: event.title,
          date: event.date,
          location: event.location,
          category: event.category,
          eventType: event.eventType,
          description: event.description,
          image: null
        });

        setCurrentImage(event.image);

      });

  }, [id]);

  const handleChange = (e)=>{

    const {name,value} = e.target;

    setForm({
      ...form,
      [name]:value
    });

  };

  const handleImageChange = (e)=>{

    setForm({
      ...form,
      image:e.target.files[0]
    });

  };

  const handleSubmit = async (e)=>{

    e.preventDefault();

    try{

      const formData = new FormData();

      formData.append("title",form.title);
      formData.append("date",form.date);
      formData.append("location",form.location);
      formData.append("category",form.category);
      formData.append("eventType",form.eventType);
      formData.append("description",form.description);

      if(form.image){
        formData.append("image",form.image);
      }

      await api.post(`/events/${id}?_method=PUT`,formData,{
        headers:{
          "Content-Type":"multipart/form-data"
        }
      });

      alert("Event updated");

      navigate("/organizer-dashboard");

    }catch(err){

      console.log(err);
      alert("Update failed");

    }

  };

  return (

    <div className="min-h-screen pt-32 px-6 bg-gray-100">

      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-8">

        <h2 className="text-3xl font-bold mb-8 text-center">
          Edit Event
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <select
            name="eventType"
            value={form.eventType}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          >
            <option>Nations</option>
            <option>Non-Nations</option>
          </select>

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          {currentImage && (

            <div>

              <p className="mb-2">Current Image</p>

              <img
                src={`http://127.0.0.1:8000${currentImage}`}
                className="w-full h-60 object-cover rounded"
              />

            </div>

          )}

          <input
            type="file"
            onChange={handleImageChange}
            className="w-full border p-3 rounded"
          />

          <button
            type="submit"
            className="bg-black text-white px-6 py-3 rounded w-full"
          >
            Update Event
          </button>

        </form>

      </div>

    </div>

  );

}

export default OrganizerEditEventPage;