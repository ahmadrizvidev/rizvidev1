import React, { useState } from 'react';
import { db } from '../firebaseConfig'; // Adjust the import path as needed
import { collection, addDoc } from "firebase/firestore";

function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Create a new contact document in Firestore
    try {
      await addDoc(collection(db, "contacts"), {
        name,
        email,
        subject,
        message,
      });
      alert('Message sent successfully!'); // Optionally, display a success message
      // Clear form fields
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (error) {
      console.error("Error adding document: ", error);
      alert('Error sending message. Please try again.');
    }
  };

  return (
    <div className="Contact bg-[#f9f9fd] pt-9">
      <div className="p-4 mx-auto max-w-xl font-[sans-serif] mt-6 ">
        <h2 className="text-4xl text-[#6244C5] font-extrabold text-center">Have an idea</h2>
        <h2 className="text-3xl text-gray-800 font-extrabold text-center mt-4">Contact us</h2>
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="w-full rounded-md py-3 px-4 text-gray-800 bg-white focus:bg-transparent text-sm outline-blue-500"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full rounded-md py-3 px-4 text-gray-800 bg-white focus:bg-transparent text-sm outline-blue-500"
          />
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Subject"
            className="w-full rounded-md py-3 px-4 text-gray-800 bg-white focus:bg-transparent text-sm outline-blue-500"
          />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message"
            rows="6"
            className="w-full rounded-md px-4 text-gray-800 bg-white focus:bg-transparent text-sm pt-3 outline-blue-500"
          ></textarea>
          <button
            type="submit" // Changed from button type to submit
            className="text-white bg-blue-500 hover:bg-blue-600 tracking-wide rounded-md text-sm px-4 py-3 w-full"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactForm;
