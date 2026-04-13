"use client";

import { useEffect, useState } from "react";

const topics = [
  { id: "general", label: "საერთო" },
  { id: "payment", label: "გადახდები" },
  { id: "lesson", label: "გაკვეთილი" },
  { id: "technical", label: "ტექნიკური" },
];

const topicHints: Record<string, string> = {
  general: "მოგვწერეთ ნებისმიერ კითხვაზე, რომელიც დაკავშირებულია Evectus-თან.",
  payment: "დაგვიწერეთ გადახდასა და ფასებთან დაკავშირებული კითხვები.",
  lesson: "დაგვიწერეთ გაკვეთილების დროს, მასწავლებელზე ან დაჯავშნაზე.",
  technical: "დააფიქსირეთ ტექნიკური შეცდომა ან პრობლემები საიტზე.",
};

const quickMessages: Record<string, string[]> = {
  general: [
    "როგორ გამოვიყენო Evectus ჩემი პირველი გაკვეთილის დაჯავშნისთვის?",
    "მინდა მეცოდინე დამატებითი ინფორმაცია პლატფორმის შესახებ.",
  ],
  payment: [
    "როგორ დავადასტურო გადახდა?",
    "მნიშვნელოვანი: გადახდის შესახებ მჭირდება დახმარება.",
  ],
  lesson: [
    "როგორ შევათანხმე სწორი მასწავლებელი?",
    "როდესაც დავჯავშნი გაკვეთილს, როდის მივიღებ ჩატარების დეტალებს?",
  ],
  technical: [
    "საიტზე არის ტექნიკური პრობლემა და სჭირდება თქვენი დახმარება.",
    "მე არ მინახავს ჩემი დაჯავშნილი გაკვეთილები.",
  ],
};

