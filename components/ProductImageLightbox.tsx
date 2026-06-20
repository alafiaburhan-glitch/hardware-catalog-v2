"use client";

import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";

type Props = {
  src: string;
  alt: string;
};

export default function ProductImageLightbox({ src, alt }: Props) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <div className="border rounded-3xl overflow-hidden bg-white md:sticky md:top-24 md:self-start cursor-zoom-in group">
          <div className="relative">
            <Image
              src={src}
              alt={alt}
              width={600}
              height={400}
              loading="eager"
              className="w-full h-auto object-cover group-hover:scale-105 transition duration-500"
            />
            <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0Zm3 3-1.5-1.5" />
              </svg>
              Click to zoom
            </div>
          </div>
        </div>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 animate-in fade-in duration-200" />
        <Dialog.Content className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full">
            <Dialog.Close className="absolute -top-10 right-0 text-white hover:text-gray-300 transition flex items-center gap-1 text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
              Close
            </Dialog.Close>
            <div className="rounded-2xl overflow-hidden bg-white shadow-2xl">
              <Image
                src={src}
                alt={alt}
                width={1200}
                height={800}
                className="w-full h-auto object-contain max-h-[85vh]"
              />
            </div>
            <Dialog.Title className="text-white text-center mt-3 text-sm opacity-70">
              {alt}
            </Dialog.Title>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}