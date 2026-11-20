import Link from "next/link";
import {
  ArrowLeft,
  Check,
  Download,
  ImagePlus,
  Layers3,
  Palette,
  Type,
} from "lucide-react";
import { ShotlyLogo } from "@/components/ui/Logo";
import { VisitorCounter } from "@/components/ui/VisitorCounter";

const features = [
  {
    icon: Layers3,
    title: "خمس شاشات في مشروع واحد",
    text: "انتقل بين شاشاتك بسهولة، ونسّقها كعرض متكامل لتطبيقك.",
  },
  {
    icon: Type,
    title: "تحرير النص على التصميم",
    text: "عدّل العناوين والأوصاف مباشرة، واختر محاذاتها وألوانها.",
  },
  {
    icon: ImagePlus,
    title: "صورك وشعارك وخلفيتك",
    text: "ارفع لقطة التطبيق، وأضف شعاراً وخلفية مخصصة لكل شاشة.",
  },
  {
    icon: Palette,
    title: "تحكم بالتفاصيل",
    text: "اختر اتجاه التصميم وإطار الجهاز وألوان الخلفية والنص.",
  },
  {
    icon: Download,
    title: "تصدير صور PNG",
    text: "نزّل الشاشة الحالية أو صدّر مجموعة الشاشات من المحرر.",
  },
];

const steps = [
  ["01", "ارفع لقطاتك", "أضف صور التطبيق إلى الشاشات التي تريد تصميمها."],
  ["02", "نسّق كل شاشة", "اكتب النصوص وأضف الشعار واختر الألوان والإطار."],
  ["03", "صدّر التصميم", "نزّل ملفات PNG وراجعها قبل تجهيزها للمتجر."],
];

export default function Home() {
  return (
    <div dir="rtl" className="min-h-screen bg-white text-[#1d1d1f]">
      <header className="fixed inset-x-4 top-4 z-50 mx-auto flex max-w-6xl items-center justify-between rounded-full border border-slate-200/70 bg-white/85 px-5 py-2.5 shadow-sm backdrop-blur-xl sm:inset-x-8 sm:px-7">
        <Link href="/" className="flex items-center gap-2">
          <ShotlyLogo size={29} />
          <span className="text-sm font-semibold">Shotly</span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-slate-600 md:flex">
          <a href="#features" className="hover:text-blue-600">
            المميزات
          </a>
          <a href="#steps" className="hover:text-blue-600">
            طريقة العمل
          </a>
          <a href="#about" className="hover:text-blue-600">
            عن الأداة
          </a>
        </nav>
        <div className="flex items-center gap-2.5">
          <a
            href="https://github.com/ln6ie/Shotly"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full border border-slate-200 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 sm:inline-flex"
          >
            GitHub
          </a>
          <Link
            href="/editor"
            className="rounded-full bg-[#007AFF] px-4 py-2 text-xs font-semibold text-white hover:bg-[#0066D6]"
          >
            افتح المحرر
          </Link>
        </div>
      </header>

      <main>
        <section className="mx-auto grid max-w-[1440px] items-center gap-8 px-5 pb-12 pt-36 text-center sm:px-8 sm:pt-44 lg:min-h-[calc(100vh-5rem)] lg:grid-cols-[0.8fr_1.2fr] lg:gap-10 lg:px-12 lg:pt-28 lg:text-right">
          <div className="lg:py-10">
          <h1 className="mx-auto mt-4 max-w-4xl text-4xl font-semibold leading-[1.2] tracking-tight sm:text-5xl lg:mx-0 lg:text-5xl xl:text-6xl">
            امنح تطبيقك عرضاً
            <br className="hidden sm:block" /> يليق به في المتجر
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-500 sm:text-lg lg:mx-0">
            نسّق لقطات شاشات تطبيقك في مجموعة واحدة. أضف النصوص والشعار، خصص
            الألوان والإطار، ثم صدّر الصور من المتصفح.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
            <Link
              href="/editor"
              className="inline-flex items-center gap-2 rounded-full bg-[#007AFF] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:bg-[#0066D6]"
            >
              ابدأ التصميم مجاناً <ArrowLeft className="h-4 w-4" />
            </Link>
            <a
              href="#features"
              className="rounded-full border border-slate-200 px-6 py-3.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              تعرّف على الأدوات
            </a>
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-slate-500 lg:justify-start">
            {["بدون تسجيل", "العمل من المتصفح", "تصدير PNG"].map((item) => (
              <span key={item} className="inline-flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-emerald-600" />
                {item}
              </span>
            ))}
          </div>
          </div>
          <figure className="relative mx-auto mt-10 w-full max-w-5xl sm:mt-12 lg:mt-0 lg:max-w-none">
            <img
              src="/shotly-showcase.png"
              alt="مثال على لقطة تطبيق طبية منسقة داخل إطار هاتف"
              className="mx-auto block h-auto max-h-[min(76vh,900px)] w-auto max-w-full object-contain"
            />
          </figure>
        </section>

        <section
          id="features"
          className="border-y border-slate-100 bg-[#F8F8FA] py-20 sm:py-24"
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                كل ما يلزم لتنسيق لقطاتك
              </h2>
              <p className="mt-4 leading-7 text-slate-500">
                تحكم بالمحتوى والمظهر في مساحة عمل واحدة، وشاهد تصميم كل شاشة
                أثناء التحرير.
              </p>
            </div>
            <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {features.map(({ icon: Icon, title, text }) => (
                <article
                  key={title}
                  className="p-2"
                >
                  <Icon className="h-8 w-8 text-[#007AFF]" />
                  <h3 className="mt-5 text-lg font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-7 text-gray-400">
                    {text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="steps"
          className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24"
        >
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold text-[#007AFF]">
                من البداية إلى التصدير
              </p>
              <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                طريقة عمل بسيطة
                <br />
                وتحكم كامل بتصميمك
              </h2>
              <p className="mt-5 max-w-lg leading-8 text-slate-500">
                ابدأ بمشروع من خمس شاشات، ثم خصص كل شاشة وحدها. لا تحتاج إلى
                تثبيت برنامج أو إنشاء حساب.
              </p>
              <Link
                href="/editor"
                className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#007AFF] hover:text-[#0066D6]"
              >
                افتح المحرر <ArrowLeft className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {steps.map(([number, title, text]) => (
                <article
                  key={number}
                  className="p-2"
                >
                  <span className="text-3xl font-semibold text-blue-200">
                    {number}
                  </span>
                  <h3 className="mt-5 font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="about"
          className="bg-[#F8F8FA] px-5 py-16 sm:px-8 sm:py-20"
        >
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-right">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                ابدأ بتنسيق لقطات تطبيقك
              </h2>
              <p className="mt-3 max-w-2xl leading-7 text-slate-500">
                Shotly أداة تعمل من المتصفح لتصميم لقطات تطبيقاتك
                وتصديرها كصور PNG.
              </p>
            </div>
            <Link
              href="/editor"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#007AFF] px-6 py-3.5 text-sm font-semibold text-white hover:bg-[#0066D6]"
            >
              ابدأ الآن <ArrowLeft className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>

      <footer className="">
      </footer>
    </div>
  );
}