const isValidEmail = (value: string) =>
  value === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const STORAGE_KEY = "evectus_support_draft";

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [topic, setTopic] = useState("general");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [draftSaved, setDraftSaved] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as {
          email?: string;
          message?: string;
          topic?: string;
        };
        setEmail(parsed.email ?? "");
        setMessage(parsed.message ?? "");
        setTopic(parsed.topic ?? "general");
      }
    } catch {
      // ignore localStorage errors
    }
  }, []);

  useEffect(() => {
    try {
      const draft = { email, message, topic };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
      setDraftSaved(true);
      const timer = window.setTimeout(() => setDraftSaved(false), 1200);
      return () => window.clearTimeout(timer);
    } catch {
      // ignore localStorage errors
    }
  }, [email, message, topic]);

  const currentTopic = topics.find((item) => item.id === topic) ?? topics[0];
  const hasMessage = message.trim().length > 0;
  const canSend = hasMessage && isValidEmail(email);

  const appendMessage = (value: string) => {
    setMessage((prev: string) => (prev.trim() ? `${prev.trim()}\n\n${value}` : value));
  };

  const clearDraft = () => {
    setEmail("");
    setMessage("");
    setTopic("general");
    setError("");
    setSent(false);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore errors
    }
  };

  const handleSend = () => {
    if (!hasMessage) {
      setError("გთხოვთ, აღწერეთ თქვენი პრობლემა ან შეკითხვა.");
      setSent(false);
      return;
    }

    if (!isValidEmail(email)) {
      setError("გთხოვთ, სწორად შეიყვანოთ ელ.ფოსტა.");
      setSent(false);
      return;
    }

    setError("");
    setSent(true);

    const subject = `Evectus მხარდაჭერის მოთხოვნა — ${currentTopic.label}`;
    const body = encodeURIComponent(
      `თემა: ${currentTopic.label}\n` +
        `მეილი: ${email || "არ არის მითითებული"}\n\n` +
        `${message.trim()}`
    );

    window.location.href = `mailto:info@evectus.ge?subject=${encodeURIComponent(subject)}&body=${body}`;
  };

  return (
    <div className="fixed right-4 bottom-4 z-50 text-left">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-3 rounded-full bg-[#FFD52A] px-5 py-3 text-sm font-semibold text-[#0C0F21] shadow-lg shadow-black/10 transition-transform duration-150 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#FFD52A]"
      >
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#0C0F21]">
          💬
        </span>
        მხარდაჭერა
      </button>

      {open && (
        <div className="fixed inset-0 z-40 flex items-end justify-end lg:items-center lg:justify-end">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setOpen(false)}
          />
          <div className="relative m-4 w-[min(100vw-2rem,420px)] rounded-[32px] bg-white p-6 shadow-[0_40px_120px_rgba(0,0,0,0.12)]">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-[#9E9E9E]">
                  დახმარება
                </p>
                <h2 className="mt-2 text-xl font-semibold text-[#0C0F21]">
                  დახმარების ჩატი
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full bg-[#F4F4F5] p-2 text-[#0C0F21] transition hover:bg-[#E5E7EB]"
              >
                ✕
              </button>
            </div>

            <p className="mb-4 text-sm leading-6 text-[#52525B]">
              აირჩიეთ თემა და მოგვწერეთ შეკითხვა, ჩვენ გავაგზავნოთ პასუხი რაც შეიძლება სწრაფად.
            </p>

            <div className="mb-4">
              <p className="mb-2 text-sm font-medium text-[#0C0F21]">
                აირჩიეთ თემა
              </p>
              <div className="grid gap-2 sm:grid-cols-2">
                {topics.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setTopic(item.id)}
                    className={`rounded-3xl border px-4 py-3 text-sm transition ${
                      topic === item.id
                        ? "border-[#FFD52A] bg-[#FFF7D6] text-[#0C0F21]"
                        : "border-[#E5E7EB] bg-[#F8FAFB] text-[#52525B] hover:border-[#FFD52A]"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <p className="mt-3 text-xs text-[#6B7280]">{topicHints[currentTopic.id]}</p>
            </div>

            <div className="mb-4 rounded-3xl bg-[#f8fbff] border border-[#dbeafe] p-4 text-sm text-[#334155]">
              <p className="font-medium">სწრაფი შაბლონები</p>
              <div className="mt-3 grid gap-2">
                {quickMessages[currentTopic.id].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => appendMessage(item)}
                    className="block w-full rounded-3xl border border-[#E5E7EB] bg-white px-4 py-3 text-left text-sm text-[#0C0F21] transition hover:border-[#FFD52A]"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <label className="mb-2 block text-sm font-medium text-[#0C0F21]">
              ელ.ფოსტა (არასავალდებულო)
            </label>
            <input
              type="email"
              placeholder="example@mail.com"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              className="mb-4 w-full rounded-3xl border border-[#E5E7EB] bg-[#F8FAFB] px-4 py-3 text-sm text-[#0C0F21] outline-none transition focus:border-[#FFD52A] focus:ring-2 focus:ring-[#FFF0B3]"
            />

            <label className="mb-2 block text-sm font-medium text-[#0C0F21]">
              შეტყობინება
            </label>
            <textarea
              value={message}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)}
              rows={4}
              placeholder="მოგვწერე შენი პრობლემა ან კითხვა..."
              className="mb-4 w-full rounded-3xl border border-[#E5E7EB] bg-[#F8FAFB] px-4 py-3 text-sm text-[#0C0F21] outline-none transition focus:border-[#FFD52A] focus:ring-2 focus:ring-[#FFF0B3]"
            />

            <div className="mb-4 flex items-center justify-between gap-3">
              <div className="text-sm text-[#6B7280]">
                {draftSaved ? "ჩანაწერი შენახულია" : "ჩანაწერი ავტომატურად შენახულია"}
              </div>
              <button
                type="button"
                onClick={clearDraft}
                className="text-sm font-medium text-[#0C0F21] underline"
              >
                ველოს წაშლა
              </button>
            </div>

            {error ? (
              <div className="mb-4 rounded-3xl bg-red-50 border border-red-100 p-3 text-sm text-red-700">
                {error}
              </div>
            ) : sent ? (
              <div className="mb-4 rounded-3xl bg-emerald-50 border border-emerald-100 p-3 text-sm text-emerald-900">
                მეილი გაიხსნა თქვენს მეილ კლიენტში. თუ არ გაიხსნა, გადაამოწმეთ ელ.ფოსტა და სცადეთ ხელახლა.
              </div>
            ) : null}

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={handleSend}
                disabled={!canSend}
                className="inline-flex w-full items-center justify-center rounded-full bg-[#0C0F21] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#111827] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
              >
                {sent ? "გაგზავნილია" : "გაგზავნა"}
              </button>
              <div className="text-sm leading-6 text-[#52525B]">
                ან დაუკავშირდით:<br />
                <a href="tel:+995550506963" className="text-[#0C0F21] underline">
                  +995 550 50 69 63
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
