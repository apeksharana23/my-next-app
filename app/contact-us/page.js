import ContactUsForm from "@/app/contact-us/components/form";

export default function ContactUs() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl font-bold">Contact Us</h1>
            <p className="mt-4 text-lg">We would love to hear from you!</p>
            <ContactUsForm />
        </div>
    );
}