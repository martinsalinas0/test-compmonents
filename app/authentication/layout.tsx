import Image from "next/image";
import Link from "next/link";

function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen flex flex-col lg:flex-row">
      {/* Left - Form Section */}
      <section className="w-full lg:w-1/2 flex flex-col px-6 py-8 lg:px-16 lg:py-10 bg-white">
        <Link href="/">
          <Image
            src="/avatar/logo.png"
            alt="Prossfora Logo"
            width={140}
            height={32}
            className="h-8 w-auto"
            priority
          />
        </Link>
        <div className="flex-1 flex items-center justify-center py-8">
          {children}
        </div>
      </section>

      {/* Right - Testimonial Section */}
      <section className="hidden lg:flex lg:w-1/2 flex-col justify-between bg-cerulean p-10">
        <div>
          <blockquote className="text-xl lg:text-2xl font-medium leading-relaxed mb-6 text-white">
            ProssFora streamlined our entire workflow. From job posting to
            payment, everything is tracked in one place. Our contractors love it
            too.
          </blockquote>
          <div className="flex items-center gap-4">
            <cite className="text-white font-semibold not-italic">
              - John D.
            </cite>
            <p className="text-cerulean-200">Property Manager</p>
            <div className="flex items-center gap-0.5" aria-hidden>
              {[1, 2, 3, 4, 5].map((i) => (
                <svg key={i} className="w-5 h-5 text-yarrow-400 fill-current" viewBox="0 0 20 20" aria-hidden>
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Layout;
