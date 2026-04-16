/// <reference types="next" />
/// <reference types="react" />
import Link from "next/link";
import { Evectus } from "@/components/ui/Icons";

const SupportPage = () => {
  return (
    <div className="w-full bg-linear-to-b from-white to-[#F9FAFB] min-h-screen py-6 sm:py-10">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
        <Link href="/" className="flex items-center gap-2 cursor-pointer">
          <Evectus />
          <span className="text-2xl xl:text-[32px] font-freeman-regular text-[#0D0D0D]">
            Evectus
          </span>
        </Link>
        <span className="font-lgvanastasia-regular text-3xl sm:text-4xl text-[#0D0D0D] leading-[100%] text-center">
          დახმარება
        </span>
      </div>

      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12 mt-6 sm:mt-8">
        <hr className="border-[#EBEBEB]" />
      </div>

      <div className="max-w-[1000px] mx-auto mt-10 sm:mt-14 px-4 sm:px-6 lg:px-8 bg-white shadow-md rounded-3xl py-10 sm:py-12">
        <div className="space-y-8 text-[#0D0D0D] font-helveticaneue-medium leading-7 text-base sm:text-lg">
          <div>
            <h2 className="text-2xl font-semibold text-[#111827] mb-4">
              როგორ მივიღოთ დახმარება?
            </h2>
            <p>
              Evectus-ზე ჩვენი გუნდი მზად არის დახმარებისთვის. თუ გაქვთ ტექსტური
              ან ადმინისტრაციული კითხვა, გთხოვთ გამოიყენოთ ერთი ქვემოთ მოცემული
              არხი.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-3xl border border-[#E5E7EB] p-6 bg-[#F9FAFB]">
              <h3 className="text-xl font-semibold mb-3">ელ.ფოსტა</h3>
              <p className="mb-4">
                სწრაფი მხარდაჭერა ელ.ფოსტაზე. ჩვენი გუნდი პასუხობს 1–2 სამუშაო
                დღეში.
              </p>
              <a
                href="mailto:info@evectus.ge"
                className="text-[#4444FF] underline"
              >
                info@evectus.ge
              </a>
            </div>
            <div className="rounded-3xl border border-[#E5E7EB] p-6 bg-[#F9FAFB]">
              <h3 className="text-xl font-semibold mb-3">ტელეფონი</h3>
              <p className="mb-4">
                დაუკავშირდით ტელეფონით, თუ გსურთ მყისიერი მხარდაჭერა ან
                შეკითხვის სწრაფად გადაწყვიტვა.
              </p>
              <a
                href="tel:+995550506963"
                className="text-[#4444FF] underline"
              >
                +995 550 50 69 63
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-[#E5E7EB] p-6 bg-[#F9FAFB]">
            <h3 className="text-xl font-semibold mb-3">ხშირად დასმული კითხვები</h3>
            <ul className="list-disc pl-5 space-y-3">
              <li>როგორ გავაუქმო გაკვეთილი?</li>
              <li>როგორ შევიტანო ტექნიკური პრობლემა ვიდეო ლინკში?</li>
              <li>როგორ დავბრუნო თანხა?</li>
            </ul>
            <p className="mt-4 text-[#6B7280]">
              თუ თქვენი შეკითხვა აქ არ არის, გთხოვთ მოგვწერეთ support@evectus.ge-ზე
              ან დაგვირეკეთ.</p>
          </div>

          <div className="rounded-3xl border border-[#E5E7EB] p-6 bg-[#F9FAFB]">
            <h3 className="text-xl font-semibold mb-3">სხვა მხარდაჭერის არხები</h3>
            <p className="mb-4">
              თქვენ შეგიძლიათ დაგვიკავშირდეთ ასევე სოციალურ ქსელებში:
            </p>
            <div className="flex flex-col gap-3">
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.facebook.com/profile.php?id=61583831033359"
                className="text-[#4444FF] underline"
              >
                Facebook
              </a>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.instagram.com/evectusacademy/"
                className="text-[#4444FF] underline"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
