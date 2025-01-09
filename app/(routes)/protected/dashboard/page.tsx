import Link from "next/link";

export default async function Dashboard() {


  return (
    <div>
      <h1>Bienvenue sur votre tableau de bord</h1>
      <Link href="/profil"></Link>
    </div>
  );
}
