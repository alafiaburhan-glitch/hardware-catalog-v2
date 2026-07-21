"use client";

import { FormEvent, useState } from "react";
import { MessageCircle, Send } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

const enquiryTypes = ["Product availability", "Bulk quotation", "Product selection help", "Delivery enquiry", "Other requirement"];

export default function ContactEnquiryForm() {
  const [sending, setSending] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const company = String(data.get("company") ?? "").trim();
    const enquiryType = String(data.get("enquiryType") ?? "").trim();
    const requirement = String(data.get("requirement") ?? "").trim();
    const quantity = String(data.get("quantity") ?? "").trim();
    const notes = String(data.get("notes") ?? "").trim();
    const message = ["Hi Noor Agencies, I would like to make an enquiry.", "", `Name: ${name}`, company ? `Company: ${company}` : null, `Enquiry type: ${enquiryType}`, `Product / requirement: ${requirement}`, quantity ? `Quantity: ${quantity}` : null, notes ? `Additional details: ${notes}` : null].filter(Boolean).join("\n");
    trackEvent("contact_enquiry", { enquiry_type: enquiryType });
    window.open(`https://wa.me/919626652275?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    window.setTimeout(() => setSending(false), 800);
  }

  return <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7" aria-labelledby="enquiry-form-heading">
    <div className="mb-6 flex items-start gap-3"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-green-700"><MessageCircle className="h-5 w-5" /></span><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-red-700">Quick enquiry</p><h2 id="enquiry-form-heading" className="mt-1 text-2xl font-black">Tell us what you need</h2><p className="mt-1 text-sm leading-6 text-slate-500">We’ll prepare your details as a WhatsApp message for you to review and send.</p></div></div>
    <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
      <label className="grid gap-1.5 text-sm font-semibold text-slate-700">Your name <span className="sr-only">required</span><input name="name" required autoComplete="name" className="rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none transition focus:border-red-600 focus:ring-2 focus:ring-red-100" placeholder="Name" /></label>
      <label className="grid gap-1.5 text-sm font-semibold text-slate-700">Company <span className="font-normal text-slate-400">(optional)</span><input name="company" autoComplete="organization" className="rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none transition focus:border-red-600 focus:ring-2 focus:ring-red-100" placeholder="Business name" /></label>
      <label className="grid gap-1.5 text-sm font-semibold text-slate-700 sm:col-span-2">Enquiry type<select name="enquiryType" required defaultValue="Product availability" className="rounded-xl border border-slate-200 bg-white px-4 py-3 font-normal outline-none transition focus:border-red-600 focus:ring-2 focus:ring-red-100">{enquiryTypes.map((type) => <option key={type} value={type}>{type}</option>)}</select></label>
      <label className="grid gap-1.5 text-sm font-semibold text-slate-700 sm:col-span-2">Product or requirement<input name="requirement" required className="rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none transition focus:border-red-600 focus:ring-2 focus:ring-red-100" placeholder="Example: 3-ton webbing sling, 4 metres" /></label>
      <label className="grid gap-1.5 text-sm font-semibold text-slate-700">Quantity <span className="font-normal text-slate-400">(optional)</span><input name="quantity" className="rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none transition focus:border-red-600 focus:ring-2 focus:ring-red-100" placeholder="Example: 10 pieces" /></label>
      <label className="grid gap-1.5 text-sm font-semibold text-slate-700 sm:col-span-2">Additional details <span className="font-normal text-slate-400">(optional)</span><textarea name="notes" rows={4} className="resize-y rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none transition focus:border-red-600 focus:ring-2 focus:ring-red-100" placeholder="Brand preference, application, delivery location, or specifications" /></label>
      <div className="sm:col-span-2"><button type="submit" disabled={sending} className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-green-600 px-6 py-3.5 font-bold text-white transition hover:bg-green-700 disabled:cursor-wait disabled:opacity-70"><Send className="h-4 w-4" /> {sending ? "Opening WhatsApp…" : "Review enquiry on WhatsApp"}</button><p className="mt-2 text-center text-xs leading-5 text-slate-400">Your details stay in this form until you choose to send the message through WhatsApp.</p></div>
    </form>
  </section>;
}
