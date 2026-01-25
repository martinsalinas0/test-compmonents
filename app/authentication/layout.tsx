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
            src="/logo.png"
            alt="ProssFora Logo"
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
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <Image
                  src="/assets/icons/star.svg"
                  alt="star"
                  key={star}
                  width={20}
                  height={20}
                  className="w-5 h-5"
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Layout;
