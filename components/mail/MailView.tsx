"use client";

import React, { useState } from "react";
import { Send, Trash2, Archive, Inbox, Star } from "lucide-react";
import emailjs from '@emailjs/browser';
import Notification from "./Notification";

export default function MailView() {
    const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");
    const [formData, setFormData] = useState({
        subject: "",
        message: "",
        from: "",
    });

    const [showNotify, setShowNotify] = useState({ show: false, title: "", msg: "" });

    const triggerNotify = (title: string, msg: string) => {
        setShowNotify({ show: true, title, msg });
        setTimeout(() => setShowNotify(prev => ({ ...prev, show: false })), 4000);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formData.from.trim() || !formData.subject.trim() || !formData.message.trim()) {
            triggerNotify("Missing Information", "All fields are mandatory.");
            return;
        }

        if (!emailRegex.test(formData.from)) {
            triggerNotify("Format Error", "Please enter a valid email address.");
            return;
        }

        setStatus("sending");

        try {
            await emailjs.send(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
                {
                    subject: formData.subject,
                    message: formData.message,
                    from: formData.from,
                    from_name: "Portfolio Visitor",
                },
                process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
            );

            setStatus("success");
            triggerNotify("Mail Sent", "Your message reached Julien successfully.");
            setFormData({ subject: "", message: "", from: "" });
            setTimeout(() => setStatus("idle"), 3000);
        } catch (error) {
            triggerNotify("Delivery Failed", "Check your connection and try again.");
            setStatus("idle");
        }
    };

    return (
        <div className="relative flex h-full bg-white dark:bg-[#1e1e1e] text-sm text-black dark:text-white overflow-hidden">

            <Notification
                visible={showNotify.show}
                title={showNotify.title}
                message={showNotify.msg}
            />

            <aside className="w-44 bg-gray-100/50 dark:bg-black/20 border-r border-black/5 dark:border-white/10 p-2 hidden sm:flex flex-col gap-1">
                <div className="h-8" />
                <SidebarItem icon={<Inbox size={16} />} label="Inbox" active />
                <SidebarItem icon={<Star size={16} />} label="Flagged" />
                <SidebarItem icon={<Send size={16} />} label="Sent" />
                <SidebarItem icon={<Trash2 size={16} />} label="Trash" />
            </aside>

            <main className="flex-1 flex flex-col">
                <header className="h-12 border-b border-black/5 dark:border-white/10 flex items-center px-4 gap-4 justify-between">
                    <div className="flex gap-4">
                        <Trash2 size={18} className="opacity-50" />
                        <Archive size={18} className="opacity-50" />
                    </div>
                    <button
                        disabled={status === "sending"}
                        onClick={handleSubmit}
                        className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md transition-colors disabled:opacity-50 font-medium"
                    >
                        {status === "sending" ? "Sending..." : status === "success" ? "Sent!" : "Send"}
                        <Send size={14} />
                    </button>
                </header>

                <form className="flex-1 flex flex-col p-4 gap-4" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-2 border-b border-black/5 dark:border-white/10 pb-2">
                        <div className="flex items-center gap-2">
                            <span className="text-gray-500 min-w-12.5">To:</span>
                            <span className="font-medium text-blue-500">julien.sarda@icloud.com</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="text-gray-500 min-w-12.5">Subject:</span>
                            <input
                                type="text"
                                required
                                value={formData.subject}
                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                className="flex-1 bg-transparent outline-none text-black dark:text-white"
                                placeholder=""
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="text-gray-500 min-w-12.5">From:</span>
                            <input
                                type="email"
                                required
                                value={formData.from}
                                onChange={(e) => setFormData({ ...formData, from: e.target.value })}
                                className="flex-1 bg-transparent outline-none text-black dark:text-white"
                                placeholder=""
                            />
                        </div>
                    </div>

                    <textarea
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="flex-1 bg-transparent outline-none resize-none pt-2"
                        placeholder=""
                    />
                </form>
            </main>
        </div>
    );
}

function SidebarItem({ icon, label, active = false }: { icon: any, label: string, active?: boolean }) {
    return (
        <div className={`flex items-center gap-3 px-3 py-1.5 rounded-md cursor-default ${active ? 'bg-blue-500/10 text-blue-500' : 'hover:bg-black/5 dark:hover:bg-white/5'}`}>
            {icon}
            <span className="font-medium">{label}</span>
        </div>
    );
}