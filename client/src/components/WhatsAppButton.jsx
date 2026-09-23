import { MessageCircle } from 'lucide-react';

function WhatsAppButton({ number }) {
  if (!number) return null;
  const digits = number.replace(/[^0-9]/g, '');

  return (
    <a
      href={`https://wa.me/${digits}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
    >
      <MessageCircle size={27} className="text-white" strokeWidth={2} />
    </a>
  );
}

export default WhatsAppButton;
