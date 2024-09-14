import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <main role="main" className="grid md:grid-cols-2 min-h-screen divide-x-2">
      <section className="hidden md:flexCenter h-full font-bold text-xl">
        Welcome to the future of reading
      </section>
      <section className="flexCenter h-full px-3 md:px-20">
        <LoginForm />
      </section>
    </main>
  );
}
