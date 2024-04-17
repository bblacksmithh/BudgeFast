"use client"
import { useRouter } from "next/navigation";
import LandingContent from "@/components/LandingContent";
import LandingNavbar from "@/components/LandingNavbar";

export default function Home() {

  const router = useRouter();

  const handleGoToLogin = () => {
      router.push('/login');
  }

  const handleGoToRegister = () => {
      router.push('/register');
  }

  
  return (
    <main>
      <LandingNavbar />
      <LandingContent goToLogin={handleGoToLogin} goToRegister={handleGoToRegister}/>
    </main>
  );
}
