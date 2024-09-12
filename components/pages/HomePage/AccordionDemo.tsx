"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function AccordionDemo() {
  const faqs = [
    {
      question: "What is Lazy Reader?",
      answer:
        "Lazy Reader is an AI-powered web application designed to simplify the process of consuming long PDF documents. It allows users to upload a PDF, generate a concise summary using AI, and listen to the summary through text-to-speech conversion.",
    },
    {
      question: "How do I use Lazy Reader?",
      answer:
        "To use Lazy Reader, simply upload your PDF document on the application’s homepage. The AI will process the text, generate a summary, and provide an audio playback option. You can then listen to the summarized content directly on the platform.",
    },
    {
      question: "What types of documents can I upload?",
      answer:
        "Lazy Reader currently supports PDF files. This includes eBooks, research papers, reports, lecture notes, and any other document saved in PDF format.",
    },
    {
      question: "How does Lazy Reader generate summaries?",
      answer:
        "Lazy Reader uses the ChatGPT model, provided by OpenAI, to understand the content of the PDF and generate a concise summary. The AI identifies key points, main ideas, and important details, condensing the information into an easy-to-digest format.",
    },
    {
      question: "How does the text-to-speech feature work?",
      answer:
        "The text-to-speech feature is powered by Google Cloud’s Text-to-Speech API. After generating the summary, Lazy Reader converts the text into audio, allowing users to listen to the content through a natural-sounding voice.",
    },
    {
      question: "Can I adjust the playback speed of the audio?",
      answer:
        "Yes, Lazy Reader allows users to adjust the playback speed of the audio. You can slow it down or speed it up according to your preference, making the listening experience more comfortable.",
    },
    {
      question: "Is my data secure on Lazy Reader?",
      answer:
        "Yes, Lazy Reader prioritizes user privacy and data security. Uploaded files and generated content are processed securely, and any sensitive data is handled in accordance with best practices for data protection. The application does not store your files permanently; they are deleted after processing.",
    },
    {
      question: "Are there any limitations to the summaries generated?",
      answer:
        "While Lazy Reader's AI is highly advanced, the quality of the summary may vary depending on the complexity of the document. For extremely technical or specialized content, the summary may not capture all nuances, but it will still provide a general overview of the key points.",
    },
    {
      question: "How long does it take to process a PDF?",
      answer:
        "The processing time depends on the length and complexity of the PDF. For most documents, the summary and audio generation take only a few minutes. Larger documents may take slightly longer.",
    },
    {
      question: "Can I download the summary and audio?",
      answer:
        "Yes, Lazy Reader allows users to download both the text summary and the audio file. This way, you can access the content offline or share it with others.",
    },
  ];

  return (
    <Accordion type="single" collapsible className="w-full">
      {faqs.map((faq, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger>{faq.question}</AccordionTrigger>
          <AccordionContent>{faq.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
