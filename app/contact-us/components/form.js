"use client";

import React from 'react';

export default function ContactUsForm() {

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('/api/contact-us', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            if (result.status) {
                alert(result.message);
                e.target.reset();
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <form className="mt-8 space-y-4 w-full max-w-md" onSubmit={handleSubmit}>
            <input type="text" name='name' placeholder="Your Name" className="w-full p-2 border border-gray-300 rounded" required />
            <input type="email" name='email' placeholder="Your Email" className="w-full p-2 border border-gray-300 rounded" required />
            <textarea name='message' placeholder="Your Message" className="w-full p-2 border border-gray-300 rounded" rows="4" required></textarea>
            <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Send Message</button>
        </form>
    );
}