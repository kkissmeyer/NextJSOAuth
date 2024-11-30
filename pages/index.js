import { useSession, signIn, signOut } from 'next-auth/react';

export default function Home() {
  const { data: session, status } = useSession();

  console.log("Session status:", status);
  console.log("Session data:", session);
  console.log("Current Date and Time:", new Date().toString());
  console.log("Timezone Environment Variable (TZ):", process.env.TZ);
  console.log("NEXTAUTH_URL:", process.env.NEXTAUTH_URL);
  console.log("GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID);
  console.log("GOOGLE_CLIENT_SECRET:", process.env.GOOGLE_CLIENT_SECRET ? "Defined" : "Not Defined");
  console.log("NEXTAUTH_SECRET:", process.env.NEXTAUTH_SECRET ? "Defined" : "Not Defined");


  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return (
      <div>
        <h1>You are not signed in</h1>
        <button onClick={async () => {
          try {
            await signIn('google');
          } catch (error) {
            console.error("Sign-in error:", error);
          }
        }}>Please Sign in with Google</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Welcome, {session.user?.name || "User"}</h1>
      <p>Email: {session.user?.email || "Unavailable"}</p>
      <button onClick={async () => {
        try {
          await signOut();
        } catch (error) {
          console.error("Sign-out error:", error);
        }
      }}>Sign Out</button>
    </div>
  );
}
