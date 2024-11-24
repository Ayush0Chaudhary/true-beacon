import { UserAuthForm } from "./login-auth-form"


export default function LoginAuthenticationPage() {
  return (
    <>
      <div className="md:hidden">
        <img
          src="/examples/authentication-light.png"
          width={1280}
          height={843}
          alt="Authentication"
          className="block dark:hidden"
        />
        <img
          src="/examples/authentication-dark.png"
          width={1280}
          height={843}
          alt="Authentication"
          className="hidden dark:block"
        />
      </div>
      <div className="container relative hidden min-h-screen grid-cols-[2fr_1fr] lg:grid lg:max-w-none lg:px-0 bg-[#08080B]">
        {/* Left section */}
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
        True Beacon
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
              We are trying to disrupt the asset management space by being a transparent, client-aligned and performance driven investment firm.
              </p>
              <footer className="text-sm">Nikhil Kamath</footer>
              <footer className="text-sm">Co-Founder at True Beacon</footer>
            </blockquote>
          </div>
        </div>
        {/* Right section */}
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight text-white">
                Create an account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below to create your account
              </p>
            </div>
            <UserAuthForm />

          </div>
        </div>
      </div>
    </>
  )
}
