import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata: Metadata = {
  title: 'Dipak Pote - Software Developer',
  description: 'Software Developer specializing in Full-Stack Development, Backend Engineering, and AI-powered applications. MERN Stack, FastAPI, LLMs, RAG systems.',
  keywords: ['Dipak Pote', 'Software Developer', 'Full Stack', 'MERN', 'Python', 'FastAPI', 'LLM', 'RAG', 'Pune'],
  authors: [{ name: 'Dipak Pote' }],
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased bg-[#0a0a0a]">
        {children}
      </body>
    </html>
  )
}
