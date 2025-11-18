export default function PasswordRecovery() {
  return (
    <main>
      <h1>Email verification link expired</h1>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
        <p>Looks like the verification link has expired. Not to worry, we can send the link again</p>
        <button>Resend verification link</button>
      </div>
    </main>
  );
}
