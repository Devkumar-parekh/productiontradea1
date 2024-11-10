import Instruments from "./Instruments";

export default async function Page() {
  return (
    <main>
      {/* <h1 className={`mb-4 text-xl md:text-2xl`}>Dashboard</h1> */}
      <>
        {/* api_key: "", client_code: "", password: "", totp: "", type: "", */}
        <Instruments />
      </>
    </main>
  );
}
